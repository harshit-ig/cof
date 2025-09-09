const express = require('express');
const Collaboration = require('../models/Collaboration');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all collaborations
// @route   GET /api/collaborations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }

    const collaborations = await Collaboration.find(query)
      .sort({ 'duration.startDate': -1 })
      .skip(skip)
      .limit(limit);

    const total = await Collaboration.countDocuments(query);

    res.json({
      success: true,
      data: {
        collaborations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get collaborations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching collaborations'
    });
  }
});

// Basic CRUD operations
router.get('/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration || !collaboration.isPublished) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }
    res.json({ success: true, data: { collaboration } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const collaborationData = { ...req.body, createdBy: req.admin._id };
    const collaboration = await Collaboration.create(collaborationData);
    res.status(201).json({ success: true, data: { collaboration } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const collaboration = await Collaboration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }
    res.json({ success: true, data: { collaboration } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const collaboration = await Collaboration.findByIdAndDelete(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ success: false, message: 'Collaboration not found' });
    }
    res.json({ success: true, message: 'Collaboration deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;




