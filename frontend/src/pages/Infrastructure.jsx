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
        
        {/* Infrastructure-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Building/structure shapes */}
          <div className="absolute top-20 right-20 w-12 h-16 bg-white/15 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-10 h-14 bg-cyan-300/20 rounded animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Laboratory equipment shapes */}
          <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-6 bg-purple-300/25 rounded-lg animate-bounce transform rotate-45" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 right-1/3 w-4 h-8 bg-indigo-300/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-8 h-4 bg-blue-300/15 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
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
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Floating tech elements */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 right-4 w-8 h-4 bg-blue-400/20 rounded animate-float transform rotate-12" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-3 w-3 h-3 bg-cyan-300/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Monitor className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Smart Classrooms</h3>
                    <p className="text-blue-600 text-sm font-semibold">8 Modern Classrooms</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Air-conditioned classrooms with smart boards, projectors, and audio-visual systems.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-18 h-18 bg-gradient-to-br from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-emerald-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Floating lab elements */}
              <div className="absolute top-4 right-4 w-6 h-3 bg-green-400/20 rounded-full animate-float transform rotate-45" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-3 w-4 h-4 bg-emerald-300/25 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Microscope className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-secondary-600 transition-colors duration-300">Research Laboratories</h3>
                    <p className="text-secondary-600 text-sm font-semibold">Multiple Specialized Labs</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Fish pathology, nutrition, water quality, and molecular biology laboratories.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-amber-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Floating practical elements */}
              <div className="absolute top-3 left-4 w-3 h-3 bg-orange-300/30 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute bottom-4 right-3 w-5 h-3 bg-orange-400/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-amber-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <FlaskConical className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent-600 transition-colors duration-300">Practical Labs</h3>
                    <p className="text-accent-600 text-sm font-semibold">Hands-on Learning</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Well-equipped laboratories for practical training and skill development.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-tl from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-emerald-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Floating building elements */}
              <div className="absolute top-3 right-3 w-4 h-6 bg-green-300/25 rounded animate-float transform rotate-6" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-green-400/30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-4 bg-emerald-300/20 rounded animate-pulse" style={{animationDelay: '2.5s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Academic Blocks</h3>
                    <p className="text-green-600 text-sm font-semibold">Modern Infrastructure</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Spacious academic buildings with modern amenities and facilities.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-indigo-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Floating AI elements */}
              <div className="absolute top-4 right-3 w-3 h-3 bg-purple-400/25 rounded animate-pulse" style={{animationDelay: '2.5s'}}></div>
              <div className="absolute bottom-4 left-4 w-6 h-3 bg-purple-300/20 rounded-full animate-float transform rotate-45" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 left-2 w-2 h-2 bg-indigo-300/30 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">AI Lab</h3>
                    <p className="text-purple-600 text-sm font-semibold">Artificial Intelligence Laboratory</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Advanced AI and machine learning laboratory for modern aquaculture research.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute bottom-0 left-0 w-18 h-18 bg-gradient-to-tr from-indigo-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Floating water/lab elements */}
              <div className="absolute top-3 left-3 w-4 h-4 bg-indigo-300/25 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
              <div className="absolute bottom-3 right-4 w-5 h-2 bg-indigo-400/20 rounded-full animate-float transform rotate-12" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-3 w-2 h-6 bg-blue-300/20 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Beaker className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">WET Lab</h3>
                    <p className="text-indigo-600 text-sm font-semibold">Water Environment Technology Lab</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg border border-indigo-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Specialized laboratory for water quality analysis and environmental testing.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Hatcheries and Demo Units */}
      <section id="hatcheries" className="section-padding bg-gradient-to-br from-white via-green-50 to-blue-50 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-16 left-16 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-36 h-36 bg-blue-400 rounded-full blur-4xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-cyan-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-emerald-400 rounded-full blur-2xl"></div>
        </div>
        
        {/* Enhanced floating hatchery elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Fish-like swimming elements */}
          <div className="absolute top-20 right-20 w-14 h-7 bg-blue-200/20 rounded-full animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 left-24 w-12 h-6 bg-green-200/25 rounded-full animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-cyan-200/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          
          {/* Water bubbles */}
          <div className="absolute top-40 left-40 w-6 h-6 bg-blue-300/15 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-40 right-40 w-4 h-4 bg-green-300/20 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-60 right-60 w-10 h-5 bg-cyan-300/15 rounded-full animate-float transform rotate-45" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hatcheries and Demo Units</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-cyan-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Swimming fish elements */}
              <div className="absolute top-3 left-3 w-6 h-3 bg-blue-300/25 rounded-full animate-float transform rotate-12" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-3 right-3 w-4 h-2 bg-cyan-300/30 rounded-full animate-float transform -rotate-6" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Fish className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Fish Hatchery</h3>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Modern hatchery facilities for breeding and seed production</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-emerald-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Biofloc system elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-4 left-3 w-5 h-3 bg-emerald-300/25 rounded animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-2 w-2 h-4 bg-green-400/20 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Factory className="w-7 h-7 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">Biofloc Systems</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Demonstration units for sustainable aquaculture technology</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-tl from-orange-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-amber-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* RAS system elements */}
              <div className="absolute top-3 right-3 w-4 h-4 bg-orange-300/25 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute bottom-3 left-4 w-3 h-6 bg-orange-400/20 rounded animate-float transform rotate-12" style={{animationDelay: '2.5s'}}></div>
              <div className="absolute top-1/2 left-3 w-2 h-2 bg-amber-300/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Building className="w-7 h-7 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">RAS Units</h3>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Recirculating Aquaculture Systems for intensive farming</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-orange-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Feed manufacturing elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-300/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-4 right-3 w-5 h-3 bg-orange-300/25 rounded animate-float transform -rotate-12" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-4 bg-yellow-400/20 rounded animate-bounce" style={{animationDelay: '2.5s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Factory className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Fish Feed Unit</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">On-site fish feed manufacturing and quality testing facility</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Library and e-Resources */}
      <section id="library" className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-white relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-10 w-36 h-36 bg-purple-400 rounded-full blur-4xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-pink-400 rounded-full blur-2xl"></div>
        </div>
        
        {/* Enhanced floating library elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Book/knowledge shapes */}
          <div className="absolute top-24 left-24 w-8 h-12 bg-purple-200/20 rounded animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 right-32 w-6 h-10 bg-indigo-200/25 rounded animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-10 h-6 bg-purple-300/15 rounded-lg animate-bounce transform rotate-45" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-4 h-8 bg-pink-300/20 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Library and e-Resources</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Floating book elements */}
              <div className="absolute top-3 left-3 w-6 h-8 bg-blue-300/20 rounded animate-float transform rotate-6" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 right-4 w-4 h-6 bg-purple-300/25 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Book className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Central Library</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Extensive collection of books, journals, and research publications in fisheries science</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-emerald-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Floating digital elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-secondary-300/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-3 left-3 w-5 h-3 bg-green-300/25 rounded animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-2 w-2 h-4 bg-emerald-300/20 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Wifi className="w-7 h-7 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">Digital Resources</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Online databases, e-books, and digital library access</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-amber-200 to-transparent opacity-15 group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Floating computer elements */}
              <div className="absolute top-3 left-4 w-4 h-4 bg-accent-300/25 rounded animate-bounce" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute bottom-4 right-3 w-6 h-3 bg-orange-300/20 rounded animate-float transform -rotate-12" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-2 w-2 h-2 bg-amber-300/30 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Monitor className="w-7 h-7 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">Computer Lab</h3>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">High-speed internet and modern computers for research and learning</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 relative overflow-hidden group hover:scale-105">
              {/* Enhanced decorative elements */}
              <div className="absolute bottom-0 right-0 w-18 h-18 bg-gradient-to-tl from-green-200 to-transparent opacity-25 group-hover:opacity-35 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-emerald-200 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Floating study elements */}
              <div className="absolute top-4 right-3 w-3 h-3 bg-green-300/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-3 left-4 w-5 h-3 bg-emerald-300/25 rounded animate-float transform rotate-12" style={{animationDelay: '1.5s'}}></div>
              <div className="absolute top-1/2 left-2 w-2 h-4 bg-green-400/20 rounded animate-bounce" style={{animationDelay: '2.5s'}}></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Users className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">Reading Halls</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200/50">
                  <p className="text-gray-700 text-sm leading-relaxed">Spacious and quiet study areas for individual and group study</p>
                </div>
              </div>
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






