const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads/images', 'uploads/documents', 'uploads/faculty', 'uploads/news', 'uploads/research', 'uploads/dean'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/images'; // default
    
    // Determine upload path based on file type, route, or request body
    const category = req.body.category;
    
    if (category === 'dean') {
      uploadPath = 'uploads/dean';
    } else if (req.route.path.includes('faculty') || category === 'faculty') {
      uploadPath = 'uploads/faculty';
    } else if (req.route.path.includes('news') || req.route.path.includes('events') || category === 'news') {
      uploadPath = 'uploads/news';
    } else if (req.route.path.includes('research') || category === 'research') {
      uploadPath = 'uploads/research';
    } else if (file.mimetype.startsWith('application/')) {
      uploadPath = 'uploads/documents';
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    const sanitizedBasename = basename.replace(/[^a-zA-Z0-9]/g, '_');
    
    cb(null, sanitizedBasename + '_' + uniqueSuffix + extension);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedDocumentTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx/;
  
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;
  
  // Check if it's an image
  if (mimeType.startsWith('image/')) {
    if (allowedImageTypes.test(fileExtension) && allowedImageTypes.test(mimeType)) {
      return cb(null, true);
    }
  }
  
  // Check if it's a document
  if (mimeType.startsWith('application/')) {
    if (allowedDocumentTypes.test(fileExtension)) {
      return cb(null, true);
    }
  }
  
  cb(new Error('Invalid file type. Only images (JPEG, JPG, PNG, GIF, WebP) and documents (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX) are allowed.'));
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 10 // Maximum 10 files per request
  }
});

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.'
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name for file upload.'
      });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next(err);
};

// Delete file helper function
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  upload,
  handleMulterError,
  deleteFile
};