const express = require('express');
const NewsEvent = require('../models/NewsEvent');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { 
      isPublished: true,
      type: { $in: ['event', 'seminar', 'workshop', 'visit'] }
    };

    const events = await NewsEvent.find(query)
      .sort({ eventDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NewsEvent.countDocuments(query);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching events'
    });
  }
});

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const events = await NewsEvent.find({
      isPublished: true,
      type: { $in: ['event', 'seminar', 'workshop'] },
      eventDate: { $gte: new Date() }
    })
    .sort({ eventDate: 1 })
    .limit(limit);

    res.json({
      success: true,
      data: { events }
    });

  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching upcoming events'
    });
  }
});

module.exports = router;