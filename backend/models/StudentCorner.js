const mongoose = require('mongoose')

const studentCornerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['admission', 'scholarships', 'clubs']
  },
  
  // Common fields
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Admission Guidelines specific fields
  category: {
    type: String,
    trim: true
  },
  guidelines: [{
    type: String,
    trim: true
  }],
  
  // Scholarships specific fields
  eligibility: {
    type: String,
    trim: true
  },
  amount: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  
  // Clubs specific fields
  role: {
    type: String,
    trim: true
  },
  activities: [{
    type: String,
    trim: true
  }],
  positions: [{
    type: String,
    trim: true
  }],
  
  // Multiple PDF documents attached to the item
  documents: [{
    filename: {
      type: String,
      required: true,
      trim: true
    },
    originalName: {
      type: String,
      required: true,
      trim: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      trim: true
    }
  }],
  
  // Legacy single PDF support (for backward compatibility)
  filename: {
    type: String,
    trim: true
  },
  originalName: {
    type: String,
    trim: true
  },
  
  // Common metadata
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt field before saving
studentCornerSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Create indexes for better query performance
studentCornerSchema.index({ type: 1 })
studentCornerSchema.index({ isActive: 1 })
studentCornerSchema.index({ sortOrder: 1 })
studentCornerSchema.index({ createdAt: -1 })

module.exports = mongoose.model('StudentCorner', studentCornerSchema)