const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Protect routes middleware
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token ? token.substring(0, 20) + '...' : 'No token');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        console.log('Admin not found for token');
        return res.status(401).json({
          success: false,
          message: 'Not authorized, admin not found'
        });
      }

      if (!req.admin.isActive) {
        console.log('Admin account is deactivated');
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      console.log('Authentication successful for admin:', req.admin.username);
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      console.log('Problematic token:', token ? token.substring(0, 50) + '...' : 'No token');
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
}

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied, admin privileges required'
    });
  }
};

module.exports = {
  generateToken,
  protect,
  adminOnly
};