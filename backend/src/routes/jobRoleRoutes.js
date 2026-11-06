const express = require('express');
const router = express.Router();
const {
  getAllJobRoles,
  getJobRoleDetails,
  analyzeSkillGap
} = require('../controllers/jobRoleController');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, memoryUsers } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// Optional auth middleware helper for gap analysis so it can use logged-in user skills seamlessly
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      if (getIsConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = memoryUsers.get(decoded.id);
      }
    } catch {
      // Ignore token decode errors for optional auth
    }
  }
  next();
};

router.get('/', getAllJobRoles);
router.get('/:idOrTitle', getJobRoleDetails);
router.post('/:idOrTitle/analyze-gap', optionalAuth, analyzeSkillGap);

module.exports = router;
