const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Extension = require('../models/Extension');
const { protect, adminOnly } = require('../middleware/auth');

// Configure multer for file uploads (PDF + Images)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/'); // Images go to images folder
    } else {
      cb(null, 'uploads/documents/'); // PDFs go to documents folder
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'image') {
      // Allow images
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for image field!'), false);
      }
    } else if (file.fieldname === 'pdf') {
      // Allow PDFs
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed for pdf field!'), false);
      }
    } else {
      cb(new Error('Invalid field name!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

// @desc    Get all extension items
// @route   GET /api/extension
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = { isPublished: true };
    
    if (req.query.section) {
      query.section = req.query.section;
    }

    const extensions = await Extension.find(query)
      .sort({ section: 1, order: 1, createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    const total = extensions.length;

    // Group by section for easier frontend consumption
    const groupedExtensions = {
      'farmer-training': [],
      'ffpo-shg': [],
      'demonstrations': [],
      'success-stories': []
    };

    extensions.forEach(ext => {
      if (groupedExtensions[ext.section]) {
        groupedExtensions[ext.section].push(ext);
      }
    });

    res.json({
      success: true,
      data: {
        extensions: groupedExtensions,
        totalItems: total
      }
    });
  } catch (error) {
    console.error('Get extensions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching extensions'
    });
  }
});

// @desc    Get all extension items for admin
// @route   GET /api/extension/admin
// @access  Private (Admin)
router.get('/admin', protect, adminOnly, async (req, res) => {
  try {
    const extensions = await Extension.find()
      .sort({ section: 1, order: 1, createdAt: -1 })
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    // Group by section
    const groupedExtensions = {
      'farmer-training': [],
      'ffpo-shg': [],
      'demonstrations': [],
      'success-stories': []
    };

    extensions.forEach(ext => {
      if (groupedExtensions[ext.section]) {
        groupedExtensions[ext.section].push(ext);
      }
    });

    res.json({
      success: true,
      data: { extensions: groupedExtensions }
    });
  } catch (error) {
    console.error('Get admin extensions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching extensions'
    });
  }
});

// @desc    Get single extension item
// @route   GET /api/extension/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid extension ID format'
      });
    }

    const extension = await Extension.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('updatedBy', 'name');

    if (!extension) {
      return res.status(404).json({
        success: false,
        message: 'Extension item not found'
      });
    }

    res.json({
      success: true,
      data: { extension }
    });
  } catch (error) {
    console.error('Get extension error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching extension'
    });
  }
});

// @desc    Create new extension item
// @route   POST /api/extension
// @access  Private (Admin)
router.post('/', protect, adminOnly, upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  console.log('=== EXTENSION CREATION REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Files:', req.files);
  console.log('Admin:', req.admin);
  console.log('=== END REQUEST LOG ===');
  
  try {
    const extensionData = {
      ...req.body,
      createdBy: req.admin._id
    };

    // Parse JSON strings for arrays
    if (extensionData.modules && typeof extensionData.modules === 'string') {
      try {
        extensionData.modules = JSON.parse(extensionData.modules);
      } catch (e) {
        extensionData.modules = extensionData.modules.split('\n').filter(m => m.trim());
      }
    }

    if (extensionData.activities && typeof extensionData.activities === 'string') {
      try {
        extensionData.activities = JSON.parse(extensionData.activities);
      } catch (e) {
        extensionData.activities = extensionData.activities.split('\n').filter(a => a.trim());
      }
    }

    if (extensionData.features && typeof extensionData.features === 'string') {
      try {
        extensionData.features = JSON.parse(extensionData.features);
      } catch (e) {
        extensionData.features = extensionData.features.split('\n').filter(f => f.trim());
      }
    }

    if (extensionData.impactPoints && typeof extensionData.impactPoints === 'string') {
      try {
        extensionData.impactPoints = JSON.parse(extensionData.impactPoints);
      } catch (e) {
        extensionData.impactPoints = extensionData.impactPoints.split('\n').filter(i => i.trim());
      }
    }

    if (extensionData.tags && typeof extensionData.tags === 'string') {
      try {
        extensionData.tags = JSON.parse(extensionData.tags);
      } catch (e) {
        extensionData.tags = extensionData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
    }

    // Fix corrupted nested arrays
    const arrayFields = ['modules', 'activities', 'features', 'impactPoints', 'tags'];
    arrayFields.forEach(field => {
      if (Array.isArray(extensionData[field])) {
        const fixedArray = [];
        extensionData[field].forEach(item => {
          if (typeof item === 'string') {
            try {
              // If item looks like a JSON string, try to parse it
              if (item.startsWith('[') && item.endsWith(']')) {
                const parsed = JSON.parse(item);
                if (Array.isArray(parsed)) {
                  fixedArray.push(...parsed);
                } else {
                  fixedArray.push(item);
                }
              } else {
                fixedArray.push(item);
              }
            } catch (e) {
              // If parsing fails, keep the original item
              fixedArray.push(item);
            }
          } else {
            fixedArray.push(item);
          }
        });
        extensionData[field] = fixedArray;
      }
    });

    // If PDF file is uploaded, add filename and originalName
    // Handle PDF file if present
    if (req.files && req.files.pdf && req.files.pdf[0]) {
      extensionData.filename = req.files.pdf[0].filename;
      extensionData.originalName = req.files.pdf[0].originalname;
    }
    
    // Handle Image file if present
    if (req.files && req.files.image && req.files.image[0]) {
      const imageFile = req.files.image[0];
      const imagePath = imageFile.path;
      // Extract directory from path to construct URL
      const pathParts = imagePath.split('\\').join('/').split('/');
      const uploadType = pathParts[pathParts.length - 2]; // e.g., "images"
      extensionData.imageUrl = `/uploads/${uploadType}/${imageFile.filename}`;
      extensionData.imagePath = imagePath;
    }

    const extension = await Extension.create(extensionData);

    res.status(201).json({
      success: true,
      message: 'Extension item created successfully',
      data: { extension }
    });

  } catch (error) {
    console.error('Create extension error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating extension'
    });
  }
});

