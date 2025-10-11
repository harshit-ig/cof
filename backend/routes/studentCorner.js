const express = require('express');
const StudentCorner = require('../models/StudentCorner');
const multer = require('multer');
const path = require('path');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Configure multer for multiple PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// @desc    Get all student corner data (public endpoint)
// @route   GET /api/student-corner
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    
    let filter = { isActive: true };
    if (type) {
      filter.type = type;
    }

    const items = await StudentCorner.find(filter)
      .sort({ sortOrder: 1, createdAt: -1 });

    // Group by type for easier frontend consumption
    const groupedData = {
      admissionGuidelines: items.filter(item => item.type === 'admission'),
      scholarships: items.filter(item => item.type === 'scholarships'),
      clubs: items.filter(item => item.type === 'clubs')
    };

    res.json({
      success: true,
      data: type ? items : groupedData
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
router.post('/', protect, adminOnly, upload.array('pdfs', 10), async (req, res) => {
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

    // Process uploaded PDF files
    const documents = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      fileSize: file.size,
      uploadDate: new Date()
    })) : [];

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
      sortOrder: sortOrder || 0,
      documents: documents,
      // Legacy support - if only one file, also set filename/originalName
      ...(req.files && req.files.length === 1 ? { 
        filename: req.files[0].filename, 
        originalName: req.files[0].originalname 
      } : {})
    });

    const savedItem = await studentCornerItem.save();

    res.status(201).json({
      success: true,
      data: savedItem,
      message: `Student corner item created successfully with ${documents.length} document(s)`
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
router.put('/:id', protect, adminOnly, upload.array('pdfs', 10), async (req, res) => {
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
      isActive,
      removeDocuments
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

    // Handle document removal
    if (removeDocuments && Array.isArray(removeDocuments)) {
      item.documents = item.documents.filter(doc => !removeDocuments.includes(doc._id.toString()));
    }

    // Add new PDF files
    if (req.files && req.files.length > 0) {
      const newDocuments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        fileSize: file.size,
        uploadDate: new Date()
      }));
      
      item.documents = [...item.documents, ...newDocuments];
      
      // Legacy support - if only one document exists, also set filename/originalName
      if (item.documents.length === 1) {
        item.filename = item.documents[0].filename;
        item.originalName = item.documents[0].originalName;
      }
    }

    const updatedItem = await item.save();

    res.json({
      success: true,
      data: updatedItem,
      message: `Student corner item updated successfully with ${item.documents.length} document(s)`
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

// @desc    Add documents to existing student corner item
// @route   POST /api/student-corner/:id/documents
// @access  Private (Admin only)
router.post('/:id/documents', protect, adminOnly, upload.array('pdfs', 10), async (req, res) => {
  try {
    const item = await StudentCorner.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Student corner item not found'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    // Add new documents
    const newDocuments = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      fileSize: file.size,
      uploadDate: new Date()
    }));

    item.documents.push(...newDocuments);
    await item.save();

    res.json({
      success: true,
      data: item,
      message: `${newDocuments.length} document(s) added successfully`
    });

  } catch (error) {
    console.error('Error adding documents:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while adding documents'
    });
  }
});

// @desc    Remove specific document from student corner item
// @route   DELETE /api/student-corner/:id/documents/:docId
// @access  Private (Admin only)
router.delete('/:id/documents/:docId', protect, adminOnly, async (req, res) => {
  try {
    const item = await StudentCorner.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Student corner item not found'
      });
    }

    const documentIndex = item.documents.findIndex(doc => doc._id.toString() === req.params.docId);
    
    if (documentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Remove the document from the array
    const removedDoc = item.documents.splice(documentIndex, 1)[0];
    await item.save();

    // TODO: Optionally delete the physical file from uploads/documents/
    // const fs = require('fs');
    // const filePath = path.join('uploads/documents/', removedDoc.filename);
    // if (fs.existsSync(filePath)) {
    //   fs.unlinkSync(filePath);
    // }

    res.json({
      success: true,
      data: item,
      message: 'Document removed successfully'
    });

  } catch (error) {
    console.error('Error removing document:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while removing document'
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