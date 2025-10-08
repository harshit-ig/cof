const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Settings model is now only for user management (admin password changes)
// All other site settings are now hardcoded in the frontend
const settingsSchema = new mongoose.Schema({
  // This model is now reserved for future user management features
  // Currently empty as admin password changes are handled in the Admin model
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);





