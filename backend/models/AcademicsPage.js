const mongoose = require('mongoose');

const academicsPageSchema = new mongoose.Schema({
  departments: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      enum: ['building', 'fish', 'gear', 'leaf', 'shield'],
      default: 'building'
    }
  }],
  calendar: {
    events: [{
      event: {
        type: String,
        required: true,
        trim: true
      },
      date: {
        type: String,
        required: true,
        trim: true
      }
    }]
  },
  regulations: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  faculty: {
    title: {
      type: String,
      required: true,
      default: 'Expert Faculty Members'
    },
    description: {
      type: String,
      required: true,
      default: 'Highly qualified and experienced faculty members specializing in various fields of fishery science.'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Ensure only one active academics page configuration exists
academicsPageSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

module.exports = mongoose.model('AcademicsPage', academicsPageSchema);