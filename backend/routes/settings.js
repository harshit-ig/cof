const express = require('express');
const Settings = require('../models/Settings');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get settings
// @route   GET /api/settings
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const settings = await Settings.getSingleton();
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching settings'
    });
  }
});

// @desc    Get public settings (for frontend)
// @route   GET /api/settings/public
// @access  Public
router.get('/public', async (req, res) => {
  try {
    const settings = await Settings.getSingleton();
    
    // Only return public settings
    const publicSettings = {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      established: settings.established,
      affiliatedUniversity: settings.affiliatedUniversity,
      principalName: settings.principalName,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      socialMedia: settings.socialMedia,
      admissionOpen: settings.admissionOpen,
      maintenanceMode: settings.maintenanceMode,
      seoKeywords: settings.seoKeywords,
      primaryColor: settings.primaryColor,
      footerText: settings.footerText
    };
    
    res.json({
      success: true,
      data: publicSettings
    });
  } catch (error) {
    console.error('Get public settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching public settings'
    });
  }
});

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    const updatedSettings = await Settings.updateSingleton(req.body);
    
    res.json({
      success: true,
      data: updatedSettings,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating settings'
    });
  }
});

module.exports = router;