// @desc    Update extension item
// @route   PUT /api/extension/:id
// @access  Private (Admin)
router.put('/:id', protect, adminOnly, upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  console.log('=== EXTENSION UPDATE REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Params:', req.params);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Files:', req.files);
  console.log('Admin:', req.admin);
  console.log('=== END REQUEST LOG ===');
  
  try {
    // Validate ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid extension ID format'
      });
    }

    // Clean the data to remove undefined values
    const cleanData = {};
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        cleanData[key] = req.body[key];
      }
    });

    console.log('Cleaned data:', JSON.stringify(cleanData, null, 2));

    // Fetch existing extension to delete old files
    const existingExtension = await Extension.findById(req.params.id);
    if (!existingExtension) {
      return res.status(404).json({
        success: false,
        message: 'Extension item not found'
      });
    }

    // Handle PDF removal flag
    if (req.body.removePdf === 'true') {
      // Delete old PDF if it exists
      if (existingExtension.filename) {
        const oldPdfPath = path.join('uploads/documents/', existingExtension.filename);
        if (fs.existsSync(oldPdfPath)) {
          try {
            fs.unlinkSync(oldPdfPath);
            console.log('Deleted extension PDF (user requested removal):', oldPdfPath);
          } catch (err) {
            console.error('Error deleting extension PDF:', err);
          }
        }
      }
      cleanData.filename = '';
      cleanData.originalName = '';
    }
    // If PDF file is uploaded, add filename and originalName
    // Handle PDF file if present
    else if (req.files && req.files.pdf && req.files.pdf[0]) {
      // Delete old PDF if it exists
      if (existingExtension.filename) {
        const oldPdfPath = path.join('uploads/documents/', existingExtension.filename);
        if (fs.existsSync(oldPdfPath)) {
          try {
            fs.unlinkSync(oldPdfPath);
            console.log('Deleted old extension PDF:', oldPdfPath);
          } catch (err) {
            console.error('Error deleting old extension PDF:', err);
          }
        }
      }
      cleanData.filename = req.files.pdf[0].filename;
      cleanData.originalName = req.files.pdf[0].originalname;
      console.log('PDF file uploaded:', req.files.pdf[0].filename);
    }
    
    // Handle Image removal flag
    if (req.body.removeImage === 'true') {
      // Delete old image if it exists
      if (existingExtension.imagePath) {
        if (fs.existsSync(existingExtension.imagePath)) {
          try {
            fs.unlinkSync(existingExtension.imagePath);
            console.log('Deleted extension image (user requested removal):', existingExtension.imagePath);
          } catch (err) {
            console.error('Error deleting extension image:', err);
          }
        }
      }
      cleanData.imageUrl = '';
      cleanData.imagePath = '';
    }
    // Handle Image file if present
    else if (req.files && req.files.image && req.files.image[0]) {
      // Delete old image if it exists
      if (existingExtension.imagePath) {
        if (fs.existsSync(existingExtension.imagePath)) {
          try {
            fs.unlinkSync(existingExtension.imagePath);
            console.log('Deleted old extension image:', existingExtension.imagePath);
          } catch (err) {
            console.error('Error deleting old extension image:', err);
          }
        }
      }
      
      const imageFile = req.files.image[0];
      const imagePath = imageFile.path;
      // Extract directory from path to construct URL
      const pathParts = imagePath.split('\\').join('/').split('/');
      const uploadType = pathParts[pathParts.length - 2]; // e.g., "images"
      cleanData.imageUrl = `/uploads/${uploadType}/${imageFile.filename}`;
      cleanData.imagePath = imagePath;
      console.log('Image file uploaded:', imageFile.filename);
    }

    // Parse JSON strings for arrays
    if (cleanData.modules && typeof cleanData.modules === 'string') {
      try {
        cleanData.modules = JSON.parse(cleanData.modules);
      } catch (e) {
        cleanData.modules = cleanData.modules.split('\n').filter(m => m.trim());
      }
    }

    if (cleanData.activities && typeof cleanData.activities === 'string') {
      try {
        cleanData.activities = JSON.parse(cleanData.activities);
      } catch (e) {
        cleanData.activities = cleanData.activities.split('\n').filter(a => a.trim());
      }
    }

    if (cleanData.features && typeof cleanData.features === 'string') {
      try {
        cleanData.features = JSON.parse(cleanData.features);
      } catch (e) {
        cleanData.features = cleanData.features.split('\n').filter(f => f.trim());
      }
    }

    if (cleanData.impactPoints && typeof cleanData.impactPoints === 'string') {
      try {
        cleanData.impactPoints = JSON.parse(cleanData.impactPoints);
      } catch (e) {
        cleanData.impactPoints = cleanData.impactPoints.split('\n').filter(i => i.trim());
      }
    }

    if (cleanData.tags && typeof cleanData.tags === 'string') {
      try {
        cleanData.tags = JSON.parse(cleanData.tags);
      } catch (e) {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
    }

    // Fix corrupted nested arrays
    const arrayFields = ['modules', 'activities', 'features', 'impactPoints', 'tags'];
    arrayFields.forEach(field => {
      if (Array.isArray(cleanData[field])) {
        const fixedArray = [];
        cleanData[field].forEach(item => {
          if (typeof item === 'string') {
            try {
              // If item looks like a JSON string, try to parse it
              if (item.startsWith('[') && item.endsWith(']')) {
                const parsed = JSON.parse(item);
                if (Array.isArray(parsed)) {
                  fixedArray.push(...parsed);
                } else {
                  fixedArray.push(item);
                }
              } else {
                fixedArray.push(item);
              }
            } catch (e) {
              // If parsing fails, keep the original item
              fixedArray.push(item);
            }
          } else {
            fixedArray.push(item);
          }
        });
        cleanData[field] = fixedArray;
      }
    });

    // Add updatedBy field
    cleanData.updatedBy = req.admin._id;

    console.log('Data after processing:', JSON.stringify(cleanData, null, 2));

    const extension = await Extension.findByIdAndUpdate(
      req.params.id, 
      cleanData, 
      { new: true, runValidators: true }
    );
    
    if (!extension) {
      return res.status(404).json({ 
        success: false, 
        message: 'Extension item not found' 
      });
    }
    
    console.log('Extension updated successfully:', extension._id);
    res.json({ 
      success: true, 
      message: 'Extension item updated successfully',
      data: { extension } 
    });
  } catch (error) {
    console.error('Update extension error:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating extension'
    });
  }
});

// @desc    Delete extension item
// @route   DELETE /api/extension/:id
// @access  Private (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid extension ID format'
      });
    }

    const extension = await Extension.findById(req.params.id);
    
    if (!extension) {
      return res.status(404).json({
        success: false,
        message: 'Extension item not found'
      });
    }

    // Delete the physical PDF file if it exists
    if (extension.filename) {
      const docPath = path.join('uploads/documents/', extension.filename);
      if (fs.existsSync(docPath)) {
        try {
          fs.unlinkSync(docPath);
          console.log('Deleted document file:', docPath);
        } catch (err) {
          console.error('Error deleting document file:', err);
        }
      }
    }

    // Delete the physical image file if it exists
    if (extension.imagePath) {
      if (fs.existsSync(extension.imagePath)) {
        try {
          fs.unlinkSync(extension.imagePath);
          console.log('Deleted image file:', extension.imagePath);
        } catch (err) {
          console.error('Error deleting image file:', err);
        }
      }
    }

    await Extension.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Extension item deleted successfully'
    });
  } catch (error) {
    console.error('Delete extension error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting extension'
    });
  }
});

module.exports = router;