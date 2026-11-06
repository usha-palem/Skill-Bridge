const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const JobRole = require('../models/JobRole');
const { getIsConnected } = require('../config/db');
const { memoryUsers, JWT_SECRET } = require('../middleware/authMiddleware');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

/**
 * @desc    Register a new student
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, college, degree, graduationYear, targetRoleTitle } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and a password (min 6 characters)'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Default starter skills for realistic demo
    const defaultStarterSkills = [
      { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'Intermediate' },
      { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 'Intermediate' },
      { name: 'React', category: 'Frontend', proficiency: 'Beginner' },
      { name: 'Git & GitHub', category: 'Cloud & DevOps', proficiency: 'Beginner' }
    ];

    if (getIsConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        });
      }

      // Check if target role exists in DB
      let targetRoleId = null;
      if (targetRoleTitle) {
        const foundRole = await JobRole.findOne({ title: targetRoleTitle });
        if (foundRole) targetRoleId = foundRole._id;
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        college: college || 'National Institute of Engineering',
        degree: degree || 'B.Tech / B.E. Computer Science',
        graduationYear: graduationYear || 2026,
        targetRoleTitle: targetRoleTitle || 'Full Stack MERN Developer',
        targetRoleId,
        skills: defaultStarterSkills
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome to SkillBridge.',
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          degree: user.degree,
          graduationYear: user.graduationYear,
          bio: user.bio,
          targetRoleTitle: user.targetRoleTitle,
          targetRoleId: user.targetRoleId,
          skills: user.skills,
          completedRoadmapItems: user.completedRoadmapItems || []
        }
      });
    } else {
      // In-Memory Mode fallback
      const emailLower = email.toLowerCase();
      for (const existing of memoryUsers.values()) {
        if (existing.email === emailLower) {
          return res.status(400).json({
            success: false,
            message: 'An account with this email address already exists in session.'
          });
        }
      }

      const mockId = 'mem_usr_' + Date.now();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: mockId,
        name,
        email: emailLower,
        password: hashedPassword,
        college: college || 'National Institute of Engineering',
        degree: degree || 'B.Tech / B.E. Computer Science',
        graduationYear: graduationYear || 2026,
        bio: 'Passionate computer science student eager to transition academic foundations into high-impact industry software engineering.',
        targetRoleTitle: targetRoleTitle || 'Full Stack MERN Developer',
        targetRoleId: null,
        skills: defaultStarterSkills.map((s, idx) => ({ ...s, _id: `skill_${idx}_${Date.now()}` })),
        completedRoadmapItems: [],
        createdAt: new Date().toISOString()
      };

      memoryUsers.set(mockId, newUser);

      return res.status(201).json({
        success: true,
        message: 'Account created successfully (High-Resiliency Mode Active)!',
        token: generateToken(mockId),
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          college: newUser.college,
          degree: newUser.degree,
          graduationYear: newUser.graduationYear,
          bio: newUser.bio,
          targetRoleTitle: newUser.targetRoleTitle,
          targetRoleId: newUser.targetRoleId,
          skills: newUser.skills,
          completedRoadmapItems: newUser.completedRoadmapItems
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email address and password'
      });
    }

    const emailLower = email.toLowerCase();

    if (getIsConnected()) {
      const user = await User.findOne({ email: emailLower }).select('+password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. User with this email was not found.'
        });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Incorrect password.'
        });
      }

      return res.json({
        success: true,
        message: 'Login successful. Welcome back!',
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          degree: user.degree,
          graduationYear: user.graduationYear,
          bio: user.bio,
          targetRoleTitle: user.targetRoleTitle,
          targetRoleId: user.targetRoleId,
          skills: user.skills,
          completedRoadmapItems: user.completedRoadmapItems || []
        }
      });
    } else {
      // Memory Store lookup
      let foundUser = null;
      for (const u of memoryUsers.values()) {
        if (u.email === emailLower) {
          foundUser = u;
          break;
        }
      }

      // If not in memory store yet (e.g. fresh reboot), allow demo login with default demo account
      if (!foundUser) {
        if (emailLower === 'demo@student.edu' || emailLower === 'student@skillbridge.edu') {
          const mockId = 'mem_demo_student';
          foundUser = {
            _id: mockId,
            name: 'Alex Rivera',
            email: emailLower,
            password: await bcrypt.hash('password123', 10),
            college: 'State Technical University',
            degree: 'B.Tech in Computer Science & Engineering',
            graduationYear: 2026,
            bio: 'Aspiring Full Stack Engineer passionate about building scalable web platforms and solving modern cloud architecture challenges.',
            targetRoleTitle: 'Full Stack MERN Developer',
            targetRoleId: null,
            skills: [
              { _id: 's1', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'Intermediate' },
              { _id: 's2', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 'Intermediate' },
              { _id: 's3', name: 'React', category: 'Frontend', proficiency: 'Beginner' },
              { _id: 's4', name: 'Git & GitHub', category: 'Cloud & DevOps', proficiency: 'Beginner' }
            ],
            completedRoadmapItems: [],
            createdAt: new Date().toISOString()
          };
          memoryUsers.set(mockId, foundUser);
        } else {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. Account not found. You can register a new account or sign in with demo credentials: demo@student.edu / password123'
          });
        }
      }

      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password. Please check your credentials.'
        });
      }

      return res.json({
        success: true,
        message: 'Login successful. Welcome back!',
        token: generateToken(foundUser._id),
        user: {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          college: foundUser.college,
          degree: foundUser.degree,
          graduationYear: foundUser.graduationYear,
          bio: foundUser.bio,
          targetRoleTitle: foundUser.targetRoleTitle,
          targetRoleId: foundUser.targetRoleId,
          skills: foundUser.skills,
          completedRoadmapItems: foundUser.completedRoadmapItems || []
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user details
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
