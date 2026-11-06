const Roadmap = require('../models/Roadmap');
const JobRole = require('../models/JobRole');
const User = require('../models/User');
const sampleJobRoles = require('../data/sampleJobRoles');
const { getIsConnected } = require('../config/db');
const { calculateSkillGap } = require('../utils/skillGapCalculator');
const { generateRoadmap } = require('../utils/roadmapGenerator');
const { memoryUsers } = require('../middleware/authMiddleware');

// In-Memory store for Roadmaps
const memoryRoadmaps = new Map();

/**
 * @desc    Get or generate personalized learning roadmap for student
 * @route   GET /api/roadmap
 * @access  Private
 */
const getPersonalizedRoadmap = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const targetTitle = req.query.roleTitle || req.user.targetRoleTitle || 'Full Stack MERN Developer';

    // 1. Fetch the Job Role
    let jobRole = null;
    if (getIsConnected()) {
      jobRole = await JobRole.findOne({ title: new RegExp(`^${targetTitle}$`, 'i') });
    }
    if (!jobRole) {
      jobRole = sampleJobRoles.find(r => r.title.toLowerCase() === targetTitle.toLowerCase()) || sampleJobRoles[0];
    }

    // 2. Perform dynamic Gap Analysis with user's skills
    const studentSkills = req.user.skills || [];
    const gapAnalysis = calculateSkillGap(studentSkills, jobRole);

    // 3. Find existing roadmap
    let existingRoadmap = null;
    if (getIsConnected()) {
      existingRoadmap = await Roadmap.findOne({
        userId: req.user._id,
        jobRoleTitle: jobRole.title
      });
    } else {
      existingRoadmap = memoryRoadmaps.get(`${userId}_${jobRole.title}`) || null;
    }

    // 4. Generate or synchronize roadmap
    const generated = generateRoadmap(gapAnalysis, existingRoadmap);

    let roadmapData = {
      userId: req.user._id,
      jobRoleId: jobRole._id || 'mock_role_' + jobRole.title.toLowerCase().replace(/\s+/g, '_'),
      jobRoleTitle: jobRole.title,
      matchPercentageAtCreation: gapAnalysis.matchPercentage,
      currentMatchPercentage: gapAnalysis.matchPercentage,
      totalModules: generated.totalModules,
      completedModules: generated.completedModules,
      completionPercentage: generated.completionPercentage,
      totalEstimatedHours: generated.totalEstimatedHours,
      modules: generated.modules
    };

    if (getIsConnected()) {
      if (existingRoadmap) {
        // Keep completion statuses
        existingRoadmap.currentMatchPercentage = gapAnalysis.matchPercentage;
        existingRoadmap.totalModules = generated.totalModules;
        existingRoadmap.completedModules = generated.completedModules;
        existingRoadmap.completionPercentage = generated.completionPercentage;
        existingRoadmap.totalEstimatedHours = generated.totalEstimatedHours;
        existingRoadmap.modules = generated.modules;
        await existingRoadmap.save();
        roadmapData = existingRoadmap;
      } else {
        roadmapData = await Roadmap.create(roadmapData);
      }
    } else {
      memoryRoadmaps.set(`${userId}_${jobRole.title}`, roadmapData);
    }

    return res.json({
      success: true,
      roadmap: roadmapData,
      gapAnalysis
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle completion status of a roadmap topic & update student skills
 * @route   PUT /api/roadmap/toggle-item
 * @access  Private
 */
const toggleRoadmapTopic = async (req, res, next) => {
  try {
    const { topicId, roleTitle } = req.body;
    if (!topicId) {
      return res.status(400).json({ success: false, message: 'topicId is required' });
    }

    const userId = req.user._id.toString();
    const targetTitle = roleTitle || req.user.targetRoleTitle || 'Full Stack MERN Developer';

    // 1. Fetch Job Role
    let jobRole = null;
    if (getIsConnected()) {
      jobRole = await JobRole.findOne({ title: new RegExp(`^${targetTitle}$`, 'i') });
    }
    if (!jobRole) {
      jobRole = sampleJobRoles.find(r => r.title.toLowerCase() === targetTitle.toLowerCase()) || sampleJobRoles[0];
    }

    let roadmap = null;
    if (getIsConnected()) {
      roadmap = await Roadmap.findOne({ userId: req.user._id, jobRoleTitle: jobRole.title });
    } else {
      roadmap = memoryRoadmaps.get(`${userId}_${jobRole.title}`);
    }

    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found. Generate one first.' });
    }

    // Find the module
    const moduleItem = roadmap.modules.find(m => m.topicId === topicId);
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: 'Roadmap module topic not found' });
    }

    // Toggle completion
    moduleItem.isCompleted = !moduleItem.isCompleted;
    moduleItem.completedAt = moduleItem.isCompleted ? new Date() : null;

    // Recount completions
    roadmap.completedModules = roadmap.modules.filter(m => m.isCompleted).length;
    roadmap.completionPercentage = roadmap.totalModules > 0
      ? Math.round((roadmap.completedModules / roadmap.totalModules) * 100)
      : 100;

    // If marked as completed: dynamically award/upgrade this skill to student profile!
    const cleanSkillName = moduleItem.skillName.replace(/\s*\([^)]*\)/g, '').trim();

    let updatedUserSkills = [];

    if (getIsConnected()) {
      const user = await User.findById(req.user._id);

      if (moduleItem.isCompleted) {
        const skillIdx = user.skills.findIndex(s => s.name.toLowerCase() === cleanSkillName.toLowerCase());
        if (skillIdx > -1) {
          user.skills[skillIdx].proficiency = moduleItem.targetProficiency || 'Intermediate';
        } else {
          user.skills.push({
            name: cleanSkillName,
            category: moduleItem.category || 'General',
            proficiency: moduleItem.targetProficiency || 'Intermediate',
            addedAt: new Date()
          });
        }
      }

      await user.save();
      await roadmap.save();
      updatedUserSkills = user.skills;
    } else {
      const user = memoryUsers.get(req.user._id);
      if (user) {
        if (moduleItem.isCompleted) {
          const skillIdx = user.skills.findIndex(s => s.name.toLowerCase() === cleanSkillName.toLowerCase());
          if (skillIdx > -1) {
            user.skills[skillIdx].proficiency = moduleItem.targetProficiency || 'Intermediate';
          } else {
            user.skills.push({
              _id: 's_' + Date.now(),
              name: cleanSkillName,
              category: moduleItem.category || 'General',
              proficiency: moduleItem.targetProficiency || 'Intermediate',
              addedAt: new Date()
            });
          }
        }
        memoryUsers.set(req.user._id, user);
        updatedUserSkills = user.skills;
      }
      memoryRoadmaps.set(`${userId}_${jobRole.title}`, roadmap);
    }

    // Recalculate gap analysis and match percentage with updated skill
    const newGapAnalysis = calculateSkillGap(updatedUserSkills, jobRole);
    roadmap.currentMatchPercentage = newGapAnalysis.matchPercentage;

    if (getIsConnected()) {
      await roadmap.save();
    }

    return res.json({
      success: true,
      message: moduleItem.isCompleted
        ? `Marked "${moduleItem.skillName}" as complete! Your profile skill match has increased.`
        : `Marked "${moduleItem.skillName}" as in progress.`,
      roadmap,
      updatedUserSkills,
      gapAnalysis: newGapAnalysis
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset roadmap progress
 * @route   POST /api/roadmap/reset
 * @access  Private
 */
const resetRoadmapProgress = async (req, res, next) => {
  try {
    const { roleTitle } = req.body;
    const targetTitle = roleTitle || req.user.targetRoleTitle || 'Full Stack MERN Developer';
    const userId = req.user._id.toString();

    let roadmap = null;
    if (getIsConnected()) {
      roadmap = await Roadmap.findOne({ userId: req.user._id, jobRoleTitle: targetTitle });
      if (roadmap) {
        roadmap.modules.forEach(m => {
          m.isCompleted = false;
          m.completedAt = null;
        });
        roadmap.completedModules = 0;
        roadmap.completionPercentage = 0;
        await roadmap.save();
      }
    } else {
      roadmap = memoryRoadmaps.get(`${userId}_${targetTitle}`);
      if (roadmap) {
        roadmap.modules.forEach(m => {
          m.isCompleted = false;
          m.completedAt = null;
        });
        roadmap.completedModules = 0;
        roadmap.completionPercentage = 0;
        memoryRoadmaps.set(`${userId}_${targetTitle}`, roadmap);
      }
    }

    return res.json({
      success: true,
      message: 'Roadmap progress reset successfully',
      roadmap
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPersonalizedRoadmap,
  toggleRoadmapTopic,
  resetRoadmapProgress
};
