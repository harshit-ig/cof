import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, BookOpen, Target, Eye, Calendar } from 'lucide-react'
import Card from '../components/common/Card'

const About = () => {
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

  const organizationalStructure = [
    {
      title: 'Dean',
      description: 'Dr. Shashikant Mahajan',
      responsibilities: ['Overall administration', 'Academic leadership', 'Strategic planning']
    },
    {
      title: 'Teaching Faculty',
      description: 'Expert faculty members',
      responsibilities: ['Academic delivery', 'Research guidance', 'Student mentoring']
    },
    {
      title: 'Non-Teaching Staff',
      description: 'Support staff',
      responsibilities: ['Administrative support', 'Technical assistance', 'Student services']
    },
    {
      title: 'Department Heads',
      description: 'Department coordinators',
      responsibilities: ['Department management', 'Curriculum coordination', 'Research oversight']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About College of Fisheries, Jabalpur</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our rich history, vision, and commitment to excellence in fisheries education and research
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('dean-message')}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Message from the Dean
            </button>
            <button
              onClick={() => scrollToSection('history')}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              History and Vision
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Mission & Objectives
            </button>
            <button
              onClick={() => scrollToSection('structure')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Organizational Structure
            </button>
            <button
              onClick={() => scrollToSection('governing-body')}
              className="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
            >
              Governing Body / Advisory Board
            </button>
          </div>
        </div>
      </section>

      {/* Dean's Message */}
      <section id="dean-message" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://www.ndvsu.org/images/Shashikant.jpg"
                alt="Dean's Photo"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x500/0f766e/ffffff?text=Dean+Photo'
                }}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Message from the Dean</h2>
                <div className="w-20 h-1 bg-blue-500 rounded"></div>
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                "Welcome to College of Fisheries, Jabalpur, where we are committed to excellence 
                in fisheries education and research. Our mission is to develop skilled 
                professionals who will contribute to sustainable aquaculture and fisheries 
                management for the benefit of society."
              </blockquote>
              
              <p className="text-gray-700 leading-relaxed">
                The College of Fisheries, Jabalpur is a constituent college of Nanaji Deshmukh Veterinary Science University. 
                This College is committed to providing quality fisheries education and conducting research that contributes 
                to the advancement of aquaculture and fisheries management.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                This college offers a credible fisheries education institution that nurtures the next-generation 
                of professionals and entrepreneurs in the fisheries sector and contributes to the state and nation 
                by pursuing innovations and research which is relevant to local needs and directed towards 
                maximizing outcomes for economic, social and environmental well-being.
              </p>
              
              <div>
                <p className="font-semibold text-gray-900">Dr. Shashikant Mahajan</p>
                <p className="text-gray-600">Dean, College of Fisheries, Jabalpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Vision */}
      <section id="history" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">History and Vision</h2>
            <div className="w-20 h-1 bg-green-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2018 - Foundation</h3>
                  <p className="text-gray-700">
                    The college was established under Nanaji Deshmukh Veterinary Science University to provide 
                    quality fisheries education and research opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Location</h3>
                  <p className="text-gray-700">
                    Located in Jabalpur under Nanaji Deshmukh Veterinary Science University, 
                    providing an ideal environment for fisheries studies and research.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Excellence</h3>
                  <p className="text-gray-700">
                    Over the years, we have established ourselves as a leading institution in fisheries education, 
                    research, and extension services, contributing significantly to the development of the fisheries sector.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be a globally recognized institution for excellence in fisheries education, research, 
                    and extension services, fostering innovation and sustainable practices in aquatic resource management.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Objectives */}
      <section id="mission" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Objectives</h2>
            <div className="w-20 h-1 bg-purple-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-8 mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide quality education in fisheries science and aquaculture, conduct cutting-edge research, 
                and disseminate knowledge to stakeholders for sustainable development of the fisheries sector.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Educational Objectives</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Provide comprehensive education in fisheries science
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Develop skilled professionals for the aquaculture industry
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Foster innovation and practical learning
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Research Objectives</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Conduct cutting-edge research in fisheries science
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Promote sustainable aquaculture practices
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                    Contribute to fisheries sector development
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section id="structure" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
            <div className="w-20 h-1 bg-gray-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {organizationalStructure.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governing Body / Advisory Board */}
      <section id="governing-body" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Body / Advisory Board</h2>
            <div className="w-20 h-1 bg-orange-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <p className="text-gray-600 text-lg">
                The college operates under the governance structure of Nanaji Deshmukh Veterinary Science University. 
                Detailed information about the governing body and advisory board members will be updated here.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About