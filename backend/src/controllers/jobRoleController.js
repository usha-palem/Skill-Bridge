const JobRole = require('../models/JobRole');
const sampleJobRoles = require('../data/sampleJobRoles');
const { getIsConnected } = require('../config/db');
const { calculateSkillGap } = require('../utils/skillGapCalculator');

/**
 * @desc    Get all job roles
 * @route   GET /api/jobs
 * @access  Public
 */
const getAllJobRoles = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    let roles = [];

    if (getIsConnected()) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.title = { $regex: search, $options: 'i' };
      }

      roles = await JobRole.find(query);
      if (roles.length === 0 && !search && (!category || category === 'All')) {
        roles = sampleJobRoles;
      }
    } else {
      roles = sampleJobRoles.filter(role => {
        const matchesCat = !category || category === 'All' || role.category === category;
        const matchesSearch = !search || role.title.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
      });
    }

    return res.json({
      success: true,
      count: roles.length,
      jobRoles: roles
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single job role by ID or Title
 * @route   GET /api/jobs/:idOrTitle
 * @access  Public
 */
const getJobRoleDetails = async (req, res, next) => {
  try {
    const param = decodeURIComponent(req.params.idOrTitle);

    let jobRole = null;

    if (getIsConnected()) {
      // Check if valid ObjectId
      if (param.match(/^[0-9a-fA-F]{24}$/)) {
        jobRole = await JobRole.findById(param);
      } else {
        jobRole = await JobRole.findOne({ title: new RegExp(`^${param}$`, 'i') });
      }
    }

    if (!jobRole) {
      jobRole = sampleJobRoles.find(
        r => r.title.toLowerCase() === param.toLowerCase() || (r._id && r._id.toString() === param)
      );
    }

    if (!jobRole) {
      return res.status(404).json({
        success: false,
        message: `Job role "${param}" not found`
      });
    }

    return res.json({
      success: true,
      jobRole
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Dynamic Skill Gap Analysis between student skills & job role
 * @route   POST /api/jobs/:idOrTitle/analyze-gap
 * @access  Public / Private (uses req.user skills if authenticated and none provided in body)
 */
const analyzeSkillGap = async (req, res, next) => {
  try {
    const param = decodeURIComponent(req.params.idOrTitle);

    let jobRole = null;
    if (getIsConnected()) {
      if (param.match(/^[0-9a-fA-F]{24}$/)) {
        jobRole = await JobRole.findById(param);
      } else {
        jobRole = await JobRole.findOne({ title: new RegExp(`^${param}$`, 'i') });
      }
    }

    if (!jobRole) {
      jobRole = sampleJobRoles.find(
        r => r.title.toLowerCase() === param.toLowerCase() || (r._id && r._id.toString() === param)
      );
    }

    if (!jobRole) {
      return res.status(404).json({
        success: false,
        message: `Job role "${param}" not found`
      });
    }

    // Determine student skills: either provided explicitly in body, or fetched from logged in user
    let studentSkills = req.body.skills;
    if (!studentSkills || !Array.isArray(studentSkills)) {
      if (req.user && Array.isArray(req.user.skills)) {
        studentSkills = req.user.skills;
      } else {
        studentSkills = [];
      }
    }

    // Perform dynamic calculation
    const gapAnalysis = calculateSkillGap(studentSkills, jobRole);

    return res.json({
      success: true,
      jobRole: {
        _id: jobRole._id,
        title: jobRole.title,
        category: jobRole.category,
        averageSalary: jobRole.averageSalary,
        hiringDemand: jobRole.hiringDemand,
        experienceLevel: jobRole.experienceLevel
      },
      analysis: gapAnalysis
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobRoles,
  getJobRoleDetails,
  analyzeSkillGap
};
