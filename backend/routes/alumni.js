const express = require('express');
const Alumni = require('../models/Alumni');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all alumni items
// @route   GET /api/alumni
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    
    if (req.query.section) {
      query.section = req.query.section;
    }

    const alumni = await Alumni.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Alumni.countDocuments(query);

    res.json({
      success: true,
      data: {
        alumni,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get alumni error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching alumni data'
    });
  }
});

// @desc    Get single alumni item
// @route   GET /api/alumni/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const alumniItem = await Alumni.findById(req.params.id);
    if (!alumniItem || !alumniItem.isPublished) {
      return res.status(404).json({ success: false, message: 'Alumni item not found' });
    }
    res.json({ success: true, data: { alumni: alumniItem } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc    Create alumni item
// @route   POST /api/alumni
// @access  Private (Admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const alumniData = { ...req.body, createdBy: req.admin._id };
    const alumniItem = await Alumni.create(alumniData);
    res.status(201).json({ success: true, data: { alumni: alumniItem } });
  } catch (error) {
    console.error('Create alumni error:', error);
    res.status(500).json({ success: false, message: 'Server error creating alumni item' });
  }
});

// @desc    Update alumni item
// @route   PUT /api/alumni/:id
// @access  Private (Admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const alumniItem = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alumniItem) {
      return res.status(404).json({ success: false, message: 'Alumni item not found' });
    }
    res.json({ success: true, data: { alumni: alumniItem } });
  } catch (error) {
    console.error('Update alumni error:', error);
    res.status(500).json({ success: false, message: 'Server error updating alumni item' });
  }
});

// @desc    Delete alumni item
// @route   DELETE /api/alumni/:id
// @access  Private (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const alumniItem = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumniItem) {
      return res.status(404).json({ success: false, message: 'Alumni item not found' });
    }
    res.json({ success: true, message: 'Alumni item deleted successfully' });
  } catch (error) {
    console.error('Delete alumni error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting alumni item' });
  }
});

module.exports = router;
