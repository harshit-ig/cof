const express = require('express');
const Infrastructure = require('../models/Infrastructure');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all infrastructure
// @route   GET /api/infrastructure
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    
    if (req.query.type) {
      query.type = req.query.type;
    }

    const infrastructure = await Infrastructure.find(query)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Infrastructure.countDocuments(query);

    res.json({
      success: true,
      data: {
        infrastructure,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get infrastructure error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching infrastructure'
    });
  }
});

// Basic CRUD operations
router.get('/:id', async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findById(req.params.id);
    if (!infrastructure || !infrastructure.isActive) {
      return res.status(404).json({ success: false, message: 'Infrastructure not found' });
    }
    res.json({ success: true, data: { infrastructure } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const infrastructureData = { ...req.body, createdBy: req.admin._id };
    const infrastructure = await Infrastructure.create(infrastructureData);
    res.status(201).json({ success: true, data: { infrastructure } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!infrastructure) {
      return res.status(404).json({ success: false, message: 'Infrastructure not found' });
    }
    res.json({ success: true, data: { infrastructure } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findByIdAndDelete(req.params.id);
    if (!infrastructure) {
      return res.status(404).json({ success: false, message: 'Infrastructure not found' });
    }
    res.json({ success: true, message: 'Infrastructure deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;




