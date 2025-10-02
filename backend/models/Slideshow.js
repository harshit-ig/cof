const mongoose = require('mongoose');

const slideshowSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image is required']
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





