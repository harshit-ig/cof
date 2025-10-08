const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Contact Information
  contactInfo: {
    phone: {
      main: { type: String, default: '+91-761-2681971' },
      office: { type: String, default: '+91-761-2681971' },
      fax: { type: String, default: '+91-761-2681970' }
    },
    email: {
      main: { type: String, default: 'info.cof@ndvsu.ac.in' },
      registrar: { type: String, default: 'registrar@ndvsu.ac.in' },
      info: { type: String, default: 'info.cof@ndvsu.ac.in' }
    },
    address: {
      institution: { type: String, default: 'College of Fishery' },
      university: { type: String, default: 'Nanaji Deshmukh Veterinary Science University' },
      street: { type: String, default: 'Adhartal' },
      city: { type: String, default: 'Jabalpur' },
      state: { type: String, default: 'Madhya Pradesh' },
      pincode: { type: String, default: '482004' },
      country: { type: String, default: 'India' }
    },
    officeHours: {
      weekdays: { type: String, default: 'Monday - Friday: 9:00 AM - 5:00 PM' },
      saturday: { type: String, default: 'Saturday: 9:00 AM - 1:00 PM' },
      sunday: { type: String, default: 'Sunday: Closed' }
    }
  },

  // Map Configuration
  mapConfig: {
    title: { type: String, default: 'College of Fishery Location' },
    description: { type: String, default: 'Find Us Here' },
    latitude: { type: Number, default: 23.1815 },
    longitude: { type: Number, default: 79.9864 },
    zoom: { type: Number, default: 15 }
  },

  // Directions
  directions: {
    byRoad: { type: String, default: 'NH 34 from Bhopal (300 km), NH 7 from Nagpur (250 km)' },
    byAir: { type: String, default: 'Nearest airport: Jabalpur Airport (15 km)' },
    byTrain: { type: String, default: 'Jabalpur Railway Station (12 km from campus)' }
  },

  // Additional Contact Information
  departments: [{
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    head: { type: String },
    description: { type: String }
  }],

  // Emergency Contacts
  emergencyContacts: [{
    title: { type: String, required: true },
    name: { type: String },
    phone: { type: String },
    description: { type: String }
  }],

  // Social Media Links
  socialMedia: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  }
}, {
  timestamps: true
});

// Ensure only one contact document exists
contactSchema.statics.getSingleton = async function() {
  let contact = await this.findOne({});
  if (!contact) {
    contact = await this.create({});
  }
  return contact;
};

contactSchema.statics.updateSingleton = async function(updates) {
  let contact = await this.findOne({});
  if (!contact) {
    contact = await this.create(updates);
  } else {
    Object.assign(contact, updates);
    await contact.save();
  }
  return contact;
};

module.exports = mongoose.model('Contact', contactSchema);