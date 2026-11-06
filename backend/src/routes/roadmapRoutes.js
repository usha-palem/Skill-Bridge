const express = require('express');
const router = express.Router();
const {
  getPersonalizedRoadmap,
  toggleRoadmapTopic,
  resetRoadmapProgress
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Roadmap operations require authentication

router.get('/', getPersonalizedRoadmap);
router.put('/toggle-item', toggleRoadmapTopic);
router.post('/reset', resetRoadmapProgress);

module.exports = router;
