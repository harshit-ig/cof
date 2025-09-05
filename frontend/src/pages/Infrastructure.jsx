import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, Book, Home, Factory, Microscope, Fish, FlaskConical, Monitor, Wifi, Users } from 'lucide-react'
import Card from '../components/common/Card'

const Infrastructure = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Infrastructure
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Modern Facilities Supporting Excellence in Fisheries Education
            </p>
          </div>
        </div>
      </section>
      
      {/* Classrooms and Labs */}
      <section id="classrooms" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Classrooms and Labs</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Monitor className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Smart Classrooms</h3>
                  <p className="text-blue-500 text-sm">8 Modern Classrooms</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Air-conditioned classrooms with smart boards, projectors, and audio-visual systems.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <Microscope className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Research Laboratories</h3>
                  <p className="text-secondary-600 text-sm">Multiple Specialized Labs</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Fish pathology, nutrition, water quality, and molecular biology laboratories.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <FlaskConical className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Practical Labs</h3>
                  <p className="text-accent-600 text-sm">Hands-on Learning</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Well-equipped laboratories for practical training and skill development.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Academic Blocks</h3>
                  <p className="text-green-600 text-sm">Modern Infrastructure</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Spacious academic buildings with modern amenities and facilities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hatcheries and Demo Units */}
      <section id="hatcheries" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hatcheries and Demo Units</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Fish className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fish Hatchery</h3>
              <p className="text-gray-700 text-sm">Modern hatchery facilities for breeding and seed production</p>
            </Card>
            <Card className="p-6 text-center">
              <Factory className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Biofloc Systems</h3>
              <p className="text-gray-700 text-sm">Demonstration units for sustainable aquaculture technology</p>
            </Card>
            <Card className="p-6 text-center">
              <Building className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">RAS Units</h3>
              <p className="text-gray-700 text-sm">Recirculating Aquaculture Systems for intensive farming</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Library and e-Resources */}
      <section id="library" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Library and e-Resources</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Book className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Central Library</h3>
              <p className="text-gray-700 text-sm">Extensive collection of books, journals, and research publications in fisheries science</p>
            </Card>
            <Card className="p-6">
              <Wifi className="w-8 h-8 text-secondary-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Resources</h3>
              <p className="text-gray-700 text-sm">Online databases, e-books, and digital library access</p>
            </Card>
            <Card className="p-6">
              <Monitor className="w-8 h-8 text-accent-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Computer Lab</h3>
              <p className="text-gray-700 text-sm">High-speed internet and modern computers for research and learning</p>
            </Card>
            <Card className="p-6">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reading Halls</h3>
              <p className="text-gray-700 text-sm">Spacious and quiet study areas for individual and group study</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hostels and Campus Facilities */}
      <section id="hostels" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hostels and Campus Facilities</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Home className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Hostels</h3>
              <p className="text-gray-700 text-sm">Separate hostels for boys and girls with modern amenities</p>
            </Card>
            <Card className="p-6 text-center">
              <Building className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Guest House</h3>
              <p className="text-gray-700 text-sm">Accommodation facility for visitors and guests</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cafeteria</h3>
              <p className="text-gray-700 text-sm">Hygienic dining facilities with nutritious meals</p>
            </Card>
            <Card className="p-6 text-center">
              <Factory className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sports Complex</h3>
              <p className="text-gray-700 text-sm">Recreational and sports facilities for students</p>
            </Card>
            <Card className="p-6 text-center">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wi-Fi Campus</h3>
              <p className="text-gray-700 text-sm">High-speed internet connectivity across the campus</p>
            </Card>
            <Card className="p-6 text-center">
              <Monitor className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Center</h3>
              <p className="text-gray-700 text-sm">Basic healthcare facilities and medical support</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Fish Processing & Feed Units */}
      <section id="processing" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fish Processing & Feed Units</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Factory className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Fish Processing Unit</h3>
                  <p className="text-blue-500 text-sm">Value Addition Facility</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Modern processing equipment for fish preservation, packaging, and value addition.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <FlaskConical className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Feed Manufacturing</h3>
                  <p className="text-secondary-600 text-sm">Nutrition Research</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Fish feed production unit for formulation and testing of nutritious feeds.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <Microscope className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quality Control Lab</h3>
                  <p className="text-accent-600 text-sm">Testing & Analysis</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Quality testing and analysis facilities for processed products and feeds.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Cold Storage</h3>
                  <p className="text-green-600 text-sm">Preservation Facility</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Temperature-controlled storage facilities for fish and fish products.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Infrastructure Gallery */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Infrastructure Gallery</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg" 
                alt="Academic Building" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Academic Buildings</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg" 
                alt="Research Labs" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Research Laboratories</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg" 
                alt="Hatcheries" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Hatchery Units</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/WhatsApp Image 2025-08-21 at 22.43.39_1241e1b8.jpg" 
                alt="Campus Facilities" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Campus Facilities</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/WhatsApp Image 2025-08-21 at 22.43.42_4e674a8f.jpg" 
                alt="Library" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Library & Study Areas</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src="/cllg.jpg" 
                alt="College Building" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">Main College Building</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center"
            >
              View Complete Gallery
              <Building className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Infrastructure

