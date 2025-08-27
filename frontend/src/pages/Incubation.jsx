import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building, Users, FileText, Lightbulb, TrendingUp, Target, Award, Calendar } from 'lucide-react'
import Card from '../components/common/Card'

const Incubation = () => {
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
              Incubation Centre
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Fostering Innovation & Entrepreneurship in Fisheries
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding-sm bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => scrollToSection('activities')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Activities
            </button>
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
    </div>
  )
}

export default Incubation

