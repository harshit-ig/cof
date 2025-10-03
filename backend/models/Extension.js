const mongoose = require('mongoose');

const extensionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  section: {
    type: String,
    required: true,
    enum: ['farmer-training', 'ffpo-shg', 'demonstrations', 'success-stories']
  },
  description: {
    type: String,
    required: true
  },
  
  // Common fields
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  
  // Farmer Training Program specific fields
  duration: String,
  frequency: String,
  participants: String,
  modules: [String],
  
  // FFPO/SHG specific fields
  type: String, // 'FFPO Support', 'SHG Support', 'Cooperative Support'
  activities: [String],
  beneficiaries: String,
  impact: String,
  
  // Demonstration specific fields
  location: String,
  area: String,
  features: [String],
  results: String,
  
  // Success Story specific fields
  name: String, // Person/Organization name
  program: String, // Program they participated in
  achievement: String,
  story: String,
  impactPoints: [String], // Impact achieved array
  year: String,
  
  // File attachment
  filename: String,
  originalName: String,
  
  // SEO and metadata
  tags: [String],
  metaDescription: String,
  
  // Tracking
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
extensionSchema.index({ section: 1, order: 1 });
extensionSchema.index({ isPublished: 1 });
extensionSchema.index({ section: 1, isPublished: 1 });

module.exports = mongoose.model('Extension', extensionSchema);