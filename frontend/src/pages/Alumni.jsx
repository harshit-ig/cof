import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Users, Star, Calendar, Award, ExternalLink, Mail, Phone, MapPin, GraduationCap } from 'lucide-react'
import Card from '../components/common/Card'

const Alumni = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

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

  // Sample alumni data
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      batch: "2018",
      position: "Senior Aquaculture Scientist",
      company: "ICAR-CIFE, Mumbai",
      image: "/api/placeholder/300/300",
      testimonial: "The comprehensive education and practical training I received at COF Jabalpur laid the foundation for my successful career in aquaculture research. The faculty's guidance and state-of-the-art facilities prepared me well for the challenges in the field."
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      batch: "2019",
      position: "Fish Farm Manager",
      company: "Blue Revolution Technologies",
      image: "/api/placeholder/300/300",
      testimonial: "The hands-on experience with modern aquaculture techniques and business management aspects taught at COF helped me establish my own successful fish farming enterprise. The college truly bridges the gap between academics and industry."
    },
    {
      id: 3,
      name: "Mr. Amit Singh",
      batch: "2020",
      position: "Fishery Extension Officer",
      company: "Madhya Pradesh Fisheries Department",
      image: "/api/placeholder/300/300",
      testimonial: "The extension and outreach programs during my studies gave me valuable insights into rural fishery development. Today, I'm able to help farmers adopt sustainable aquaculture practices and improve their livelihoods."
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Alumni Meet 2025",
      date: "December 15, 2025",
      time: "10:00 AM - 6:00 PM",
      venue: "COF Campus, Jabalpur",
      description: "Join us for our annual gathering to reconnect with classmates, faculty, and contribute to the college's growth.",
      registrationOpen: true
    },
    {
      id: 2,
      title: "Industry Expert Talk Series",
      date: "November 20, 2025",
      time: "2:00 PM - 4:00 PM",
      venue: "Virtual Event",
      description: "Alumni sharing industry insights and career guidance with current students.",
      registrationOpen: true
    },
    {
      id: 3,
      title: "Alumni Achievement Awards Ceremony",
      date: "January 10, 2026",
      time: "5:00 PM - 8:00 PM",
      venue: "COF Auditorium, Jabalpur",
      description: "Recognizing outstanding achievements of our alumni in various fields of fisheries and aquaculture.",
      registrationOpen: false
    }
  ]

  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    batchYear: '',
    degree: '',
    currentPosition: '',
    organization: '',
    workLocation: '',
    linkedIn: '',
    achievements: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setRegistrationForm({
      ...registrationForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Alumni registration:', registrationForm)
    alert('Thank you for registering! We will contact you soon.')
    // Reset form
    setRegistrationForm({
      name: '',
      email: '',
      phone: '',
      batchYear: '',
      degree: '',
      currentPosition: '',
      organization: '',
      workLocation: '',
      linkedIn: '',
      achievements: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
            <section className="section-padding bg-blue-600 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Alumni Network
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connecting Generations of Fishery Professionals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                View Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('events')}
                className="btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                Upcoming Events
              </button>
              <button 
                onClick={() => scrollToSection('registration')}
                className="btn-secondary bg-blue-700 hover:bg-blue-800"
              >
                Alumni Registration
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Alumni Worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Industry Leaders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Employment Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Testimonials</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our successful alumni about their journey and experiences at COF Jabalpur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-blue-600 text-sm">Batch of {testimonial.batch}</p>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic">"{testimonial.testimonial}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Events */}
      <section id="events" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Events</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected through our alumni events and networking opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-blue-600 text-sm">{event.date}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.time}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}
                  </p>
                </div>
                <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                <button 
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    event.registrationOpen 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!event.registrationOpen}
                >
                  {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Registration */}
      <section id="registration" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Registration</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our alumni network and stay connected with your alma mater
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={registrationForm.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={registrationForm.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={registrationForm.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Batch Year *</label>
                    <input
                      type="text"
                      name="batchYear"
                      value={registrationForm.batchYear}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g., 2020"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Degree/Program *</label>
                    <select
                      name="degree"
                      value={registrationForm.degree}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select Degree</option>
                      <option value="B.F.Sc">B.F.Sc (Bachelor of Fishery Science)</option>
                      <option value="M.F.Sc">M.F.Sc (Master of Fishery Science)</option>
                      <option value="Ph.D">Ph.D in Fishery Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Current Position</label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={registrationForm.currentPosition}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Organization/Company</label>
                    <input
                      type="text"
                      name="organization"
                      value={registrationForm.organization}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Work Location</label>
                    <input
                      type="text"
                      name="workLocation"
                      value={registrationForm.workLocation}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City, State, Country"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="form-label">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={registrationForm.linkedIn}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
                
                <div>
                  <label className="form-label">Professional Achievements</label>
                  <textarea
                    name="achievements"
                    value={registrationForm.achievements}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Share your notable achievements, awards, or recognitions..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="form-label">Message to College</label>
                  <textarea
                    name="message"
                    value={registrationForm.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Any message, feedback, or suggestions for the college..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3"
                  >
                    Register as Alumni
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Alumni Office */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Alumni Office</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">alumni@cofjabalpur.edu.in</p>
            </Card>
            
            <Card className="p-6 text-center">
              <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 761 2681239</p>
            </Card>
            
            <Card className="p-6 text-center">
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">
                College of Fishery Science<br />
                Jabalpur, Madhya Pradesh
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Alumni