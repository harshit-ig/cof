const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Program = require('../models/Program');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('department').optional().trim(),
  query('level').optional().isIn(['undergraduate', 'postgraduate', 'diploma', 'certificate']),
  query('search').optional().trim()
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };

    if (req.query.department) {
      query.department = new RegExp(req.query.department, 'i');
    }

    if (req.query.level) {
      query.level = req.query.level;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Get programs with pagination
    const programs = await Program.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Program.countDocuments(query);

    res.json({
      success: true,
      data: {
        programs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching programs'
    });
  }
});

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    if (!program.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Program not available'
      });
    }

    res.json({
      success: true,
      data: {
        program
      }
    });

  } catch (error) {
    console.error('Get program error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error fetching program'
    });
  }
});

// @desc    Create new program
// @route   POST /api/programs
// @access  Private (Admin only)
router.post('/', protect, adminOnly, [
  body('title').notEmpty().trim().escape(),
  body('description').notEmpty().trim(),
  body('duration').notEmpty().trim(),
  body('eligibility').notEmpty().trim(),
  body('fees').isNumeric(),
  body('intake').isInt({ min: 1 }),
  body('department').notEmpty().trim(),
  body('level').isIn(['undergraduate', 'postgraduate', 'diploma', 'certificate'])
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const programData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const program = await Program.create(programData);

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: {
        program
      }
    });

  } catch (error) {
    console.error('Create program error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating program'
    });
  }
});

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private (Admin only)
router.put('/:id', protect, adminOnly, [
  body('title').optional().notEmpty().trim().escape(),
  body('description').optional().notEmpty().trim(),
  body('duration').optional().notEmpty().trim(),
  body('eligibility').optional().notEmpty().trim(),
  body('fees').optional().isNumeric(),
  body('intake').optional().isInt({ min: 1 }),
  body('department').optional().notEmpty().trim(),
  body('level').optional().isIn(['undergraduate', 'postgraduate', 'diploma', 'certificate'])
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: {
        program
      }
    });

  } catch (error) {
    console.error('Update program error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating program'
    });
  }
});

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    await Program.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });

  } catch (error) {
    console.error('Delete program error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error deleting program'
    });
  }
});

module.exports = router;