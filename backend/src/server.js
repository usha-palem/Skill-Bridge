const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const jobRoleRoutes = require('./routes/jobRoleRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Welcome & Health Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'SkillBridge Academic-to-Industry Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/jobs', jobRoleRoutes);
app.use('/api/roadmap', roadmapRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Models & Seed Data for Auto-Initialization
const Skill = require('./models/Skill');
const JobRole = require('./models/JobRole');
const sampleSkills = require('./data/sampleSkills');
const sampleJobRoles = require('./data/sampleJobRoles');
const { getIsConnected } = require('./config/db');

// Initialize Database Connection and start server
connectDB().then(async () => {
  // Auto-seed if database is freshly created on MongoDB Atlas or local
  if (getIsConnected()) {
    try {
      const skillCount = await Skill.countDocuments();
      if (skillCount === 0) {
        console.log(`📥 Fresh database detected. Auto-seeding ${sampleSkills.length} skills and ${sampleJobRoles.length} job roles...`);
        await Skill.insertMany(sampleSkills);
        await JobRole.insertMany(sampleJobRoles);
        console.log('✅ Database auto-seeded with sample skills & roles successfully!');
      }
    } catch (seedErr) {
      console.warn('Auto-seed check notice:', seedErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 SkillBridge Server running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`=======================================================`);
  });
});
