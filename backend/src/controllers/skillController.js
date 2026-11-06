const Skill = require('../models/Skill');
const sampleSkills = require('../data/sampleSkills');
const { getIsConnected } = require('../config/db');

/**
 * @desc    Get all available skills with search & category filtering
 * @route   GET /api/skills
 * @access  Public
 */
const getAllSkills = async (req, res, next) => {
  try {
    const { category, search } = req.query;

    let skillsList = [];

    if (getIsConnected()) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      skillsList = await Skill.find(query).sort({ name: 1 });
      
      // If DB is connected but empty, return sampleSkills
      if (skillsList.length === 0 && !search && (!category || category === 'All')) {
        skillsList = sampleSkills;
      }
    } else {
      // In-Memory Mode
      skillsList = sampleSkills.filter(skill => {
        const matchesCategory = !category || category === 'All' || skill.category === category;
        const matchesSearch = !search || skill.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }

    return res.json({
      success: true,
      count: skillsList.length,
      skills: skillsList
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all distinct skill categories
 * @route   GET /api/skills/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = [
      'All',
      'Frontend',
      'Backend',
      'Database',
      'Cloud & DevOps',
      'Programming Languages',
      'System Architecture',
      'AI & Data Science',
      'Security & Testing'
    ];

    return res.json({
      success: true,
      categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get specific skill details & resources
 * @route   GET /api/skills/:name
 * @access  Public
 */
const getSkillByName = async (req, res, next) => {
  try {
    const skillName = decodeURIComponent(req.params.name).toLowerCase();

    let foundSkill = null;
    if (getIsConnected()) {
      foundSkill = await Skill.findOne({ name: new RegExp(`^${skillName}$`, 'i') });
    }

    if (!foundSkill) {
      foundSkill = sampleSkills.find(s => s.name.toLowerCase() === skillName);
    }

    if (!foundSkill) {
      return res.status(404).json({
        success: false,
        message: `Skill "${req.params.name}" not found in knowledge catalog`
      });
    }

    return res.json({
      success: true,
      skill: foundSkill
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSkills,
  getCategories,
  getSkillByName
};
