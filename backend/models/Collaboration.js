const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Collaboration title is required'],
    trim: true
  },
  partner: {
    name: {
      type: String,
      required: [true, 'Partner name is required']
    },
    type: {
      type: String,
      enum: ['university', 'research_institute', 'government', 'industry', 'ngo', 'international'],
      required: [true, 'Partner type is required']
    },
    country: {
      type: String,
      required: [true, 'Partner country is required']
    },
    website: String,
    logo: String
  },
  type: {
    type: String,
    enum: ['mou', 'joint_research', 'student_exchange', 'faculty_exchange', 'training', 'consultancy'],
    required: [true, 'Collaboration type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  objectives: [String],
  activities: [String],
  duration: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'terminated', 'renewed'],
    default: 'active'
  },
  coordinator: {
    type: String,
    required: [true, 'Coordinator is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  outcomes: [String],
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
collaborationSchema.index({ title: 'text', 'partner.name': 'text', description: 'text' });

module.exports = mongoose.model('Collaboration', collaborationSchema);