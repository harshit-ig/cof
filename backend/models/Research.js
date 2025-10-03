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
  section: {
    type: String,
    enum: ['ongoing-projects', 'publications', 'student-research', 'collaborations', 'facilities'],
    required: [true, 'Research section is required']
  },
  // For ongoing projects - specify the funding agency type
  projectType: {
    type: String,
    enum: ['ICAR', 'NFDB', 'PMMSY', 'DBT', 'UGC', 'DST', 'CSIR', 'Other'],
    required: function() { return this.section === 'ongoing-projects'; }
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
    required: [true, 'Department is required'],
    default: 'College of Fishery'
  },
  objectives: [String],
  methodology: {
    type: String
  },
  keyFindings: [String],
  // For publications
  publicationDetails: {
    journal: String,
    volume: String,
    issue: String,
    pages: String,
    year: Number,
    doi: String,
    impactFactor: Number,
    authors: [String]
  },
  // For student research
  studentDetails: {
    studentName: String,
    degree: {
      type: String,
      enum: ['B.F.Sc', 'M.F.Sc', 'Ph.D']
    },
    supervisor: String,
    completionYear: Number
  },
  // For collaborations
  collaborationDetails: {
    partnerInstitution: String,
    partnerCountry: String,
    collaborationType: {
      type: String,
      enum: ['Research', 'Academic Exchange', 'Technology Transfer', 'Joint Degree']
    },
    mou: Boolean
  },
  // For facilities
  facilityDetails: {
    type: {
      type: String,
      enum: ['Laboratory', 'Equipment', 'Infrastructure', 'Software', 'Database']
    },
    capacity: String,
    specifications: String,
    utilizationAreas: [String]
  },
  images: [{
    url: String,
    caption: String
  }],
  filename: {
    type: String
  },
  originalName: {
    type: String
  },
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
  order: {
    type: Number,
    default: 0
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
researchSchema.index({ section: 1, projectType: 1, order: 1 });

module.exports = mongoose.model('Research', researchSchema);




