import React, { useState, useEffect } from 'react'
import { X, Upload, Send, Check, Briefcase } from 'lucide-react'
import toast from 'react-hot-toast'
import { jobApplicationAPI } from '../../services/api'

const JobApplicationModal = ({ isOpen, onClose, positionType = 'faculty' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionType: '',
    position: '',
    qualification: '',
    experience: '',
    message: '',
    resume: null
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Update formData when positionType changes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        positionType: positionType
      }))
    }
  }, [positionType, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      const maxFileSize = parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 50 * 1024 * 1024; // 50MB default
      const maxFileSizeMB = Math.round(maxFileSize / (1024 * 1024));
      if (file.size > maxFileSize) {
        toast.error(`File size should not exceed ${maxFileSizeMB}MB`)
        return
      }
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only PDF and DOC/DOCX files are allowed')
        return
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.position) {
      toast.error('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number')
      return
    }

    // Resume validation
    if (!formData.resume) {
      toast.error('Please upload your resume/CV')
      return
    }

    setLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('positionType', formData.positionType || positionType)
      submitData.append('position', formData.position || '')
      submitData.append('qualification', formData.qualification || '')
      submitData.append('experience', formData.experience || '')
      submitData.append('message', formData.message || '')
      if (formData.resume) {
        submitData.append('resume', formData.resume)
      }

      const response = await jobApplicationAPI.submit(submitData)

      if (response.data.success) {
        setSubmitted(true)
        toast.success('Job application submitted successfully!')
        
        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            positionType: positionType,
            position: '',
            qualification: '',
            experience: '',
            message: '',
            resume: null
          })
          setSubmitted(false)
          onClose()
        }, 2000)
      } else {
        toast.error(response.data.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting job application:', error)
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        positionType: positionType,
        position: '',
        qualification: '',
        experience: '',
        message: '',
        resume: null
      })
      setSubmitted(false)
      onClose()
    }
  }

  if (!isOpen) return null

  const positionTitle = positionType === 'faculty' ? 'Faculty Position' : 'Staff Position'
  const headerBg = positionType === 'faculty' 
    ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
    : 'bg-gradient-to-r from-green-600 to-green-700'
  const badgeBg = positionType === 'faculty'
    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
    : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
  const buttonBg = positionType === 'faculty'
    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${headerBg} rounded-t-xl`}>
          <div className="flex items-center">
            <Briefcase className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">
              {submitted ? '✓ Application Submitted!' : `Apply for ${positionTitle}`}
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-white hover:text-gray-200 transition-colors disabled:opacity-50 p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Thank You for Your Application!
              </h3>
              <p className="text-gray-600 text-lg">
                We have received your job application and will review it shortly. Our HR team will contact you if your profile matches our requirements.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className={`p-4 rounded-lg border ${badgeBg} mb-6`}>
                <p className="text-sm text-gray-600 mb-1">Applying for:</p>
                <p className="text-xl font-bold text-gray-900">{positionTitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="10-digit phone number"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                  Position Applying For <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder={positionType === 'faculty' ? 'e.g., Assistant Professor - Aquaculture' : 'e.g., Lab Technician, Administrative Officer'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Qualification */}
                <div>
                  <label htmlFor="qualification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Ph.D., M.Sc., B.Sc."
                  />
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about yourself and why you're interested in this position..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                  Resume/CV <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mr-3 transition-colors" />
                    <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                      {formData.resume ? (
                        <span className="font-semibold text-green-600">✓ {formData.resume.name}</span>
                      ) : (
                        'Click to upload (PDF, DOC, DOCX - Max 5MB)'
                      )}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-6 py-3 ${buttonBg} text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobApplicationModal
