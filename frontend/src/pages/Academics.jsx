import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Building, FileText, Users, Award, GraduationCap } from 'lucide-react'
import Card from '../components/common/Card'

const Academics = () => {
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
              Academics
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Quality Education in Fishery Science & Aquaculture
            </p>
          </div>
        </div>
      </section>


      {/* Programs Offered */}
      <section id="programs" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Programs Offered</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Bachelor of Fishery Science</h3>
                  <p className="text-blue-500 text-sm">B.F.Sc. • 4 Years</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Comprehensive undergraduate program covering fishery science, aquaculture, and fishery management.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Master of Fishery Science</h3>
                  <p className="text-secondary-600 text-sm">M.F.Sc. • 2 Years</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Advanced postgraduate program with specialization in various fields of fishery science.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section id="calendar" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Calendar</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Admission Opens</h4>
              <p className="text-gray-600 text-xs">June 2025</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Classes Begin</h4>
              <p className="text-gray-600 text-xs">July 2025</p>
            </Card>
            <Card className="p-4 text-center">
              <Calendar className="w-8 h-8 text-accent-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Examinations</h4>
              <p className="text-gray-600 text-xs">December 2025</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Departments</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Building className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aquaculture</h3>
              <p className="text-gray-700 text-sm">Fish culture, breeding, and production techniques</p>
            </Card>
            <Card className="p-6">
              <Building className="w-8 h-8 text-secondary-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fishery Resource Management</h3>
              <p className="text-gray-700 text-sm">Sustainable fishery and resource conservation</p>
            </Card>
            <Card className="p-6">
              <Building className="w-8 h-8 text-accent-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fish Processing Technology</h3>
              <p className="text-gray-700 text-sm">Food technology and value addition in fishery</p>
            </Card>
            <Card className="p-6">
              <Building className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aquatic Environment Management</h3>
              <p className="text-gray-700 text-sm">Environmental aspects of aquatic ecosystems</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section id="curriculum" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <Card className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Curriculum</h3>
            <p className="text-gray-700 text-sm mb-4">
              Our curriculum covers theoretical knowledge and practical skills in fishery science, 
              aquaculture, fish processing, and resource management.
            </p>
            <Link
              to="/programs"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              View Detailed Curriculum
            </Link>
          </Card>
        </div>
      </section>

      {/* Faculty Directory */}
      <section id="faculty" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Faculty Directory</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Faculty Members</h3>
            <p className="text-gray-700 text-sm mb-4">
              Highly qualified and experienced faculty members specializing in various fields of fishery science.
            </p>
            <Link
              to="/faculty"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              View Faculty Profiles
            </Link>
          </Card>
        </div>
      </section>

      {/* Academic Regulations */}
      <section id="regulations" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Regulations</h2>
            <div className="w-16 h-1 bg-blue-400 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance</h3>
              <p className="text-gray-700 text-sm">Minimum 75% attendance required</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Examinations</h3>
              <p className="text-gray-700 text-sm">Mid-term & final examination system</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-8 h-8 text-accent-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Grading</h3>
              <p className="text-gray-700 text-sm">Credit-based grading system</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Academics






