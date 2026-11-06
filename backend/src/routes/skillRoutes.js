const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getCategories,
  getSkillByName
} = require('../controllers/skillController');

router.get('/', getAllSkills);
router.get('/categories', getCategories);
router.get('/:name', getSkillByName);

module.exports = router;
