import React, { useState, useEffect } from 'react'
import { X, Upload, Send, Check, Lightbulb } from 'lucide-react'
import toast from 'react-hot-toast'
import { incubationAPI } from '../../services/api'

const IncubationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    businessIdea: '',
    stage: '',
    fundingRequired: '',
    message: '',
    businessPlan: null
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
      // Validate file size (max 10MB for business plans)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should not exceed 10MB')
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
        businessPlan: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.businessIdea) {
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

    setLoading(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('organization', formData.organization || '')
      submitData.append('businessIdea', formData.businessIdea)
      submitData.append('stage', formData.stage || '')
      submitData.append('fundingRequired', formData.fundingRequired || '')
      submitData.append('message', formData.message || '')
      if (formData.businessPlan) {
        submitData.append('businessPlan', formData.businessPlan)
      }

      const response = await incubationAPI.register(submitData)

      if (response.data.success) {
        setSubmitted(true)
        toast.success('Registration submitted successfully!')
        
        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            organization: '',
            businessIdea: '',
            stage: '',
            fundingRequired: '',
            message: '',
            businessPlan: null
          })
          setSubmitted(false)
          onClose()
        }, 2500)
      } else {
        toast.error(response.data.message || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting incubation registration:', error)
      toast.error(error.response?.data?.message || 'Failed to submit registration. Please try again.')
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
        organization: '',
        businessIdea: '',
        stage: '',
        fundingRequired: '',
        message: '',
        businessPlan: null
      })
      setSubmitted(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-t-xl">
          <div className="flex items-center">
            <Lightbulb className="w-8 h-8 text-white mr-3" />
            <h2 className="text-2xl font-bold text-white">
              {submitted ? '✓ Registration Submitted!' : 'Register for Incubation Program'}
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
                Thank You for Your Interest!
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                We have received your incubation program registration. Our team will review your application and contact you within 3-5 working days.
              </p>
              <p className="text-sm text-gray-500">
                Get ready to transform your innovative ideas into reality!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200 mb-6">
                <p className="text-sm text-gray-600 mb-1">Registering for:</p>
                <p className="text-xl font-bold text-purple-900">Fisheries Incubation Program</p>
                <p className="text-xs text-gray-500 mt-1">Transform your innovative ideas into successful enterprises</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization/Institution (Optional)
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Your current organization"
                />
              </div>

              {/* Business Idea */}
              <div>
                <label htmlFor="businessIdea" className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Idea/Concept <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="businessIdea"
                  name="businessIdea"
                  value={formData.businessIdea}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Brief description of your fisheries/aquaculture business idea..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business Stage */}
                <div>
                  <label htmlFor="stage" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Stage
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select stage</option>
                    <option value="idea">Idea Stage</option>
                    <option value="prototype">Prototype/Testing</option>
                    <option value="early">Early Stage/Launch</option>
                    <option value="growth">Growth Stage</option>
                  </select>
                </div>

                {/* Funding Required */}
                <div>
                  <label htmlFor="fundingRequired" className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Funding Required
                  </label>
                  <input
                    type="text"
                    id="fundingRequired"
                    name="fundingRequired"
                    value={formData.fundingRequired}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., ₹5-10 lakhs"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Any additional information about your project, team, or requirements..."
                />
              </div>

              {/* Business Plan Upload */}
              <div>
                <label htmlFor="businessPlan" className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Plan/Proposal (Optional)
                </label>
                <div className="mt-1">
                  <label
                    htmlFor="businessPlan"
                    className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all group"
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mr-3 transition-colors" />
                    <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                      {formData.businessPlan ? (
                        <span className="font-semibold text-green-600">✓ {formData.businessPlan.name}</span>
                      ) : (
                        'Click to upload (PDF, DOC, DOCX - Max 10MB)'
                      )}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="businessPlan"
                    name="businessPlan"
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Registration
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

export default IncubationModal
