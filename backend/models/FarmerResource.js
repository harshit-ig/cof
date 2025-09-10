const mongoose = require('mongoose');

const farmerResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['advisory', 'training', 'techniques', 'research', 'government-schemes', 'other'],
    default: 'other'
  },
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
  }
}, {
  timestamps: true
});

// Index for better query performance
farmerResourceSchema.index({ isActive: 1, createdAt: -1 });
farmerResourceSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('FarmerResource', farmerResourceSchema);
