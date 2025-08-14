const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'Content key is required'],
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  type: {
    type: String,
    enum: ['text', 'html', 'markdown', 'json'],
    default: 'text'
  },
  section: {
    type: String,
    required: [true, 'Section is required']
  },
  subsection: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for search functionality
contentSchema.index({ key: 1 });
contentSchema.index({ section: 1, subsection: 1, order: 1 });

module.exports = mongoose.model('Content', contentSchema);