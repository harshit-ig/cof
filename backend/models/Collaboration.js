const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  // Section type: 'mou', 'partnership', or 'impact'
  section: {
    type: String,
    enum: ['mou', 'partnership', 'impact'],
    required: [true, 'Section type is required']
  },
  
  // Common fields
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  
  // For MoU section
  organization: String,
  type: String, // Government Agency, Research Council, etc.
  category: String, // Marketing & Distribution, Research & Education, etc.
  signedDate: String,
  duration: String,
  objectives: [String],
  activities: [String],
  outcomes: String,
  contactPerson: String,
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Terminated', 'Renewed'],
    default: 'Active'
  },
  
  // For Partnership section
  partnerType: String, // Government Departments, Research Institutes, etc.
  partners: [{
    name: String,
    description: String
  }],
  
  // For Impact section
  impactType: String, // financial, training, research, infrastructure, student
  icon: String, // Icon name for display
  value: String, // The numeric/text value
  label: String, // The description label
  color: String, // Color theme for the card
  
  // Common fields
  sortOrder: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for search functionality
collaborationSchema.index({ title: 'text', organization: 'text', description: 'text' });

module.exports = mongoose.model('Collaboration', collaborationSchema);




