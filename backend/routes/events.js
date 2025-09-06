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
      type: { $in: ['event', 'seminar', 'workshop', 'visit', 'conference', 'training'] }
    };

    // For admin requests, show all events including drafts
    if (req.user) {
      // Admin can see all events
    } else {
      // Public can only see published events
      query.isPublished = true;
    }

    // Add search functionality
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const events = await NewsEvent.find(query)
      .sort({ eventDate: -1, createdAt: -1 })
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

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await NewsEvent.findById(req.params.id);

    if (!event || !['event', 'seminar', 'workshop', 'visit'].includes(event.type)) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });

  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching event'
    });
  }
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    // Ensure the type is an event type
    if (!['event', 'seminar', 'workshop', 'visit', 'conference', 'training'].includes(req.body.type)) {
      req.body.type = 'event';
    }

    const event = new NewsEvent(req.body);
    const savedEvent = await event.save();

    res.status(201).json({
      success: true,
      data: savedEvent
    });

  } catch (error) {
    console.error('Create event error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating event'
    });
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await NewsEvent.findById(req.params.id);

    if (!event || !['event', 'seminar', 'workshop', 'visit', 'conference', 'training'].includes(event.type)) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Ensure the type remains an event type
    if (!['event', 'seminar', 'workshop', 'visit', 'conference', 'training'].includes(req.body.type)) {
      req.body.type = event.type;
    }

    const updatedEvent = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedEvent
    });

  } catch (error) {
    console.error('Update event error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating event'
    });
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const event = await NewsEvent.findById(req.params.id);

    if (!event || !['event', 'seminar', 'workshop', 'visit', 'conference', 'training'].includes(event.type)) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await NewsEvent.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting event'
    });
  }
});

module.exports = router;