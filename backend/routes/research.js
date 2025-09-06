const express = require('express');
const Research = require('../models/Research');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all research
// @route   GET /api/research
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

    const research = await Research.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Research.countDocuments(query);

    res.json({
      success: true,
      data: {
        research,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get research error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching research'
    });
  }
});

// @desc    Create new research
// @route   POST /api/research
// @access  Private (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  console.log('=== RESEARCH CREATION REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Admin:', req.admin);
  console.log('=== END REQUEST LOG ===');
  
  try {
    const researchData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const research = await Research.create(researchData);

    res.status(201).json({
      success: true,
      message: 'Research created successfully',
      data: { research }
    });

  } catch (error) {
    console.error('Create research error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating research'
    });
  }
});

// Additional routes following similar pattern...
router.get('/:id', async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research || !research.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Research not found'
      });
    }
    res.json({ success: true, data: { research } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!research) {
      return res.status(404).json({ success: false, message: 'Research not found' });
    }
    res.json({ success: true, data: { research } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const research = await Research.findByIdAndDelete(req.params.id);
    if (!research) {
      return res.status(404).json({ success: false, message: 'Research not found' });
    }
    res.json({ success: true, message: 'Research deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;