const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  type: {
    type: String,
    enum: ['news', 'event', 'announcement', 'seminar', 'workshop', 'visit'],
    required: [true, 'Type is required']
  },
  category: {
    type: String,
    enum: ['academic', 'research', 'extension', 'general', 'placement'],
    required: [true, 'Category is required']
  },
  eventDate: {
    type: Date
  },
  venue: {
    type: String
  },
  organizer: {
    type: String
  },
  images: [{
    url: String,
    caption: String
  }],
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for search and sorting
newsEventSchema.index({ title: 'text', content: 'text', tags: 'text' });
newsEventSchema.index({ createdAt: -1 });
newsEventSchema.index({ eventDate: -1 });

module.exports = mongoose.model('NewsEvent', newsEventSchema);




