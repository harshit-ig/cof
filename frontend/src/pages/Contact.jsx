import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Users, Building, Globe, Send, CheckCircle } from 'lucide-react'
import Card from '../components/common/Card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['0645-231375', 'Office: 0645-231375'],
      description: 'Main office contact number'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['deancof_basu_bih@gov.in', 'info@cofbasu.edu.in'],
      description: 'Primary communication channels'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'College of Fisheries, Jabalpur',
        'Nanaji Deshmukh Veterinary Science University',
        'Jabalpur, Madhya Pradesh'
      ],
      description: 'Main campus location'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      description: 'Administrative office timings'
    }
  ]

  const departments = [
    {
      name: 'Aquaculture',
      contact: 'Dr. Rajesh Kumar',
      email: 'aquaculture@cofbasu.edu.in'
    },
    {
      name: 'Fish Health Management',
      contact: 'Dr. Priya Sharma',
      email: 'fishhealth@cofbasu.edu.in'
    },
    {
      name: 'Fish Processing Technology',
      contact: 'Dr. Amit Patel',
      email: 'processing@cofbasu.edu.in'
    },
    {
      name: 'Fisheries Extension',
      contact: 'Dr. Meera Singh',
      email: 'extension@cofbasu.edu.in'
    }
  ]

  const quickLinks = [
    {
      title: 'Admission Enquiry',
      description: 'Information about programs and admission process',
      icon: Users
    },
    {
      title: 'Research Collaboration',
      description: 'Partnership opportunities and research projects',
      icon: Globe
    },
    {
      title: 'Industry Partnership',
      description: 'Collaboration with fisheries and aquaculture industry',
      icon: Building
    },
    {
      title: 'General Information',
      description: 'General queries about the institution',
      icon: Users
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with us for any queries, collaborations, or information. 
              We're here to help you connect with College of Fisheries, Jabalpur.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-2 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-gray-600 text-xs">{info.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have a question or want to get in touch? Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <Card className="p-8 text-center bg-green-50 border-green-200">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                </Card>
              ) : (
                <Card className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-input"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="form-label">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="form-select"
                        >
                          <option value="">Select a subject</option>
                          <option value="admission">Admission Enquiry</option>
                          <option value="academic">Academic Information</option>
                          <option value="research">Research Collaboration</option>
                          <option value="partnership">Industry Partnership</option>
                          <option value="general">General Information</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="form-textarea"
                        placeholder="Please describe your inquiry in detail..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </form>
                </Card>
              )}
            </div>

            {/* Contact Details & Map */}
            <div className="space-y-8">
              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact Categories</h3>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <link.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{link.title}</h4>
                        <p className="text-gray-600 text-sm">{link.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Department Contacts */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Contacts</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{dept.contact}</p>
                      <p className="text-sm text-primary-600">{dept.email}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-6 bg-red-50 border-red-200">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Emergency Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-medium">0645-231375</span>
                  </div>
                  <p className="text-red-700 text-sm">
                    For urgent matters, please call our main office number during business hours.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Location</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location Details */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Campus Address</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">College of Fisheries, Jabalpur</p>
                      <p className="text-gray-600">Nanaji Deshmukh Veterinary Science University</p>
                      <p className="text-gray-600">Jabalpur, Madhya Pradesh, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Geographic Location</p>
                      <p className="text-gray-600">Situated on the banks of river Mahananda</p>
                      <p className="text-gray-600">Near Dr. Kalam Agriculture College</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Reach</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">By Road</h4>
                    <p className="text-gray-600 text-sm">
                      Well-connected by state highways. Regular bus services from major cities in Madhya Pradesh.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">By Rail</h4>
                    <p className="text-gray-600 text-sm">
                      Jabalpur Railway Station is the nearest railhead, providing excellent connectivity.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">By Air</h4>
                    <p className="text-gray-600 text-sm">
                      Jabalpur Airport (Dumna Airport) is the nearest airport, providing good connectivity.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h3>
                <p className="text-gray-500 text-sm">
                  Map integration will be added here showing the exact location of College of Fisheries, Jabalpur
                </p>
                <div className="mt-4 p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Coordinates:</strong><br />
                    Latitude: 26.1191° N<br />
                    Longitude: 87.9531° E
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a prospective student, research partner, or industry collaborator, 
            we're here to help you achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0645-231375"
              className="btn-accent inline-flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
            
            <a
              href="mailto:deancof_basu_bih@gov.in"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact