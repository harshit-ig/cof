const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Research title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Research description is required']
  },
  type: {
    type: String,
    enum: ['project', 'publication', 'collaboration', 'facility'],
    required: [true, 'Research type is required']
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'proposed'],
    default: 'ongoing'
  },
  principalInvestigator: {
    type: String,
    required: [true, 'Principal Investigator is required']
  },
  coInvestigators: [String],
  fundingAgency: {
    type: String
  },
  budget: {
    type: Number
  },
  duration: {
    startDate: Date,
    endDate: Date
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  objectives: [String],
  methodology: {
    type: String
  },
  expectedOutcomes: [String],
  publications: [{
    title: String,
    journal: String,
    year: Number,
    authors: [String],
    doi: String,
    url: String
  }],
  images: [{
    url: String,
    caption: String
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  tags: [String],
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
researchSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Research', researchSchema);




