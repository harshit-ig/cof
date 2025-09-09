const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/incubation')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only PDF and Word documents
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only PDF and Word documents are allowed'), false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
})

// Configure nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS  // Your app password
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

// Email template for incubation registration
const createEmailTemplate = (formData) => {
  const programTypeMap = {
    'startup-incubation': 'Startup Incubation',
    'innovation-program': 'Innovation Program',
    'entrepreneurship-training': 'Entrepreneurship Training',
    'technology-transfer': 'Technology Transfer'
  }

  const experienceMap = {
    'beginner': 'Beginner (0-2 years)',
    'intermediate': 'Intermediate (2-5 years)',
    'experienced': 'Experienced (5+ years)'
  }

  const fundingMap = {
    'under-1l': 'Under ₹1 Lakh',
    '1l-5l': '₹1-5 Lakhs',
    '5l-10l': '₹5-10 Lakhs',
    '10l-25l': '₹10-25 Lakhs',
    '25l-50l': '₹25-50 Lakhs',
    '50l-1cr': '₹50 Lakhs - 1 Crore',
    'above-1cr': 'Above ₹1 Crore'
  }

  const subject = `New Incubation Program Registration - ${formData.name} - ${programTypeMap[formData.programType] || formData.programType}`
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px;">College of Fishery, Jabalpur</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">New Incubation Program Registration</p>
      </div>
      <div style="padding: 30px; background: white;">
        <h2 style="color: #3B82F6; margin-bottom: 20px;">Registration Details</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 180px;">Name:</td>
              <td style="padding: 8px 0;">${formData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">${formData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${formData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Organization:</td>
              <td style="padding: 8px 0;">${formData.organization || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Position:</td>
              <td style="padding: 8px 0;">${formData.position || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Program Type:</td>
              <td style="padding: 8px 0;">${programTypeMap[formData.programType] || formData.programType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Experience Level:</td>
              <td style="padding: 8px 0;">${experienceMap[formData.experience] || formData.experience || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Funding Requirements:</td>
              <td style="padding: 8px 0;">${fundingMap[formData.funding] || formData.funding || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; margin-bottom: 10px;">Business Idea/Innovation:</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.businessIdea}</div>
        </div>

        ${formData.expectations ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Expectations from Program:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.expectations}</div>
          </div>
        ` : ''}

        <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6;">
          <p style="margin: 0; color: #1e40af;">
            <strong>Next Steps:</strong> The incubation team will review this application and contact the applicant within 5-7 business days.
          </p>
        </div>
      </div>
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666;">
        <p style="margin: 0;">This is an automated email from the College of Fishery incubation center.</p>
        <p style="margin: 5px 0 0 0;">Please do not reply to this email.</p>
      </div>
    </div>
  `

  return { subject, html }
}

// POST route for incubation registration
router.post('/register', upload.single('attachment'), async (req, res) => {
  try {
    console.log('Received incubation registration:', {
      hasFile: !!req.file,
      body: req.body
    })

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'programType', 'businessIdea']
    const missingFields = requiredFields.filter(field => !req.body[field])
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      })
    }

    // Create email template
    console.log('Creating email template for incubation registration')
    const emailTemplate = createEmailTemplate(req.body)
    
    // Create transporter
    console.log('Creating email transporter...')
    const transporter = createTransporter()

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.HR_EMAIL || 'incubation@fisherycollege.edu',
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      attachments: req.file ? [
        {
          filename: `BusinessPlan_${req.body.name.replace(/\s+/g, '_')}_${Date.now()}${path.extname(req.file.originalname)}`,
          path: req.file.path
        }
      ] : []
    }

    console.log('Sending incubation registration email to:', mailOptions.to)
    // Send email
    await transporter.sendMail(mailOptions)
    console.log('Incubation registration email sent successfully')

    // Optionally, you can also save the registration to a database here

    res.status(200).json({
      message: 'Registration submitted successfully! We will contact you within 5-7 business days.',
      registrationId: `INC-${Date.now()}`
    })

  } catch (error) {
    console.error('Error processing incubation registration:', error)
    console.error('Stack trace:', error.stack)
    
    // Clean up uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    if (error.message === 'Only PDF and Word documents are allowed') {
      return res.status(400).json({ message: error.message })
    }

    // Check for specific email errors
    if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
      console.error('Email authentication or connection error:', error.message)
      return res.status(500).json({ 
        message: 'Email service unavailable. Please try again later or contact support directly.' 
      })
    }

    res.status(500).json({ 
      message: 'Failed to submit registration. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// GET route to fetch incubation statistics (optional)
router.get('/stats', async (req, res) => {
  try {
    // This would typically come from a database
    // For now, returning static data
    const stats = {
      totalRegistrations: 89,
      activePrograms: 12,
      successfulStartups: 23,
      fundingProvided: '₹2.8 Crores',
      mentorsNetwork: 45,
      industryPartners: 28,
      averageIncubationPeriod: '18 months',
      programTypes: [
        { name: 'Startup Incubation', count: 35 },
        { name: 'Innovation Program', count: 28 },
        { name: 'Entrepreneurship Training', count: 18 },
        { name: 'Technology Transfer', count: 8 }
      ]
    }

    res.json(stats)
  } catch (error) {
    console.error('Error fetching incubation stats:', error)
    res.status(500).json({ message: 'Failed to fetch statistics' })
  }
})

module.exports = router
