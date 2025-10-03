const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Incubation = require('../models/Incubation');
const { protect, adminOnly } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    } else {
      cb(null, 'uploads/documents/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for profile pictures!'), false);
      }
    } else {
      if (file.mimetype === 'application/pdf' || 
          file.mimetype === 'application/msword' ||
          file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF and DOC files are allowed!'), false);
      }
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

// @desc    Get all incubation items (public)
// @route   GET /api/incubation
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = { isPublished: true };
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    const incubationItems = await Incubation.find(query)
      .sort({ category: 1, order: 1, createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    const total = incubationItems.length;

    // Group by category for easier frontend consumption
    const groupedItems = {
      'activity': [],
      'governing-body': [],
      'management-committee': []
    };

    incubationItems.forEach(item => {
      if (groupedItems[item.category]) {
        groupedItems[item.category].push(item);
      }
    });

    res.json({
      success: true,
      data: {
        incubation: groupedItems,
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Get incubation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching incubation data'
    });
  }
});

// @desc    Get all incubation items for admin
// @route   GET /api/incubation/admin
// @access  Private (Admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const incubationItems = await Incubation.find()
      .sort({ category: 1, order: 1, createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    // Group by category
    const groupedItems = {
      'activity': [],
      'governing-body': [],
      'management-committee': []
    };

    incubationItems.forEach(item => {
      if (groupedItems[item.category]) {
        groupedItems[item.category].push(item);
      }
    });

    res.json({
      success: true,
      data: { incubation: groupedItems }
    });
  } catch (error) {
    console.error('Get admin incubation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching incubation data'
    });
  }
});

// @desc    Create new incubation item
// @route   POST /api/incubation
// @access  Private (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      order = 0,
      isPublished = true,
      image,
      document,
      // Activity fields
      icon,
      color,
      subtitle,
      // Person fields
      name,
      position,
      designation,
      organization,
      location,
      email,
      phone,
      bio,
      expertise,
      tags
    } = req.body;

    const incubationData = {
      title,
      description,
      category,
      order: parseInt(order) || 0,
      isPublished: isPublished !== false,
      // File fields
      image,
      document
    };

    // Add category-specific fields
    if (category === 'activity') {
      if (icon) incubationData.icon = icon;
      if (color) incubationData.color = color;
      if (subtitle) incubationData.subtitle = subtitle;
    } else if (category === 'governing-body' || category === 'management-committee') {
      if (name) incubationData.name = name;
      if (position) incubationData.position = position;
      if (designation) incubationData.designation = designation;
      if (organization) incubationData.organization = organization;
      if (location) incubationData.location = location;
      if (email) incubationData.email = email;
      if (phone) incubationData.phone = phone;
      if (bio) incubationData.bio = bio;
      if (expertise && expertise.length > 0) incubationData.expertise = expertise;
    }

    if (tags && tags.length > 0) incubationData.tags = tags;

    const incubationItem = await Incubation.create(incubationData);

    res.status(201).json({
      success: true,
      data: incubationItem,
      message: 'Incubation item created successfully'
    });
  } catch (error) {
    console.error('Create incubation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating incubation item'
    });
  }
});

// @desc    Update incubation item
// @route   PUT /api/incubation/:id
// @access  Private (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid incubation ID format'
      });
    }

    const incubationItem = await Incubation.findById(req.params.id);
    if (!incubationItem) {
      return res.status(404).json({
        success: false,
        message: 'Incubation item not found'
      });
    }

    const {
      title,
      description,
      category,
      order,
      isPublished,
      image,
      document,
      // Activity fields
      icon,
      color,
      subtitle,
      // Person fields
      name,
      position,
      designation,
      organization,
      location,
      email,
      phone,
      bio,
      expertise,
      tags
    } = req.body;

    // Update basic fields
    if (title !== undefined) incubationItem.title = title;
    if (description !== undefined) incubationItem.description = description;
    if (category !== undefined) incubationItem.category = category;
    if (order !== undefined) incubationItem.order = parseInt(order) || 0;
    if (isPublished !== undefined) incubationItem.isPublished = isPublished !== false;
    
    // Update file fields
    if (image !== undefined) incubationItem.image = image;
    if (document !== undefined) incubationItem.document = document;

    // Update category-specific fields
    if (category === 'activity' || incubationItem.category === 'activity') {
      if (icon !== undefined) incubationItem.icon = icon;
      if (color !== undefined) incubationItem.color = color;
      if (subtitle !== undefined) incubationItem.subtitle = subtitle;
    }
    
    if (category === 'governing-body' || category === 'management-committee' || 
        incubationItem.category === 'governing-body' || incubationItem.category === 'management-committee') {
      if (name !== undefined) incubationItem.name = name;
      if (position !== undefined) incubationItem.position = position;
      if (designation !== undefined) incubationItem.designation = designation;
      if (organization !== undefined) incubationItem.organization = organization;
      if (location !== undefined) incubationItem.location = location;
      if (email !== undefined) incubationItem.email = email;
      if (phone !== undefined) incubationItem.phone = phone;
      if (bio !== undefined) incubationItem.bio = bio;
      if (expertise !== undefined) incubationItem.expertise = expertise;
    }

    if (tags !== undefined) incubationItem.tags = tags;

    await incubationItem.save();

    res.json({
      success: true,
      data: incubationItem,
      message: 'Incubation item updated successfully'
    });
  } catch (error) {
    console.error('Update incubation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating incubation item'
    });
  }
});

// @desc    Delete incubation item
// @route   DELETE /api/incubation/:id
// @access  Private (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid incubation ID format'
      });
    }

    const incubationItem = await Incubation.findById(req.params.id);
    if (!incubationItem) {
      return res.status(404).json({
        success: false,
        message: 'Incubation item not found'
      });
    }

    await Incubation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Incubation item deleted successfully'
    });
  } catch (error) {
    console.error('Delete incubation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting incubation item'
    });
  }
});

module.exports = router;