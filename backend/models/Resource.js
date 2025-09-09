const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Resource title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Resource description is required'],
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Resource category is required'],
    enum: [
      'Application Forms',
      'Guidelines & Manuals', 
      'MoU Templates',
      'Brochures & Promotional',
      'Government Schemes',
      'Training Materials',
      'Research Papers',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    enum: [
      'Fisheries',
      'Aquaculture',
      'Sustainable Practices',
      'Finance',
      'Marketing',
      'Technology',
      'Other'
    ]
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },
  fileType: {
    type: String,
    required: [true, 'File type is required'],
    enum: ['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX', 'TXT', 'ZIP', 'Other']
  },
  fileSize: {
    type: String,
    required: [true, 'File size is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
resourceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better search performance
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });
resourceSchema.index({ category: 1, isActive: 1 });
resourceSchema.index({ createdAt: -1 });

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
