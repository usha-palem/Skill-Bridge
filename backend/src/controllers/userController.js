const User = require('../models/User');
const JobRole = require('../models/JobRole');
const { getIsConnected } = require('../config/db');
const { memoryUsers } = require('../middleware/authMiddleware');

/**
 * @desc    Update student profile details
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, college, degree, graduationYear, bio, targetRoleTitle, targetRoleId } = req.body;

    if (getIsConnected()) {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (email && email.toLowerCase().trim() !== user.email.toLowerCase()) {
        const emailLower = email.toLowerCase().trim();
        const existing = await User.findOne({ email: emailLower, _id: { $ne: user._id } });
        if (existing) {
          return res.status(400).json({ success: false, message: 'This email is already registered to another account' });
        }
        user.email = emailLower;
      }

      if (name) user.name = name;
      if (college) user.college = college;
      if (degree) user.degree = degree;
      if (graduationYear) user.graduationYear = graduationYear;
      if (bio !== undefined) user.bio = bio;
      if (targetRoleTitle) user.targetRoleTitle = targetRoleTitle;

      if (targetRoleId) {
        user.targetRoleId = targetRoleId;
      } else if (targetRoleTitle) {
        const found = await JobRole.findOne({ title: targetRoleTitle });
        if (found) user.targetRoleId = found._id;
      }

      const updatedUser = await user.save();
      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } else {
      const user = memoryUsers.get(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found in session' });
      }

      if (email && email.toLowerCase().trim() !== user.email.toLowerCase()) {
        const emailLower = email.toLowerCase().trim();
        for (const [id, u] of memoryUsers.entries()) {
          if (id !== req.user._id && u.email === emailLower) {
            return res.status(400).json({ success: false, message: 'This email is already registered to another account' });
          }
        }
        user.email = emailLower;
      }

      if (name) user.name = name;
      if (college) user.college = college;
      if (degree) user.degree = degree;
      if (graduationYear) user.graduationYear = graduationYear;
      if (bio !== undefined) user.bio = bio;
      if (targetRoleTitle) user.targetRoleTitle = targetRoleTitle;
      if (targetRoleId) user.targetRoleId = targetRoleId;

      memoryUsers.set(req.user._id, user);

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's selected skills
 * @route   GET /api/users/skills
 * @access  Private
 */
const getUserSkills = async (req, res, next) => {
  try {
    const skills = req.user.skills || [];
    return res.json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add or update a skill in student portfolio
 * @route   POST /api/users/skills
 * @access  Private
 */
const addUserSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required' });
    }

    const validProficiencies = ['Beginner', 'Intermediate', 'Advanced'];
    const chosenProficiency = validProficiencies.includes(proficiency) ? proficiency : 'Beginner';

    if (getIsConnected()) {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      // Check if skill already exists in user portfolio
      const existingIndex = user.skills.findIndex(
        s => s.name.toLowerCase() === name.toLowerCase()
      );

      if (existingIndex > -1) {
        // Update existing skill
        user.skills[existingIndex].proficiency = chosenProficiency;
        if (category) user.skills[existingIndex].category = category;
      } else {
        // Push new skill
        user.skills.push({
          name: name.trim(),
          category: category || 'General',
          proficiency: chosenProficiency,
          addedAt: new Date()
        });
      }

      await user.save();

      return res.status(200).json({
        success: true,
        message: `Skill "${name}" saved to your profile with ${chosenProficiency} level.`,
        skills: user.skills
      });
    } else {
      const user = memoryUsers.get(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found in session' });

      const existingIndex = user.skills.findIndex(
        s => s.name.toLowerCase() === name.toLowerCase()
      );

      if (existingIndex > -1) {
        user.skills[existingIndex].proficiency = chosenProficiency;
        if (category) user.skills[existingIndex].category = category;
      } else {
        user.skills.push({
          _id: 'skill_' + Date.now(),
          name: name.trim(),
          category: category || 'General',
          proficiency: chosenProficiency,
          addedAt: new Date()
        });
      }

      memoryUsers.set(req.user._id, user);

      return res.status(200).json({
        success: true,
        message: `Skill "${name}" saved with ${chosenProficiency} level.`,
        skills: user.skills
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Bulk replace or sync student skills
 * @route   PUT /api/users/skills/bulk
 * @access  Private
 */
const syncUserSkills = async (req, res, next) => {
  try {
    const { skills } = req.body;
    if (!Array.isArray(skills)) {
      return res.status(400).json({ success: false, message: 'Skills must be an array' });
    }

    if (getIsConnected()) {
      const user = await User.findById(req.user._id);
      user.skills = skills;
      await user.save();
      return res.json({ success: true, message: 'Skills updated successfully', skills: user.skills });
    } else {
      const user = memoryUsers.get(req.user._id);
      user.skills = skills.map((s, i) => ({ ...s, _id: s._id || `s_${i}_${Date.now()}` }));
      memoryUsers.set(req.user._id, user);
      return res.json({ success: true, message: 'Skills updated successfully', skills: user.skills });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a skill from student portfolio
 * @route   DELETE /api/users/skills/:skillName
 * @access  Private
 */
const deleteUserSkill = async (req, res, next) => {
  try {
    const skillName = decodeURIComponent(req.params.skillName).toLowerCase();

    if (getIsConnected()) {
      const user = await User.findById(req.user._id);
      user.skills = user.skills.filter(s => s.name.toLowerCase() !== skillName);
      await user.save();
      return res.json({
        success: true,
        message: 'Skill removed from portfolio',
        skills: user.skills
      });
    } else {
      const user = memoryUsers.get(req.user._id);
      user.skills = user.skills.filter(s => s.name.toLowerCase() !== skillName);
      memoryUsers.set(req.user._id, user);
      return res.json({
        success: true,
        message: 'Skill removed from portfolio',
        skills: user.skills
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  getUserSkills,
  addUserSkill,
  syncUserSkills,
  deleteUserSkill
};
