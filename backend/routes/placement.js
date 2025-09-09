const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const router = express.Router()

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Placement route is working!', timestamp: new Date().toISOString() })
})

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/resumes')
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

// Email templates
const createEmailTemplate = (type, formData) => {
  const commonHeader = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 28px;">College of Fishery, Jabalpur</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">New ${type} Application Received</p>
      </div>
      <div style="padding: 30px; background: white;">
  `

  const commonFooter = `
      </div>
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666;">
        <p style="margin: 0;">This is an automated email from the College of Fishery placement portal.</p>
        <p style="margin: 5px 0 0 0;">Please do not reply to this email.</p>
      </div>
    </div>
  `

  let content = ''
  let subject = ''

  switch (type) {
    case 'join-us':
      subject = `New Job Application - ${formData.name} - ${formData.position}`
      content = `
        <h2 style="color: #3B82F6; margin-bottom: 20px;">Job Application Details</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
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
              <td style="padding: 8px 0; font-weight: bold;">Position:</td>
              <td style="padding: 8px 0;">${formData.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Experience:</td>
              <td style="padding: 8px 0;">${formData.experience || 'Not specified'}</td>
            </tr>
          </table>
        </div>
        ${formData.message ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Cover Letter:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.message}</div>
          </div>
        ` : ''}
      `
      break

    case 'careers':
      subject = `New Career Application - ${formData.name} - ${formData.department}`
      content = `
        <h2 style="color: #10B981; margin-bottom: 20px;">Career Application Details</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
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
              <td style="padding: 8px 0; font-weight: bold;">Current Position:</td>
              <td style="padding: 8px 0;">${formData.currentPosition || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Preferred Dept:</td>
              <td style="padding: 8px 0;">${formData.department}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Experience:</td>
              <td style="padding: 8px 0;">${formData.yearsExperience}</td>
            </tr>
          </table>
        </div>
        ${formData.message ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Career Goals & Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.message}</div>
          </div>
        ` : ''}
      `
      break

    case 'internship':
      subject = `New Internship Application - ${formData.name} - ${formData.course}`
      content = `
        <h2 style="color: #8B5CF6; margin-bottom: 20px;">Internship Application Details</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
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
              <td style="padding: 8px 0; font-weight: bold;">College:</td>
              <td style="padding: 8px 0;">${formData.college}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Course:</td>
              <td style="padding: 8px 0;">${formData.course}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Current Year:</td>
              <td style="padding: 8px 0;">${formData.year}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Duration:</td>
              <td style="padding: 8px 0;">${formData.duration}</td>
            </tr>
          </table>
        </div>
        ${formData.message ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${formData.message}</div>
          </div>
        ` : ''}
      `
      break
  }

  return {
    subject,
    html: commonHeader + content + commonFooter
  }
}

// POST route for form submission
router.post('/submit', upload.single('resume'), async (req, res) => {
  try {
    console.log('Received placement submission:', {
      type: req.body.type,
      hasFile: !!req.file,
      body: req.body
    })

    const { type } = req.body

    if (!type) {
      return res.status(400).json({ message: 'Application type is required' })
    }

    // Validate required fields based on type
    let requiredFields = ['name', 'email', 'phone']
    
    switch (type) {
      case 'join-us':
        requiredFields.push('position')
        break
      case 'careers':
        requiredFields.push('department', 'yearsExperience')
        break
      case 'internship':
        requiredFields.push('college', 'course', 'year', 'duration')
        break
      default:
        return res.status(400).json({ message: 'Invalid application type' })
    }

    // Check for missing required fields
    const missingFields = requiredFields.filter(field => !req.body[field])
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      })
    }

    // Check for resume file
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' })
    }

    // Create email template
    console.log('Creating email template for type:', type)
    const emailTemplate = createEmailTemplate(type, req.body)
    
    // Create transporter
    console.log('Creating email transporter...')
    const transporter = createTransporter()

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.HR_EMAIL || 'hr@fisherycollege.edu',
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      attachments: [
        {
          filename: `Resume_${req.body.name.replace(/\s+/g, '_')}_${Date.now()}${path.extname(req.file.originalname)}`,
          path: req.file.path
        }
      ]
    }

    console.log('Sending email to:', mailOptions.to)
    // Send email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')

    // Optionally, you can also save the application to a database here
    // For now, we'll just send the email

    // Clean up uploaded file (optional - you might want to keep it)
    // fs.unlinkSync(req.file.path)

    res.status(200).json({
      message: 'Application submitted successfully! We will get back to you soon.',
      applicationId: `APP-${Date.now()}`
    })

  } catch (error) {
    console.error('Error processing placement application:', error)
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
      message: 'Failed to submit application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// GET route to fetch placement statistics (optional)
router.get('/stats', async (req, res) => {
  try {
    // This would typically come from a database
    // For now, returning static data
    const stats = {
      totalApplications: 156,
      monthlyApplications: 23,
      placementRate: 95,
      partnerOrganizations: 52,
      studentsPlaced: 201,
      averageSalary: '4.5 LPA',
      topRecruiters: [
        'ICAR Research Institutes',
        'State Fishery Departments',
        'Private Aquaculture Companies',
        'Feed Manufacturing Companies',
        'Processing Units'
      ]
    }

    res.json(stats)
  } catch (error) {
    console.error('Error fetching placement stats:', error)
    res.status(500).json({ message: 'Failed to fetch statistics' })
  }
})

module.exports = router
