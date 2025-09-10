const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Slideshow = require('../models/Slideshow');
const { protect } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/slideshow/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'slide_' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// GET /api/slideshow - Get all active slides ordered by order field
router.get('/', async (req, res) => {
  try {
    const slides = await Slideshow.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v');

    res.json({
      success: true,
      data: { slides },
      count: slides.length
    });
  } catch (error) {
    console.error('Error fetching slideshow:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching slideshow data',
      error: error.message
    });
  }
});

// GET /api/slideshow/admin - Get all slides for admin (including inactive)
router.get('/admin', protect, async (req, res) => {
  try {
    console.log('Admin slideshow fetch request');
    const slides = await Slideshow.find()
      .sort({ order: 1 })
      .select('-__v');

    console.log('Found slides for admin:', slides.length);

    res.json({
      success: true,
      data: { slides },
      count: slides.length
    });
  } catch (error) {
    console.error('Error fetching slideshow for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching slideshow data',
      error: error.message
    });
  }
});

// GET /api/slideshow/:id - Get single slide
router.get('/:id', async (req, res) => {
  try {
    const slide = await Slideshow.findById(req.params.id);
    
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found'
      });
    }

    res.json({
      success: true,
      data: { slide }
    });
  } catch (error) {
    console.error('Error fetching slide:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching slide',
      error: error.message
    });
  }
});

// POST /api/slideshow - Create new slide
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, cta, link, order, isActive } = req.body;

    console.log('Slideshow POST request received:');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'Image file is required'
      });
    }

    // Get the next order number if not provided
    let slideOrder = order ? parseInt(order) : 0;
    if (!order) {
      const lastSlide = await Slideshow.findOne().sort({ order: -1 });
      slideOrder = lastSlide ? lastSlide.order + 1 : 0;
    }

    const slideData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: `/uploads/slideshow/${req.file.filename}`,
      cta: cta.trim(),
      link: link.trim(),
      order: slideOrder,
      isActive: isActive === 'true' || isActive === true
    };

    console.log('Creating slide with data:', slideData);

    const slide = new Slideshow(slideData);
    await slide.save();

    console.log('Slide created successfully:', slide._id);

    res.status(201).json({
      success: true,
      message: 'Slide created successfully',
      data: { slide }
    });
  } catch (error) {
    console.error('Error creating slide:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating slide',
      error: error.message
    });
  }
});

// PUT /api/slideshow/:id - Update slide
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, cta, link, order, isActive } = req.body;

    const slide = await Slideshow.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found'
      });
    }

    const updateData = {
      title: title.trim(),
      subtitle: subtitle.trim(), 
      description: description.trim(),
      cta: cta.trim(),
      link: link.trim(),
      order: order !== undefined ? parseInt(order) || slide.order : slide.order,
      isActive: isActive === 'true' || isActive === true
    };

    // Update image if new one is uploaded
    if (req.file) {
      updateData.image = `/uploads/slideshow/${req.file.filename}`;
    }

    const updatedSlide = await Slideshow.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Slide updated successfully',
      data: { slide: updatedSlide }
    });
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating slide',
      error: error.message
    });
  }
});

// DELETE /api/slideshow/:id - Delete slide
router.delete('/:id', protect, async (req, res) => {
  try {
    const slide = await Slideshow.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({
        success: false,
        message: 'Slide not found'
      });
    }

    await Slideshow.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Slide deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting slide',
      error: error.message
    });
  }
});

// POST /api/slideshow/reorder - Reorder slides
router.post('/reorder', protect, async (req, res) => {
  try {
    const { slides } = req.body;

    if (!Array.isArray(slides)) {
      return res.status(400).json({
        success: false,
        message: 'Slides array is required'
      });
    }

    // Update order for each slide
    const updatePromises = slides.map((slide, index) => 
      Slideshow.findByIdAndUpdate(slide.id, { order: index })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Slides reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering slides:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering slides',
      error: error.message
    });
  }
});

module.exports = router;





