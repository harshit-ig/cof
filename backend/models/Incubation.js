const mongoose = require('mongoose');

const incubationSchema = new mongoose.Schema({
  // Common fields
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['activity', 'governing-body', 'management-committee']
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },

  // Activity-specific fields
  icon: {
    type: String // Icon name for activities
  },
  color: {
    type: String // Color scheme for activities
  },
  subtitle: {
    type: String // Subtitle for activities
  },

  // Person-specific fields (for governing body and management committee)
  name: {
    type: String // Full name of the person
  },
  position: {
    type: String // Their position/role
  },
  designation: {
    type: String // Their designation (Chairperson, Member, etc.)
  },
  organization: {
    type: String // Their organization
  },
  location: {
    type: String // Location (e.g., Jabalpur)
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  bio: {
    type: String // Short biography
  },
  expertise: [String], // Areas of expertise
  image: {
    type: String // Profile image filename
  },

  // File upload support
  filename: {
    type: String
  },
  originalName: {
    type: String
  },

  // Metadata
  tags: [String],
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

// Index for better performance
incubationSchema.index({ category: 1, order: 1, createdAt: -1 });
incubationSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Incubation', incubationSchema);