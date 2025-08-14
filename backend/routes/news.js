const express = require('express');
const { body, validationResult, query } = require('express-validator');
const NewsEvent = require('../models/NewsEvent');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all news and events
// @route   GET /api/news
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('type').optional().isIn(['news', 'event', 'announcement', 'seminar', 'workshop', 'visit']),
  query('category').optional().isIn(['academic', 'research', 'extension', 'general', 'placement']),
  query('featured').optional().isBoolean(),
  query('search').optional().trim()
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Get news/events with pagination
    const newsEvents = await NewsEvent.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NewsEvent.countDocuments(query);

    res.json({
      success: true,
      data: {
        newsEvents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get news/events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching news/events'
    });
  }
});

// @desc    Get single news/event
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    if (!newsEvent.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not available'
      });
    }

    // Increment views
    newsEvent.views += 1;
    await newsEvent.save();

    res.json({
      success: true,
      data: {
        newsEvent
      }
    });

  } catch (error) {
    console.error('Get news/event error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid news/event ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error fetching news/event'
    });
  }
});

// @desc    Create new news/event
// @route   POST /api/news
// @access  Private (Admin only)
router.post('/', protect, adminOnly, [
  body('title').notEmpty().trim().escape(),
  body('content').notEmpty().trim(),
  body('excerpt').notEmpty().trim().isLength({ max: 300 }),
  body('type').isIn(['news', 'event', 'announcement', 'seminar', 'workshop', 'visit']),
  body('category').isIn(['academic', 'research', 'extension', 'general', 'placement']),
  body('eventDate').optional().isISO8601(),
  body('venue').optional().trim(),
  body('organizer').optional().trim()
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

    const newsEventData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const newsEvent = await NewsEvent.create(newsEventData);

    res.status(201).json({
      success: true,
      message: 'News/Event created successfully',
      data: {
        newsEvent
      }
    });

  } catch (error) {
    console.error('Create news/event error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating news/event'
    });
  }
});

// @desc    Update news/event
// @route   PUT /api/news/:id
// @access  Private (Admin only)
router.put('/:id', protect, adminOnly, [
  body('title').optional().notEmpty().trim().escape(),
  body('content').optional().notEmpty().trim(),
  body('excerpt').optional().notEmpty().trim().isLength({ max: 300 }),
  body('type').optional().isIn(['news', 'event', 'announcement', 'seminar', 'workshop', 'visit']),
  body('category').optional().isIn(['academic', 'research', 'extension', 'general', 'placement']),
  body('eventDate').optional().isISO8601(),
  body('venue').optional().trim(),
  body('organizer').optional().trim()
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

    const newsEvent = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    res.json({
      success: true,
      message: 'News/Event updated successfully',
      data: {
        newsEvent
      }
    });

  } catch (error) {
    console.error('Update news/event error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid news/event ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating news/event'
    });
  }
});

// @desc    Delete news/event
// @route   DELETE /api/news/:id
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const newsEvent = await NewsEvent.findById(req.params.id);

    if (!newsEvent) {
      return res.status(404).json({
        success: false,
        message: 'News/Event not found'
      });
    }

    await NewsEvent.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'News/Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete news/event error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid news/event ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error deleting news/event'
    });
  }
});

module.exports = router;