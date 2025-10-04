const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  // Section type: 'testimonial', 'event', 'contact', 'stats'
  section: {
    type: String,
    enum: ['testimonial', 'event', 'contact', 'stats'],
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
  
  // For Testimonials section
  name: String,
  batch: String,
  position: String,
  company: String,
  image: String,
  testimonial: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  
  // For Events section
  date: String,
  time: String,
  venue: String,
  registrationOpen: {
    type: Boolean,
    default: false
  },
  eventType: String, // 'upcoming', 'past'
  
  // For Contact section
  contactType: String, // 'email', 'phone', 'address'
  email: String,
  phone: String,
  address: String,
  
  // For Stats section
  icon: String,
  value: String,
  label: String,
  color: String,
  order: {
    type: Number,
    default: 0
  },
  
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
alumniSchema.index({ title: 'text', name: 'text', description: 'text' });

module.exports = mongoose.model('Alumni', alumniSchema);
