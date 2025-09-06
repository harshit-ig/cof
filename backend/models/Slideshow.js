const mongoose = require('mongoose');

const slideshowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Subtitle is required'],
    trim: true,
    maxlength: [150, 'Subtitle cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  cta: {
    type: String,
    required: [true, 'Call to action text is required'],
    trim: true,
    maxlength: [50, 'CTA cannot exceed 50 characters']
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
    trim: true
  },
  order: {
    type: Number,
    required: true,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for ordering slides
slideshowSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('Slideshow', slideshowSchema);
