import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Building, FileText, Users, Award } from 'lucide-react'
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

  const programsOffered = [
    {
      title: 'Bachelor of Fisheries Science (B.F.Sc.)',
      duration: '4 Years (8 Semesters)',
      seats: 30,
      eligibility: 'Passed 10+2 with Physics, Chemistry, Biology/Mathematics with minimum 50% marks',
      description: 'Comprehensive undergraduate program covering all aspects of fisheries science, aquaculture, and fisheries management.',
      subjects: [
        'Aquaculture Engineering',
        'Fish Nutrition and Feed Technology',
        'Fisheries Resource Management',
        'Aquatic Environment Management',
        'Fish Processing Technology',
        'Fisheries Economics and Statistics'
      ]
    },
    {
      title: 'Master of Fisheries Science (M.F.Sc.)',
      duration: '2 Years (4 Semesters)',
      seats: 15,
      eligibility: 'Bachelor\'s degree in Fisheries Science or related field with minimum 60% marks',
      description: 'Advanced postgraduate program with specialization in various fields of fisheries science.',
      subjects: [
        'Advanced Aquaculture',
        'Fisheries Biotechnology',
        'Aquatic Animal Health Management',
        'Research Methodology',
        'Fisheries Development and Extension',
        'Dissertation Research'
      ]
    }
  ]

  const academicCalendar = [
    {
      event: 'Admission Process Begins',
      date: '2025-06-01',
      description: 'Online application process starts for new academic year'
    },
    {
      event: 'Classes Begin',
      date: '2025-07-15',
      description: 'First semester classes commence'
    },
    {
      event: 'Mid-Semester Examination',
      date: '2025-09-15',
      description: 'Mid-semester examinations for all semesters'
    },
    {
      event: 'Semester Break',
      date: '2025-10-20',
      description: 'Two-week semester break'
    },
    {
      event: 'Final Examinations',
      date: '2025-12-10',
      description: 'Final examinations for odd semesters'
    },
    {
      event: 'Winter Break',
      date: '2025-12-25',
      description: 'Winter vacation period'
    }
  ]

  const departments = [
    {
      name: 'Aquaculture',
      head: 'Dr. [Faculty Name]',
      description: 'Covers fish culture, breeding, and production techniques',
      specializations: ['Fish Breeding', 'Aquaculture Systems', 'Water Quality Management']
    },
    {
      name: 'Fisheries Resource Management',
      head: 'Dr. [Faculty Name]',
      description: 'Focuses on sustainable fisheries and resource conservation',
      specializations: ['Stock Assessment', 'Fisheries Policy', 'Marine Fisheries']
    },
    {
      name: 'Fish Processing Technology',
      head: 'Dr. [Faculty Name]',
      description: 'Food technology and value addition in fisheries',
      specializations: ['Fish Processing', 'Quality Control', 'Product Development']
    },
    {
      name: 'Aquatic Environment Management',
      head: 'Dr. [Faculty Name]',
      description: 'Environmental aspects of aquatic ecosystems',
      specializations: ['Water Pollution', 'Ecosystem Management', 'Environmental Monitoring']
    }
  ]

  const academicRegulations = [
    {
      title: 'Attendance Requirements',
      description: 'Students must maintain minimum 75% attendance in each subject to be eligible for examinations.',
      details: [
        'Regular attendance is mandatory for all theory and practical classes',
        'Medical certificates required for extended absence',
        'Condonation of shortage available in exceptional cases'
      ]
    },
    {
      title: 'Examination Rules',
      description: 'Guidelines for conduct of examinations and assessment procedures.',
      details: [
        'Mid-semester examination carries 30% weightage',
        'Final examination carries 70% weightage',
        'Minimum 40% marks required in each subject to pass',
        'Re-examination facility available for failed students'
      ]
    },
    {
      title: 'Grading System',
      description: 'Credit-based grading system as per university norms.',
      details: [
        'Letter grades from A+ to F based on percentage',
        'CGPA calculation on 10-point scale',
        'Grade sheets issued after each semester',
        'Transcript available on completion of degree'
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                Government of Madhya Pradesh
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academics</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive academic programs and information for students at College of Fisheries, Jabalpur
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('programs')}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Programs Offered
            </button>
            <button
              onClick={() => scrollToSection('calendar')}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              Academic Calendar
            </button>
            <button
              onClick={() => scrollToSection('departments')}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Departments
            </button>
            <button
              onClick={() => scrollToSection('curriculum')}
              className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              Course Curriculum
            </button>
            <button
              onClick={() => scrollToSection('faculty')}
              className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              Faculty Directory
            </button>
            <button
              onClick={() => scrollToSection('regulations')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Academic Regulations
            </button>
          </div>
        </div>
      </section>

      {/* Programs Offered */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Programs Offered</h2>
            <div className="w-20 h-1 bg-blue-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programsOffered.map((program, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                    <p className="text-blue-600 font-medium">{program.duration}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {program.seats} Seats Available
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{program.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                  <p className="text-gray-600 text-sm">{program.eligibility}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Subjects:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {program.subjects.slice(0, 4).map((subject, idx) => (
                      <div key={idx} className="text-gray-600 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {subject}
                      </div>
                    ))}
                  </div>
                  {program.subjects.length > 4 && (
                    <p className="text-gray-500 text-sm mt-2">+ {program.subjects.length - 4} more subjects</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section id="calendar" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
            <div className="w-20 h-1 bg-green-500 rounded mx-auto"></div>
          </div>
          
          <Card className="overflow-hidden">
            <div className="px-6 py-4 bg-green-600 text-white">
              <h3 className="text-lg font-semibold">Academic Calendar 2025-26</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {academicCalendar.map((event, idx) => (
                <div key={idx} className="p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{event.event}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Departments</h2>
            <div className="w-20 h-1 bg-purple-500 rounded mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-purple-600 font-medium">Head: {dept.head}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{dept.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                  <div className="space-y-1">
                    {dept.specializations.map((spec, idx) => (
                      <div key={idx} className="text-gray-600 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section id="curriculum" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
            <div className="w-20 h-1 bg-yellow-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Curriculum Details</h3>
              <p className="text-gray-700 mb-6">
                Detailed curriculum for B.F.Sc and M.F.Sc programs including semester-wise course structure, 
                credit distribution, and practical components will be available in the student handbook.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/programs"
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  View Detailed Programs
                </Link>
                <a
                  href="#"
                  className="px-6 py-3 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  Download Syllabus
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Faculty Directory */}
      <section id="faculty" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty Directory</h2>
            <div className="w-20 h-1 bg-red-500 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Faculty Members</h3>
              <p className="text-gray-700 mb-6">
                Our college has highly qualified and experienced faculty members specializing in various fields 
                of fisheries science. Detailed faculty profiles with their qualifications, research interests, 
                and publications are available on the faculty page.
              </p>
              <Link
                to="/faculty"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                View Faculty Profiles
                <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Regulations */}
      <section id="regulations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Regulations</h2>
            <div className="w-20 h-1 bg-gray-500 rounded mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {academicRegulations.map((regulation, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{regulation.title}</h3>
                <p className="text-gray-600 mb-4">{regulation.description}</p>
                <ul className="space-y-2">
                  {regulation.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Academics
