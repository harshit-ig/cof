const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Configure multer for file upload
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

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only PDF and DOC/DOCX files are allowed'))
    }
  }
})

// Email configuration
const createTransporter = () => {
  // Use environment variables for email configuration
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

// @route   POST /api/application/submit
// @desc    Submit application form
// @access  Public
router.post('/submit', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, program, programId, message } = req.body

    // Debug logging
    console.log('Application received:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Phone:', phone)
    console.log('Program:', program)
    console.log('Program ID:', programId)
    console.log('Message:', message)
    console.log('Resume:', req.file ? req.file.filename : 'No resume')

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    // Prepare email content
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cof.edu.in'
    const resumePath = req.file ? req.file.path : null
    const resumeFilename = req.file ? req.file.filename : null

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Application - ${program || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px;">
            New Application Received
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Applicant Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${program ? `<p><strong>Program:</strong> ${program}</p>` : ''}
            ${programId ? `<p><strong>Program ID:</strong> ${programId}</p>` : ''}
          </div>
          
          ${message ? `
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          ${resumePath ? `
          <p style="color: #059669;">
            <strong>📎 Resume/CV attached</strong>
          </p>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated message from the College of Fishery Science application system.
            <br>
            Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      `,
      attachments: resumePath ? [{
        filename: resumeFilename,
        path: resumePath
      }] : []
    }

    // Email to applicant (confirmation)
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Application Received - College of Fishery Science',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px;">
            Application Received Successfully
          </h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for your interest in the College of Fishery Science. We have received your application and our admissions team will review it shortly.</p>
          
          ${program ? `
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Program Applied:</strong> ${program}</p>
          </div>
          ` : ''}
          
          <p>We will get back to you within 2-3 working days. If you have any questions in the meantime, please feel free to contact us.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
            <p style="margin: 5px 0;">📧 Email: ${adminEmail}</p>
          </div>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>College of Fishery Science</strong><br>
            Nanaji Deshmukh Veterinary Science University, Jabalpur
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      `
    }

    // Send emails
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = createTransporter()
      
      try {
        // Send to admin
        await transporter.sendMail(adminMailOptions)
        
        // Send confirmation to applicant
        await transporter.sendMail(applicantMailOptions)
        
        console.log('Application emails sent successfully')
      } catch (emailError) {
        console.error('Error sending emails:', emailError)
        // Continue even if email fails
      }
    } else {
      console.log('Email configuration not set up. Application received but emails not sent.')
    }

    res.json({
      success: true,
      message: 'Application submitted successfully! We will contact you soon.',
      data: {
        name,
        email,
        program,
        hasResume: !!resumePath
      }
    })

  } catch (error) {
    console.error('Error submitting application:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
      error: error.message
    })
  }
})

module.exports = router
