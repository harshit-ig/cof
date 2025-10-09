const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Faculty name is required'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Designation is required']
  },
  customDesignation: {
    type: String,
    trim: true
  },
  staffType: {
    type: String,
    enum: ['Teaching Staff', 'Non-Teaching Staff'],
    default: 'Teaching Staff',
    required: [true, 'Staff type is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required']
  },
  specialization: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required']
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  image: {
    type: String,
    default: ''
  },
  researchInterests: [String],
  publications: [{
    title: String,
    journal: String,
    year: Number,
    url: String
  }],
  awards: [{
    title: String,
    year: Number,
    organization: String
  }],
  socialLinks: {
    linkedin: String,
    researchgate: String,
    googleScholar: String,
    orcid: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for search functionality
facultySchema.index({ name: 'text', department: 'text', specialization: 'text' });

module.exports = mongoose.model('Faculty', facultySchema);




