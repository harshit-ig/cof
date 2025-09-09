const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['events', 'campus', 'academics', 'research', 'infrastructure', 'activities', 'facilities'],
    default: 'campus'
  },
  imageUrl: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ date: -1 });
gallerySchema.index({ order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);





