const express = require('express');
const StudentCorner = require('../models/StudentCorner');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all student corner data (public endpoint)
// @route   GET /api/student-corner
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, page = 1, limit = 50 } = req.query;
    
    let filter = { isActive: true };
    if (type) {
      filter.type = type;
    }

    const options = {
      sort: { sortOrder: 1, createdAt: -1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    };

    const items = await StudentCorner.find(filter, null, options);
    const total = await StudentCorner.countDocuments(filter);

    // Group by type for easier frontend consumption
    const groupedData = {
      admissionGuidelines: items.filter(item => item.type === 'admission'),
      scholarships: items.filter(item => item.type === 'scholarships'),
      clubs: items.filter(item => item.type === 'clubs')
    };

    res.json({
      success: true,
      data: type ? items : groupedData,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching student corner data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student corner data'
    });
  }
});

// @desc    Get student corner item by ID
// @route   GET /api/student-corner/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await StudentCorner.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Student corner item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });

  } catch (error) {
    console.error('Error fetching student corner item:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching student corner item'
    });
  }
});

// @desc    Create new student corner item
// @route   POST /api/student-corner
// @access  Private (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const {
      type,
      name,
      description,
      category,
      guidelines,
      eligibility,
      amount,
      duration,
      benefits,
      role,
      activities,
      positions,
      sortOrder
    } = req.body;

    // Validate required fields based on type
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Type is required'
      });
    }

    const validTypes = ['admission', 'scholarships', 'clubs'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be one of: admission, scholarships, clubs'
      });
    }

    // Type-specific validation
    if (type === 'admission' && (!category || !guidelines)) {
      return res.status(400).json({
        success: false,
        message: 'Category and guidelines are required for admission items'
      });
    }

    if (type === 'scholarships' && (!name || !amount || !eligibility)) {
      return res.status(400).json({
        success: false,
        message: 'Name, amount, and eligibility are required for scholarship items'
      });
    }

    if (type === 'clubs' && (!name || !role || !activities)) {
      return res.status(400).json({
        success: false,
        message: 'Name, role, and activities are required for club items'
      });
    }

    const studentCornerItem = new StudentCorner({
      type,
      name,
      description,
      category,
      guidelines: Array.isArray(guidelines) ? guidelines : [],
      eligibility,
      amount,
      duration,
      benefits: Array.isArray(benefits) ? benefits : [],
      role,
      activities: Array.isArray(activities) ? activities : [],
      positions: Array.isArray(positions) ? positions : [],
      sortOrder: sortOrder || 0
    });

    const savedItem = await studentCornerItem.save();

    res.status(201).json({
      success: true,
      data: savedItem,
      message: 'Student corner item created successfully'
    });

  } catch (error) {
    console.error('Error creating student corner item:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating student corner item'
    });
  }
});

// @desc    Update student corner item
// @route   PUT /api/student-corner/:id
// @access  Private (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await StudentCorner.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Student corner item not found'
      });
    }

    const {
      type,
      name,
      description,
      category,
      guidelines,
      eligibility,
      amount,
      duration,
      benefits,
      role,
      activities,
      positions,
      sortOrder,
      isActive
    } = req.body;

    // Update fields
    if (type !== undefined) item.type = type;
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (category !== undefined) item.category = category;
    if (guidelines !== undefined) item.guidelines = Array.isArray(guidelines) ? guidelines : [];
    if (eligibility !== undefined) item.eligibility = eligibility;
    if (amount !== undefined) item.amount = amount;
    if (duration !== undefined) item.duration = duration;
    if (benefits !== undefined) item.benefits = Array.isArray(benefits) ? benefits : [];
    if (role !== undefined) item.role = role;
    if (activities !== undefined) item.activities = Array.isArray(activities) ? activities : [];
    if (positions !== undefined) item.positions = Array.isArray(positions) ? positions : [];
    if (sortOrder !== undefined) item.sortOrder = sortOrder;
    if (isActive !== undefined) item.isActive = isActive;

    const updatedItem = await item.save();

    res.json({
      success: true,
      data: updatedItem,
      message: 'Student corner item updated successfully'
    });

  } catch (error) {
    console.error('Error updating student corner item:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating student corner item'
    });
  }
});

// @desc    Delete student corner item
// @route   DELETE /api/student-corner/:id
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await StudentCorner.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Student corner item not found'
      });
    }

    await StudentCorner.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Student corner item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting student corner item:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting student corner item'
    });
  }
});

// @desc    Update sort order of multiple items
// @route   POST /api/student-corner/reorder
// @access  Private (Admin only)
router.post('/reorder', protect, adminOnly, async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    // Update sort order for each item
    const updatePromises = items.map((item, index) => 
      StudentCorner.findByIdAndUpdate(
        item.id, 
        { sortOrder: index }, 
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Sort order updated successfully'
    });

  } catch (error) {
    console.error('Error updating sort order:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating sort order'
    });
  }
});

module.exports = router;