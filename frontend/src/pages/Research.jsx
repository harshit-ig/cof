import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FlaskConical, Users, Award, BookOpen, Globe, Building, Fish, Microscope } from 'lucide-react'
import Card from '../components/common/Card'

const Research = () => {
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
              Research
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Advancing Fisheries Science Through Innovation & Discovery
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding-sm bg-white border-b border-gray-200">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Ongoing Projects
            </button>
            <button 
              onClick={() => scrollToSection('publications')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Publications
            </button>
            <button 
              onClick={() => scrollToSection('student-research')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Student Research
            </button>
            <button 
              onClick={() => scrollToSection('collaborations')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Collaborations
            </button>
            <button 
              onClick={() => scrollToSection('facilities')}
              className="px-4 py-2 text-sm border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Research Facilities
            </button>
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ongoing Projects</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FlaskConical className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">ICAR Projects</h3>
                  <p className="text-blue-500 text-sm">Climate Resilient Aquaculture</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Research on sustainable aquaculture practices and climate change adaptation strategies.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <Fish className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">NFDB Projects</h3>
                  <p className="text-secondary-600 text-sm">Fish Health Management</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Integrated fish health management and disease prevention in freshwater aquaculture.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">PMMSY Projects</h3>
                  <p className="text-accent-600 text-sm">Alternative Protein Sources</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Development of sustainable and cost-effective protein alternatives for fish feed.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Microscope className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">DBT Projects</h3>
                  <p className="text-green-600 text-sm">Genetic Improvement</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Selective breeding and genetic enhancement of indigenous fish species.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Publications and Journals */}
      <section id="publications" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Publications and Journals</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <Card className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Publications</h3>
            <p className="text-gray-700 text-sm mb-4">
              Our faculty and students regularly publish in prestigious national and international journals 
              in the field of fisheries science and aquaculture.
            </p>
            <Link
              to="/research/publications"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              View Publications
            </Link>
          </Card>
        </div>
      </section>

      {/* Student Research */}
      <section id="student-research" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Research</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">M.F.Sc. Research</h3>
              <p className="text-gray-700 text-sm">Postgraduate students conducting research in various areas of fisheries science</p>
            </Card>
            <Card className="p-6 text-center">
              <FlaskConical className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">B.F.Sc. Projects</h3>
              <p className="text-gray-700 text-sm">Undergraduate research projects and final year dissertations</p>
            </Card>
            <Card className="p-6 text-center">
              <Award className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Awards</h3>
              <p className="text-gray-700 text-sm">Student achievements and awards in research competitions</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Collaborations */}
      <section id="collaborations" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Collaborations</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Building className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ICAR Institutes</h3>
              <p className="text-gray-700 text-sm">CIFA, NBFGR, CIFRI and other premier research institutes</p>
            </Card>
            <Card className="p-6">
              <Globe className="w-8 h-8 text-secondary-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Government Partnerships</h3>
              <p className="text-gray-700 text-sm">State fisheries departments and policy implementation agencies</p>
            </Card>
            <Card className="p-6">
              <Users className="w-8 h-8 text-accent-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Partners</h3>
              <p className="text-gray-700 text-sm">Private sector collaborations for technology transfer</p>
            </Card>
            <Card className="p-6">
              <BookOpen className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Networks</h3>
              <p className="text-gray-700 text-sm">Universities and research organizations worldwide</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Research Facilities */}
      <section id="facilities" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Facilities</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Microscope className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Laboratory</h3>
              <p className="text-gray-700 text-sm">Modern analytical equipment and instruments</p>
            </Card>
            <Card className="p-6 text-center">
              <Fish className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aquaculture Unit</h3>
              <p className="text-gray-700 text-sm">Experimental ponds and culture systems</p>
            </Card>
            <Card className="p-6 text-center">
              <Building className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fish Health Lab</h3>
              <p className="text-gray-700 text-sm">Disease diagnosis and health monitoring</p>
            </Card>
            <Card className="p-6 text-center">
              <FlaskConical className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feed Technology Lab</h3>
              <p className="text-gray-700 text-sm">Feed formulation and nutrition research</p>
            </Card>
            <Card className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Library & Database</h3>
              <p className="text-gray-700 text-sm">Research publications and digital resources</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Field Station</h3>
              <p className="text-gray-700 text-sm">On-farm research and demonstration plots</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Research

