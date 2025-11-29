const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['uploads/images', 'uploads/documents', 'uploads/faculty', 'uploads/news', 'uploads/research', 'uploads/dean', 'uploads/gallery', 'uploads/partners', 'uploads/incubation'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/images'; // default
    
    // Determine upload path based on URL, headers, or body
    const url = req.originalUrl || req.url;
    const referer = req.headers.referer || req.headers.referrer || '';
    const category = req.body?.category;
    const categoryHeader = req.headers['x-upload-category'];
    const finalCategory = category || categoryHeader;
    
    console.log('Upload category:', category);
    console.log('Category header:', categoryHeader);
    console.log('Request URL:', url);
    console.log('Referer:', referer);
    console.log('Final category:', finalCategory);
    
    // Check URL path first for most specific matching
    if (url.includes('/partners') || finalCategory === 'partners') {
      uploadPath = 'uploads/partners';
    } else if (url.includes('/incubation') || finalCategory === 'incubation') {
      uploadPath = 'uploads/incubation';
    } else if (url.includes('/news/upload')) {
      uploadPath = 'uploads/news';
    } else if (url.includes('/gallery') || finalCategory === 'gallery') {
      uploadPath = 'uploads/gallery';
    } else if (url.includes('/faculty/upload') || finalCategory === 'faculty') {
      uploadPath = 'uploads/faculty';
    } else if (url.includes('/research/upload') || finalCategory === 'research') {
      uploadPath = 'uploads/research';
    } else if (finalCategory === 'dean') {
      uploadPath = 'uploads/dean';
    } else if (finalCategory === 'news') {
      uploadPath = 'uploads/news';
    } else if (referer && referer.includes('/admin/partners')) {
      // If the upload is coming from the partners admin page, assume it's for partners
      uploadPath = 'uploads/partners';
      console.log('Detected partners upload from referer');
    } else if (referer && referer.includes('/admin/news')) {
      // If the upload is coming from the news admin page, assume it's for news
      uploadPath = 'uploads/news';
      console.log('Detected news upload from referer');
    } else if (referer && referer.includes('/admin/gallery')) {
      // If the upload is coming from the gallery admin page, assume it's for gallery
      uploadPath = 'uploads/gallery';
      console.log('Detected gallery upload from referer');
    } else if (file.mimetype.startsWith('application/')) {
      uploadPath = 'uploads/documents';
    }
    
    console.log('Final upload path:', uploadPath);
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
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024, // 50MB default
    files: 10 // Maximum 10 files per request
  }
});

// Error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      const maxSizeMB = Math.round((parseInt(process.env.MAX_FILE_SIZE) || 50 * 1024 * 1024) / (1024 * 1024));
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${maxSizeMB}MB.`
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




