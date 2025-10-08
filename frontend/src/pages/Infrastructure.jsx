import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, Book, Home, Factory, Microscope, Fish, FlaskConical, Monitor, Wifi, Users, Brain, Beaker } from 'lucide-react'
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
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-green-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-44 h-44 bg-blue-300 rounded-full blur-4xl"></div>
        </div>
        
        {/* Subtle floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Building/structure shapes */}
          <div className="absolute top-20 right-20 w-12 h-16 bg-white/10 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-10 h-14 bg-cyan-300/15 rounded animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Infrastructure bubbles */}
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Infrastructure
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Modern Facilities Supporting Excellence in Fishery Education
            </p>
          </div>
        </div>
      </section>
      
      {/* Classrooms and Labs */}
      <section id="classrooms" className="section-padding bg-gradient-to-br from-gray-50 via-blue-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-indigo-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Floating lab equipment elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-20 w-8 h-12 bg-blue-200/15 rounded animate-float transform rotate-6" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-32 right-24 w-6 h-6 bg-purple-200/20 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-10 h-4 bg-indigo-200/15 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Classrooms and Labs</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-blue-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
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
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
              
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
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl from-orange-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-3 w-2 h-2 bg-orange-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1.5s'}}></div>
              
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
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute top-3 left-2 w-3 h-3 bg-green-300 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
              
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
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2.5s'}}></div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Lab</h3>
                  <p className="text-purple-600 text-sm">Artificial Intelligence Laboratory</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Advanced AI and machine learning laboratory for modern aquaculture research.
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-indigo-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute top-2 right-3 w-3 h-3 bg-indigo-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '3s'}}></div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Beaker className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">WET Lab</h3>
                  <p className="text-indigo-600 text-sm">Water Environment Technology Lab</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Specialized laboratory for water quality analysis and environmental testing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hatcheries and Demo Units */}
      <section id="hatcheries" className="section-padding bg-gradient-to-br from-white via-green-50 to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 left-16 w-28 h-28 bg-green-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Floating hatchery elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-10 h-5 bg-blue-200/15 rounded-full animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 left-24 w-8 h-4 bg-green-200/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-cyan-200/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hatcheries and Demo Units</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute top-1 right-1 w-8 h-8 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <Fish className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fish Hatchery</h3>
              <p className="text-gray-700 text-sm">Modern hatchery facilities for breeding and seed production</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group">
              <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 right-3 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-float" style={{animationDelay: '1s'}}></div>
              <Factory className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Biofloc Systems</h3>
              <p className="text-gray-700 text-sm">Demonstration units for sustainable aquaculture technology</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden group">
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-gradient-to-tl from-orange-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute top-2 left-3 w-2 h-2 bg-orange-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
              <Building className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">RAS Units</h3>
              <p className="text-gray-700 text-sm">Recirculating Aquaculture Systems for intensive farming</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden group">
              <div className="absolute top-1 right-1 w-10 h-10 bg-gradient-to-bl from-yellow-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
              <Factory className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fish Feed Unit</h3>
              <p className="text-gray-700 text-sm">On-site fish feed manufacturing and quality testing facility</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Library and e-Resources */}
      <section id="library" className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-28 h-28 bg-indigo-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Library and e-Resources</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
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
      <section id="hostels" className="section-padding bg-gradient-to-br from-white via-green-50 to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 left-16 w-28 h-28 bg-green-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
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
      <section id="processing" className="section-padding bg-gradient-to-br from-gray-50 via-orange-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-30 h-30 bg-orange-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-400 rounded-full blur-3xl"></div>
        </div>
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
    </div>
  )
}

export default Infrastructure






