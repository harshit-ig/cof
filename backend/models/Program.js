const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Program description is required']
  },
  duration: {
    type: String,
    required: [true, 'Program duration is required']
  },
  eligibility: {
    type: String,
    required: [true, 'Eligibility criteria is required']
  },
  curriculum: [{
    semester: String,
    subjects: [String]
  }],
  fees: {
    type: Number,
    required: [true, 'Program fees is required']
  },
  intake: {
    type: Number,
    required: [true, 'Program intake is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  level: {
    type: String,
    enum: ['undergraduate', 'postgraduate', 'diploma', 'certificate'],
    required: [true, 'Program level is required']
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
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
programSchema.index({ title: 'text', description: 'text', department: 'text' });

module.exports = mongoose.model('Program', programSchema);