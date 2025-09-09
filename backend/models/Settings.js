const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // General Settings
  siteName: {
    type: String,
    default: 'College of Fishery, Jabalpur'
  },
  siteDescription: {
    type: String,
    default: 'Excellence in Fishery Education & Research'
  },
  established: {
    type: String,
    default: '2018'
  },
  affiliatedUniversity: {
    type: String,
    default: 'JNKVV, Jabalpur'
  },
  principalName: {
    type: String,
    default: 'Dr. Principal Name'
  },
  
  // Contact Information
  contactEmail: {
    type: String,
    default: 'info@fisherycollege.edu'
  },
  contactPhone: {
    type: String,
    default: '+91-761-2345678'
  },
  address: {
    type: String,
    default: 'College of Fishery, Jabalpur, Madhya Pradesh'
  },
  
  // Social Media
  socialMedia: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  
  // System Settings
  admissionOpen: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  
  // SEO Settings
  seoKeywords: {
    type: [String],
    default: ['fisheries', 'education', 'research', 'college', 'jabalpur']
  },
  
  // Theme Settings
  primaryColor: {
    type: String,
    default: '#3B82F6'
  },
  
  // Footer Settings
  footerText: {
    type: String,
    default: 'College of Fishery, Jabalpur - Excellence in Fishery Education & Research'
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSingleton = async function() {
  let settings = await this.findOne({});
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

settingsSchema.statics.updateSingleton = async function(updates) {
  let settings = await this.findOne({});
  if (!settings) {
    settings = await this.create(updates);
  } else {
    Object.assign(settings, updates);
    await settings.save();
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);





