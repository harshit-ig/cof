const mongoose = require('mongoose');

const infrastructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Infrastructure name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['laboratory', 'hatchery', 'library', 'hostel', 'processing_unit', 'classroom', 'auditorium', 'other'],
    required: [true, 'Infrastructure type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  capacity: {
    type: String
  },
  area: {
    type: String
  },
  location: {
    type: String
  },
  facilities: [String],
  equipment: [{
    name: String,
    quantity: Number,
    specifications: String
  }],
  images: [{
    url: String,
    caption: String
  }],
  yearEstablished: {
    type: Number
  },
  incharge: {
    type: String
  },
  contactInfo: {
    phone: String,
    email: String
  },
  operatingHours: {
    type: String
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
infrastructureSchema.index({ name: 'text', description: 'text', type: 'text' });

module.exports = mongoose.model('Infrastructure', infrastructureSchema);




