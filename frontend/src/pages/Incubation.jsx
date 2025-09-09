import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, Users, FileText, Lightbulb, TrendingUp, Target, Award, Calendar, Send, Mail, Phone, MapPin, User, Briefcase } from 'lucide-react'
import Card from '../components/common/Card'
import { toast } from 'react-hot-toast'

const Incubation = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    programType: '',
    businessIdea: '',
    experience: '',
    funding: '',
    expectations: '',
    attachment: null
  })
  const [loading, setLoading] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Scroll to section when hash changes
  React.useEffect(() => {
    if (hash) {
      setTimeout(() => scrollToSection(hash), 100)
    }
  }, [hash])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRegistrationForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setRegistrationForm(prev => ({
        ...prev,
        attachment: file
      }))
    } else if (file) {
      toast.error('File size should be less than 5MB')
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'programType', 'businessIdea']
      const missingFields = requiredFields.filter(field => !registrationForm[field])
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required fields')
        setLoading(false)
        return
      }

      // Create FormData for file upload
      const formData = new FormData()
      Object.keys(registrationForm).forEach(key => {
        if (key === 'attachment' && registrationForm[key]) {
          formData.append('attachment', registrationForm[key])
        } else if (key !== 'attachment') {
          formData.append(key, registrationForm[key])
        }
      })

      const response = await fetch('/api/incubation/register', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success('Registration submitted successfully! We will contact you soon.')
        // Reset form
        setRegistrationForm({
          name: '',
          email: '',
          phone: '',
          organization: '',
          position: '',
          programType: '',
          businessIdea: '',
          experience: '',
          funding: '',
          expectations: '',
          attachment: null
        })
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      toast.error('Failed to submit registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Incubation Centre
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Fostering Innovation & Entrepreneurship in Fisheries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('registration')}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Register for Program</span>
              </button>
              <button
                onClick={() => scrollToSection('activities')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Activities</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Startup Incubation</h3>
                  <p className="text-blue-500 text-sm">Business Development Support</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Comprehensive support for fisheries startups from ideation to market launch with mentorship and funding assistance.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Innovation Programs</h3>
                  <p className="text-secondary-600 text-sm">Creative Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Innovation challenges, hackathons, and design thinking workshops to foster creativity in fisheries.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Entrepreneurship Training</h3>
                  <p className="text-accent-600 text-sm">Skill Development</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Training programs on business planning, financial management, and marketing for aspiring entrepreneurs.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Technology Transfer</h3>
                  <p className="text-green-600 text-sm">Research Commercialization</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Facilitating transfer of research innovations to commercial applications in aquaculture sector.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Industry Partnerships</h3>
                  <p className="text-blue-600 text-sm">Collaboration Network</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Building partnerships with industry leaders for mentorship, funding, and market access opportunities.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Awards & Recognition</h3>
                  <p className="text-purple-600 text-sm">Excellence Promotion</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Recognition programs and awards for outstanding innovations and successful startup ventures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Registration Section */}
      <section id="registration" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Register for Incubation Program</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our incubation program and turn your innovative ideas into successful fishery ventures. 
              Apply now to get access to mentorship, funding opportunities, and industry networks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={registrationForm.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Organization/Institution
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={registrationForm.organization}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your organization"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Position/Role
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={registrationForm.position}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your position"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Program Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Program Information</h3>
                    
                    <div>
                      <label htmlFor="programType" className="block text-sm font-medium text-gray-700 mb-2">
                        Program Type *
                      </label>
                      <select
                        id="programType"
                        name="programType"
                        value={registrationForm.programType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select program type</option>
                        <option value="startup-incubation">Startup Incubation</option>
                        <option value="innovation-program">Innovation Program</option>
                        <option value="entrepreneurship-training">Entrepreneurship Training</option>
                        <option value="technology-transfer">Technology Transfer</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={registrationForm.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner (0-2 years)</option>
                        <option value="intermediate">Intermediate (2-5 years)</option>
                        <option value="experienced">Experienced (5+ years)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="funding" className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Requirements
                      </label>
                      <select
                        id="funding"
                        name="funding"
                        value={registrationForm.funding}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select funding range</option>
                        <option value="under-1l">Under ₹1 Lakh</option>
                        <option value="1l-5l">₹1-5 Lakhs</option>
                        <option value="5l-10l">₹5-10 Lakhs</option>
                        <option value="10l-25l">₹10-25 Lakhs</option>
                        <option value="25l-50l">₹25-50 Lakhs</option>
                        <option value="50l-1cr">₹50 Lakhs - 1 Crore</option>
                        <option value="above-1cr">Above ₹1 Crore</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">
                        Attach Business Plan/Proposal (PDF, DOC - Max 5MB)
                      </label>
                      <input
                        type="file"
                        id="attachment"
                        name="attachment"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Full-width fields */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="businessIdea" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Idea/Innovation Description *
                    </label>
                    <textarea
                      id="businessIdea"
                      name="businessIdea"
                      value={registrationForm.businessIdea}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your business idea, innovation, or project in detail..."
                    />
                  </div>

                  <div>
                    <label htmlFor="expectations" className="block text-sm font-medium text-gray-700 mb-2">
                      Expectations from the Program
                    </label>
                    <textarea
                      id="expectations"
                      name="expectations"
                      value={registrationForm.expectations}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What do you expect to achieve from this incubation program?"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Incubation






