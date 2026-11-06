const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getUserSkills,
  addUserSkill,
  syncUserSkills,
  deleteUserSkill
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All user profile routes require authentication

router.put('/profile', updateProfile);
router.get('/skills', getUserSkills);
router.post('/skills', addUserSkill);
router.put('/skills/bulk', syncUserSkills);
router.delete('/skills/:skillName', deleteUserSkill);

module.exports = router;
