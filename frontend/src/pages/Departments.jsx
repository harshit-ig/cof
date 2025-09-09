import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Users, FlaskConical, Leaf, Fish, Microscope, Calculator, BarChart3, Globe, Award } from 'lucide-react'
import Card from '../components/common/Card'

const Departments = () => {
  const location = useLocation()
  const hash = location.hash.substring(1)

  const departments = [
    {
      id: 'aquaculture',
      name: 'Aquaculture',
      icon: Fish,
      description: 'Study of farming aquatic organisms including fish, mollusks, crustaceans, and aquatic plants.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Hatchery Units', 'Pond Systems', 'Feed Mill'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'aquatic-health',
      name: 'Aquatic Animal Health Management',
      icon: Microscope,
      description: 'Focus on disease prevention, diagnosis, and treatment in aquatic animals.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Diagnostic Lab', 'Pathology Unit', 'Quarantine Facility'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'aquatic-environment',
      name: 'Aquatic Environment Management',
      icon: Globe,
      description: 'Study of aquatic ecosystems, water quality, and environmental impact assessment.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Water Quality Lab', 'GIS Lab', 'Environmental Monitoring'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'biotechnology',
      name: 'Fish Biotechnology',
      icon: FlaskConical,
      description: 'Application of biotechnological tools in fish breeding, genetics, and disease resistance.',
      courses: ['M.F.Sc.', 'Ph.D.'],
      facilities: ['Molecular Biology Lab', 'Tissue Culture Lab', 'PCR Facility'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'breeding-genetics',
      name: 'Fish Breeding & Genetics',
      icon: Leaf,
      description: 'Study of fish breeding techniques, genetic improvement, and conservation.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Breeding Ponds', 'Genetic Lab', 'Cryopreservation Unit'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'nutrition-feed',
      name: 'Fish Nutrition & Feed Technology',
      icon: Award,
      description: 'Research on fish nutrition requirements and feed formulation technology.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Feed Analysis Lab', 'Feed Mill', 'Nutrition Research Unit'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'physiology-biochemistry',
      name: 'Fish Physiology & Biochemistry',
      icon: Microscope,
      description: 'Study of fish physiological processes and biochemical mechanisms.',
      courses: ['M.F.Sc.', 'Ph.D.'],
      facilities: ['Physiology Lab', 'Biochemistry Lab', 'Research Units'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'processing',
      name: 'Fish Processing Technology',
      icon: Award,
      description: 'Study of fish preservation, processing, and value addition technologies.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Processing Unit', 'Quality Control Lab', 'Cold Storage'],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'economics-statistics',
      name: 'Fisheries Economics & Statistics',
      icon: Calculator,
      description: 'Economic analysis of fisheries sector and statistical methods in fisheries research.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Computer Lab', 'Statistical Software', 'Research Units'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'extension',
      name: 'Fisheries Extension',
      icon: Users,
      description: 'Extension services, training programs, and technology transfer to fish farmers.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Extension Unit', 'Training Center', 'Demonstration Ponds'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'resource-management',
      name: 'Fisheries Resource Management',
      icon: BarChart3,
      description: 'Sustainable management of fisheries resources and conservation strategies.',
      courses: ['B.F.Sc.', 'M.F.Sc.', 'Ph.D.'],
      facilities: ['Resource Assessment Lab', 'GIS Facility', 'Conservation Units'],
      color: 'from-cyan-500 to-cyan-600'
    }
  ]

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
      <section className="bg-gradient-to-br from-blue-400 via-blue-500 to-green-400 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Departments</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our comprehensive range of departments dedicated to fisheries science, 
              aquaculture, and aquatic resource management
            </p>
          </div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Departments</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our departments offer cutting-edge education and research opportunities in various 
              aspects of fisheries science and aquaculture
            </p>
          </div>

          {/* Department Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <Card key={dept.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${dept.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Courses Offered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.courses.map((course) => (
                          <span key={course} className="px-2 py-1 bg-blue-100 text-primary-700 text-sm rounded">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Key Facilities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {dept.facilities.map((facility) => (
                          <li key={facility} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      to={`/departments#${dept.id}`}
                      className="inline-flex items-center text-blue-500 hover:text-primary-700 font-medium text-sm"
                    >
                      Learn More
                      <BookOpen className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Department Information */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Details</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get detailed information about each department's curriculum, research areas, and facilities
            </p>
          </div>

          {departments.map((dept) => (
            <div key={dept.id} id={dept.id} className="mb-16">
              <Card>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-20 h-20 rounded-lg bg-gradient-to-r ${dept.color} flex items-center justify-center mr-6`}>
                      <dept.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{dept.name}</h3>
                      <p className="text-lg text-gray-600 mt-2">{dept.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Academic Programs</h4>
                      <div className="space-y-3">
                        {dept.courses.map((course) => (
                          <div key={course} className="flex items-center p-3 bg-primary-50 rounded-lg">
                            <BookOpen className="w-5 h-5 text-blue-500 mr-3" />
                            <span className="font-medium text-gray-800">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">Research Areas</h4>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          The department focuses on cutting-edge research in {dept.name.toLowerCase()} 
                          with emphasis on practical applications and industry collaboration.
                        </p>
                        <p className="text-gray-700">
                          Students have opportunities to work on real-world projects and contribute 
                          to the advancement of fisheries science.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Facilities & Infrastructure</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dept.facilities.map((facility) => (
                        <div key={facility} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mb-2"></div>
                          <span className="text-gray-700 text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/programs"
                        className="btn-primary"
                      >
                        View Programs
                      </Link>
                      <Link
                        to="/faculty"
                        className="btn-outline"
                      >
                        Meet Our Faculty
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-blue-500 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Department?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our academic programs and discover the perfect department for your 
            fisheries science career
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="btn-accent"
            >
              Explore Programs
            </Link>
            
            <Link
              to="/contact"
              className="btn-outline border-white text-white hover:bg-white hover:text-blue-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Departments 






