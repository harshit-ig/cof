const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Research = require('../models/Research');
const { protect, adminOnly } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/documents/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const router = express.Router();

// @desc    Get all research
// @route   GET /api/research
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if this is an admin request (authenticated user)
    const isAdmin = req.headers.authorization && req.headers.authorization.startsWith('Bearer');
    
    let query = {};
    
    // For public requests, only show published content
    if (!isAdmin) {
      query.isPublished = true;
    }
    
    if (req.query.type) {
      query.type = req.query.type;
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.section) {
      query.section = req.query.section;
    }

    // For admin requests or when specifically requested, fetch all data without pagination
    if (isAdmin || req.query.all === 'true') {
      const research = await Research.find(query)
        .select('-__v') // Exclude version field
        .sort({ section: 1, order: 1, createdAt: -1 })
        .lean(); // Use lean() for better performance

      return res.json({
        success: true,
        data: {
          research,
          total: research.length
        }
      });
    }

    // For all requests, return all data without pagination
    const research = await Research.find(query)
      .sort({ createdAt: -1 });

    // Sanitize data to prevent corrupted fields from causing performance issues
    const sanitizedResearch = research.map(item => {
      const obj = item.toObject();
      
      // Check for corrupted duration field (string when it should be object)
      if (obj.duration && typeof obj.duration === 'string' && obj.duration.length > 1000) {
        console.warn(`Corrupted duration field detected for research ${obj._id}, sanitizing...`);
        obj.duration = { startDate: null, endDate: null };
      }
      
      return obj;
    });

    res.json({
      success: true,
      data: {
        research: sanitizedResearch
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
router.post('/', protect, adminOnly, upload.single('pdf'), async (req, res) => {
  console.log('=== RESEARCH CREATION REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('File:', req.file);
  console.log('Admin:', req.admin);
  console.log('=== END REQUEST LOG ===');
  
  try {
    const researchData = {
      ...req.body,
      createdBy: req.admin._id
    };

    // Handle JSON string fields that should be arrays
    const arrayFields = ['objectives', 'coInvestigators', 'keyFindings', 'tags'];
    arrayFields.forEach(field => {
      if (researchData[field] && typeof researchData[field] === 'string') {
        try {
          const parsed = JSON.parse(researchData[field]);
          // Only use parsed value if it's actually an array
          if (Array.isArray(parsed)) {
            researchData[field] = parsed;
          }
        } catch (e) {
          // If parsing fails, leave as-is (might be a regular string)
          console.log(`Failed to parse ${field} as JSON:`, e.message);
        }
      }
      // Fix corrupted nested arrays (like ["[\"objective1\"]"])
      if (Array.isArray(researchData[field])) {
        const fixedArray = [];
        researchData[field].forEach(item => {
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
        researchData[field] = fixedArray;
      }
    });

    // Handle JSON string fields that should be objects
    const objectFields = ['duration', 'publicationDetails', 'studentDetails', 'collaborationDetails', 'facilityDetails'];
    objectFields.forEach(field => {
      if (researchData[field] && typeof researchData[field] === 'string') {
        try {
          const parsed = JSON.parse(researchData[field]);
          // Only use parsed value if it's actually an object (and not an array)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            researchData[field] = parsed;
          }
        } catch (e) {
          // If parsing fails, leave as-is
          console.log(`Failed to parse ${field} as JSON:`, e.message);
        }
      }
    });

    // If PDF file is uploaded, add filename and originalName like FarmerResource
    if (req.file) {
      researchData.filename = req.file.filename;
      researchData.originalName = req.file.originalname;
    }

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

router.put('/:id', protect, adminOnly, upload.single('pdf'), async (req, res) => {
  console.log('=== RESEARCH UPDATE REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Params:', req.params);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Admin:', req.admin);
  console.log('=== END REQUEST LOG ===');
  
  try {
    // Validate ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid research ID format'
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

    // Handle JSON string fields that should be arrays
    const arrayFields = ['objectives', 'coInvestigators', 'keyFindings', 'tags'];
    arrayFields.forEach(field => {
      if (cleanData[field] && typeof cleanData[field] === 'string') {
        try {
          const parsed = JSON.parse(cleanData[field]);
          // Only use parsed value if it's actually an array
          if (Array.isArray(parsed)) {
            cleanData[field] = parsed;
          }
        } catch (e) {
          // If parsing fails, leave as-is (might be a regular string)
          console.log(`Failed to parse ${field} as JSON:`, e.message);
        }
      }
      // Fix corrupted nested arrays (like ["[\"objective1\"]"])
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

    // Handle JSON string fields that should be objects
    const objectFields = ['duration', 'publicationDetails', 'studentDetails', 'collaborationDetails', 'facilityDetails'];
    objectFields.forEach(field => {
      if (cleanData[field] && typeof cleanData[field] === 'string') {
        try {
          const parsed = JSON.parse(cleanData[field]);
          // Only use parsed value if it's actually an object (and not an array)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            cleanData[field] = parsed;
          }
        } catch (e) {
          // If parsing fails, leave as-is
          console.log(`Failed to parse ${field} as JSON:`, e.message);
        }
      }
    });

    // If PDF file is uploaded, add filename and originalName like FarmerResource
    if (req.file) {
      cleanData.filename = req.file.filename;
      cleanData.originalName = req.file.originalname;
      console.log('PDF file uploaded:', req.file.filename);
    }

    // Convert string numbers to actual numbers where needed
    if (cleanData.budget && typeof cleanData.budget === 'string') {
      cleanData.budget = parseFloat(cleanData.budget) || undefined;
    }

    // Handle nested objects with proper validation
    if (cleanData.publicationDetails) {
      if (cleanData.publicationDetails.year && typeof cleanData.publicationDetails.year === 'string') {
        cleanData.publicationDetails.year = parseInt(cleanData.publicationDetails.year) || undefined;
      }
      if (cleanData.publicationDetails.impactFactor && typeof cleanData.publicationDetails.impactFactor === 'string') {
        cleanData.publicationDetails.impactFactor = parseFloat(cleanData.publicationDetails.impactFactor) || undefined;
      }
    }

    if (cleanData.studentDetails && cleanData.studentDetails.completionYear && typeof cleanData.studentDetails.completionYear === 'string') {
      cleanData.studentDetails.completionYear = parseInt(cleanData.studentDetails.completionYear) || undefined;
    }

    console.log('Data after type conversion:', JSON.stringify(cleanData, null, 2));

    // Handle documents separately if they exist
    let research;
    if (cleanData.documents && Array.isArray(cleanData.documents)) {
      // Separate documents from other data
      const { documents, ...otherData } = cleanData;
      
      console.log('Updating with documents separately');
      console.log('Documents to set:', JSON.stringify(documents, null, 2));
      console.log('Other data:', JSON.stringify(otherData, null, 2));
      
      // First update other fields
      research = await Research.findByIdAndUpdate(
        req.params.id, 
        otherData, 
        { new: true, runValidators: true }
      );
      
      if (!research) {
        return res.status(404).json({ 
          success: false, 
          message: 'Research not found' 
        });
      }

      // Then update documents using direct MongoDB operation
      await mongoose.connection.db.collection('researches').updateOne(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        { $set: { documents: documents } }
      );

      // Fetch the final updated document
      research = await Research.findById(req.params.id);
    } else {
      // No documents to update, use regular update
      research = await Research.findByIdAndUpdate(
        req.params.id, 
        cleanData, 
        { new: true, runValidators: true }
      );
    }
    
    if (!research) {
      return res.status(404).json({ 
        success: false, 
        message: 'Research not found' 
      });
    }
    
    console.log('Research updated successfully:', research._id);
    res.json({ 
      success: true, 
      message: 'Research updated successfully',
      data: { research } 
    });
  } catch (error) {
    console.error('Update research error:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors: validationErrors,
        details: error.errors
      });
    }
    
    // Handle cast errors (like invalid ObjectId references)
    if (error.name === 'CastError') {
      console.log('Cast error:', error.message);
      return res.status(400).json({ 
        success: false,
        message: `Invalid ${error.path}: ${error.value}` 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.message || 'Server error updating research'
    });
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



