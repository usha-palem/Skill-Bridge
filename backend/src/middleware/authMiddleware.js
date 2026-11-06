const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

// In-memory user store fallback if MongoDB is not connected
const memoryUsers = new Map();

const JWT_SECRET = process.env.JWT_SECRET || 'skillbridge_super_secret_jwt_key_2026';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (getIsConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback memory store lookup
        req.user = memoryUsers.get(decoded.id) || null;
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user profile not found'
        });
      }

      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired session token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }
};

module.exports = { protect, memoryUsers, JWT_SECRET };
