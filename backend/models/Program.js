const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Program title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Program slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  shortName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Program description is required']
  },
  overview: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    required: [true, 'Program duration is required']
  },
  eligibility: {
    qualification: String,
    subjects: String,
    percentage: String,
    entrance: String,
    additional: String
  },
  curriculum: [{
    semester: String,
    subjects: [String]
  }],
  detailedCurriculum: {
    semester1: [String],
    semester2: [String],
    semester3: [String],
    semester4: [String],
    semester5: [String],
    semester6: [String],
    semester7: [String],
    semester8: [String]
  },
  fees: {
    tuition: String,
    hostel: String,
    mess: String,
    other: String,
    total: String,
    annual: {
      type: Number,
      required: [true, 'Annual fee is required']
    }
  },
  intake: {
    type: Number,
    required: [true, 'Program intake is required']
  },
  highlights: [String],
  careerOpportunities: [String],
  facilities: [String],
  admissionProcess: {
    process: String,
    application: String,
    documents: [String],
    importantDates: [{
      event: String,
      date: String
    }]
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




