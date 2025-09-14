const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true
  },
  logo: {
    type: String,
    required: [true, 'Partner logo is required']
  },
  altText: {
    type: String,
    required: [true, 'Alt text is required'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Partner link is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['government', 'research', 'industry', 'academic', 'other'],
    default: 'other'
  }
}, {
  timestamps: true
});

// Index for faster queries
partnerSchema.index({ isActive: 1, order: 1 });
partnerSchema.index({ category: 1 });

module.exports = mongoose.model('Partner', partnerSchema);
