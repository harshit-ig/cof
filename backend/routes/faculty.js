const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Faculty = require('../models/Faculty');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    
    if (req.query.department) {
      query.department = new RegExp(req.query.department, 'i');
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    const faculty = await Faculty.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Faculty.countDocuments(query);

    res.json({
      success: true,
      data: {
        faculty,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching faculty'
    });
  }
});

// @desc    Get single faculty member
// @route   GET /api/faculty/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty || !faculty.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      data: { faculty }
    });

  } catch (error) {
    console.error('Get faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching faculty member'
    });
  }
});

// @desc    Create new faculty member
// @route   POST /api/faculty
// @access  Private (Admin only)
router.post('/', protect, adminOnly, [
  body('name').notEmpty().trim().escape(),
  body('designation').notEmpty().trim(),
  body('department').notEmpty().trim(),
  body('qualification').notEmpty().trim(),
  body('specialization').notEmpty().trim(),
  body('experience').isInt({ min: 0 }),
  body('email').optional().isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const facultyData = {
      ...req.body,
      createdBy: req.admin._id
    };

    console.log('Creating faculty with data:', facultyData);
    console.log('Image field in request:', req.body.image);

    const faculty = await Faculty.create(facultyData);

    res.status(201).json({
      success: true,
      message: 'Faculty member created successfully',
      data: { faculty }
    });

  } catch (error) {
    console.error('Create faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating faculty member'
    });
  }
});

// @desc    Update faculty member
// @route   PUT /api/faculty/:id
// @access  Private (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: 'Faculty member updated successfully',
      data: { faculty }
    });

  } catch (error) {
    console.error('Update faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating faculty member'
    });
  }
});

// @desc    Delete faculty member
// @route   DELETE /api/faculty/:id
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }

    res.json({
      success: true,
      message: 'Faculty member deleted successfully'
    });

  } catch (error) {
    console.error('Delete faculty error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting faculty member'
    });
  }
});

module.exports = router;




