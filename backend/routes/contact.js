const express = require('express');
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @desc    Get contact information
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    console.log('GET /api/contact - Fetching contact data')
    const contact = await Contact.getSingleton();
    console.log('Contact data fetched:', contact)
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching contact data'
    });
  }
});

// @desc    Get public contact information
// @route   GET /api/contact/public
// @access  Public
router.get('/public', async (req, res) => {
  try {
    console.log('GET /api/contact/public - Fetching public contact data')
    const contact = await Contact.getSingleton();
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get public contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching contact data'
    });
  }
});

// @desc    Update contact information
// @route   PUT /api/contact
// @access  Private/Admin
router.put('/', protect, adminOnly, async (req, res) => {
  try {
    console.log('PUT /api/contact - Updating contact data:', req.body)
    const updatedContact = await Contact.updateSingleton(req.body);
    console.log('Contact data updated:', updatedContact)
    
    res.json({
      success: true,
      data: updatedContact,
      message: 'Contact information updated successfully'
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating contact information'
    });
  }
});

// @desc    Add department contact
// @route   POST /api/contact/department
// @access  Private/Admin
router.post('/department', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    contact.departments.push(req.body);
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Department contact added successfully'
    });
  } catch (error) {
    console.error('Add department error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error adding department contact'
    });
  }
});

// @desc    Update department contact
// @route   PUT /api/contact/department/:id
// @access  Private/Admin
router.put('/department/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    const department = contact.departments.id(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    Object.assign(department, req.body);
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Department contact updated successfully'
    });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating department contact'
    });
  }
});

// @desc    Delete department contact
// @route   DELETE /api/contact/department/:id
// @access  Private/Admin
router.delete('/department/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    contact.departments.id(req.params.id).remove();
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Department contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete department error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error deleting department contact'
    });
  }
});

// @desc    Add emergency contact
// @route   POST /api/contact/emergency
// @access  Private/Admin
router.post('/emergency', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    contact.emergencyContacts.push(req.body);
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Emergency contact added successfully'
    });
  } catch (error) {
    console.error('Add emergency contact error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error adding emergency contact'
    });
  }
});

// @desc    Update emergency contact
// @route   PUT /api/contact/emergency/:id
// @access  Private/Admin
router.put('/emergency/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    const emergencyContact = contact.emergencyContacts.id(req.params.id);
    
    if (!emergencyContact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found'
      });
    }
    
    Object.assign(emergencyContact, req.body);
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Emergency contact updated successfully'
    });
  } catch (error) {
    console.error('Update emergency contact error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating emergency contact'
    });
  }
});

// @desc    Delete emergency contact
// @route   DELETE /api/contact/emergency/:id
// @access  Private/Admin
router.delete('/emergency/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.getSingleton();
    contact.emergencyContacts.id(req.params.id).remove();
    await contact.save();
    
    res.json({
      success: true,
      data: contact,
      message: 'Emergency contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete emergency contact error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Error deleting emergency contact'
    });
  }
});

module.exports = router;