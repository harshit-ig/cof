const express = require('express');
const router = express.Router();
const AcademicsPage = require('../models/AcademicsPage');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/academics/page
// @desc    Get academics page content
// @access  Public
router.get('/page', async (req, res) => {
  try {
    let academicsPage = await AcademicsPage.findOne({ isActive: true });
    
    // If no academics page exists, create one with default content
    if (!academicsPage) {
      academicsPage = new AcademicsPage({
        departments: [
          {
            name: 'Aquaculture',
            description: 'Fish culture, breeding, and production techniques',
            icon: 'fish'
          },
          {
            name: 'Fishery Resource Management',
            description: 'Sustainable fishery and resource conservation',
            icon: 'shield'
          },
          {
            name: 'Fish Processing Technology',
            description: 'Food technology and value addition in fishery',
            icon: 'gear'
          },
          {
            name: 'Aquatic Environment Management',
            description: 'Environmental aspects of aquatic ecosystems',
            icon: 'leaf'
          }
        ],
        calendar: {
          events: [
            { event: 'Admission Opens', date: 'June 2025' },
            { event: 'Classes Begin', date: 'July 2025' },
            { event: 'Examinations', date: 'December 2025' }
          ]
        },
        regulations: [
          {
            title: 'Attendance',
            description: 'Minimum 75% attendance required'
          },
          {
            title: 'Examinations',
            description: 'Mid-term & final examination system'
          },
          {
            title: 'Grading',
            description: 'Credit-based grading system'
          }
        ],
        faculty: {
          title: 'Expert Faculty Members',
          description: 'Highly qualified and experienced faculty members specializing in various fields of fishery science.'
        }
      });
      
      await academicsPage.save();
    }

    res.json({
      success: true,
      data: academicsPage
    });
  } catch (error) {
    console.error('Error fetching academics page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching academics page',
      error: error.message
    });
  }
});

// @route   PUT /api/academics/page
// @desc    Update academics page content
// @access  Private (Admin)
router.put('/page', protect, adminOnly, async (req, res) => {
  try {
    const { departments, calendar, regulations, faculty } = req.body;

    // Validation
    if (!departments || !Array.isArray(departments)) {
      return res.status(400).json({
        success: false,
        message: 'Departments must be provided as an array'
      });
    }

    if (!calendar || !calendar.events || !Array.isArray(calendar.events)) {
      return res.status(400).json({
        success: false,
        message: 'Calendar events must be provided as an array'
      });
    }

    if (!regulations || !Array.isArray(regulations)) {
      return res.status(400).json({
        success: false,
        message: 'Regulations must be provided as an array'
      });
    }

    if (!faculty || !faculty.title || !faculty.description) {
      return res.status(400).json({
        success: false,
        message: 'Faculty title and description are required'
      });
    }

    // Find existing academics page or create new one
    let academicsPage = await AcademicsPage.findOne({ isActive: true });
    
    if (academicsPage) {
      // Update existing
      academicsPage.departments = departments;
      academicsPage.calendar = calendar;
      academicsPage.regulations = regulations;
      academicsPage.faculty = faculty;
      academicsPage.lastUpdatedBy = req.admin.id;
    } else {
      // Create new
      academicsPage = new AcademicsPage({
        departments,
        calendar,
        regulations,
        faculty,
        lastUpdatedBy: req.admin.id
      });
    }

    await academicsPage.save();

    res.json({
      success: true,
      message: 'Academics page updated successfully',
      data: academicsPage
    });
  } catch (error) {
    console.error('Error updating academics page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating academics page',
      error: error.message
    });
  }
});

// @route   DELETE /api/academics/page/reset
// @desc    Reset academics page to default content
// @access  Private (Admin)
router.delete('/page/reset', protect, adminOnly, async (req, res) => {
  try {
    // Delete existing academics page
    await AcademicsPage.deleteMany({ isActive: true });

    // Create new one with default content (will be created on next GET request)
    res.json({
      success: true,
      message: 'Academics page reset to default content'
    });
  } catch (error) {
    console.error('Error resetting academics page:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting academics page',
      error: error.message
    });
  }
});

module.exports = router;