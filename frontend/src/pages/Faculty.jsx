import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Award, BookOpen, Mail, Phone, MapPin, Globe, ChevronRight, Filter, Search, Building, Microscope, Fish, FlaskConical, Calculator, Leaf, Globe2, Shield, GraduationCap } from 'lucide-react'
import Card from '../components/common/Card'

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDesignation, setSelectedDesignation] = useState('all')

  const departments = [
    { id: 'all', name: 'All Departments', icon: Building },
    { id: 'aquaculture', name: 'Aquaculture', icon: Fish },
    { id: 'fish-health', name: 'Fish Health Management', icon: Microscope },
    { id: 'processing', name: 'Fish Processing Technology', icon: Building },
    { id: 'extension', name: 'Fisheries Extension', icon: Globe },
    { id: 'biotechnology', name: 'Fish Biotechnology', icon: FlaskConical },
    { id: 'economics', name: 'Fisheries Economics', icon: Calculator },
    { id: 'environment', name: 'Aquatic Environment', icon: Leaf }
  ]

  const designations = [
    { id: 'all', name: 'All Designations' },
    { id: 'dean', name: 'Dean' },
    { id: 'professor', name: 'Professor' },
    { id: 'associate-professor', name: 'Associate Professor' },
    { id: 'assistant-professor', name: 'Assistant Professor' },
    { id: 'lecturer', name: 'Lecturer' }
  ]

  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. Shashikant Mahajan',
      designation: 'Dean',
      department: 'Administration',
      qualification: 'Ph.D. in Fisheries Science',
      specialization: 'Aquaculture & Fisheries Management',
      experience: '15+ years',
      email: 'deancof_basu_bih@gov.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://www.ndvsu.org/images/Shashikant.jpg',
      research: [
        'Sustainable aquaculture practices',
        'Fisheries resource management',
        'Aquaculture economics',
        'Extension services'
      ],
      publications: 25,
      projects: 8,
      awards: ['Best Researcher Award 2023', 'ICAR Recognition 2022'],
      expertise: ['Aquaculture Systems', 'Fisheries Management', 'Research Methodology']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor',
      department: 'Aquaculture',
      qualification: 'Ph.D. in Aquaculture',
      specialization: 'Fish Breeding & Genetics',
      experience: '12+ years',
      email: 'rajesh.kumar@cofbasu.edu.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://via.placeholder.com/300x400?text=Dr.+Rajesh+Kumar',
      research: [
        'Fish breeding techniques',
        'Genetic improvement',
        'Hatchery management',
        'Seed production'
      ],
      publications: 18,
      projects: 6,
      awards: ['Excellence in Teaching 2023', 'Research Innovation Award 2021'],
      expertise: ['Fish Breeding', 'Genetics', 'Hatchery Technology']
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      designation: 'Associate Professor',
      department: 'Fish Health Management',
      qualification: 'Ph.D. in Fish Pathology',
      specialization: 'Aquatic Animal Health',
      experience: '10+ years',
      email: 'priya.sharma@cofbasu.edu.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://via.placeholder.com/300x400?text=Dr.+Priya+Sharma',
      research: [
        'Fish disease diagnosis',
        'Preventive health measures',
        'Vaccine development',
        'Pathogen identification'
      ],
      publications: 22,
      projects: 5,
      awards: ['Young Scientist Award 2022', 'Best Paper Award 2023'],
      expertise: ['Fish Pathology', 'Disease Management', 'Laboratory Diagnostics']
    },
    {
      id: 4,
      name: 'Dr. Amit Patel',
      designation: 'Assistant Professor',
      department: 'Fish Processing Technology',
      qualification: 'Ph.D. in Food Technology',
      specialization: 'Fish Processing & Preservation',
      experience: '8+ years',
      email: 'amit.patel@cofbasu.edu.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://via.placeholder.com/300x400?text=Dr.+Amit+Patel',
      research: [
        'Processing technology',
        'Quality control',
        'Value addition',
        'Food safety'
      ],
      publications: 15,
      projects: 4,
      awards: ['Innovation Award 2023', 'Best Teacher Award 2022'],
      expertise: ['Food Processing', 'Quality Control', 'Technology Transfer']
    },
    {
      id: 5,
      name: 'Dr. Meera Singh',
      designation: 'Assistant Professor',
      department: 'Fisheries Extension',
      qualification: 'Ph.D. in Extension Education',
      specialization: 'Rural Development & Extension',
      experience: '7+ years',
      email: 'meera.singh@cofbasu.edu.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://via.placeholder.com/300x400?text=Dr.+Meera+Singh',
      research: [
        'Extension methodologies',
        'Rural development',
        'Technology transfer',
        'Farmer training'
      ],
      publications: 12,
      projects: 3,
      awards: ['Extension Excellence Award 2023', 'Community Service Award 2022'],
      expertise: ['Extension Education', 'Rural Development', 'Training Methods']
    },
    {
      id: 6,
      name: 'Dr. Sanjay Verma',
      designation: 'Lecturer',
      department: 'Aquatic Environment',
      qualification: 'M.F.Sc. in Aquatic Environment',
      specialization: 'Water Quality Management',
      experience: '5+ years',
      email: 'sanjay.verma@cofbasu.edu.in',
      phone: '0645-231375',
      image: '/api/proxy/image?url=https://via.placeholder.com/300x400?text=Dr.+Sanjay+Verma',
      research: [
        'Water quality assessment',
        'Environmental monitoring',
        'Pollution control',
        'Ecosystem management'
      ],
      publications: 8,
      projects: 2,
      awards: ['Best Young Faculty 2023'],
      expertise: ['Environmental Science', 'Water Quality', 'Monitoring Systems']
    }
  ]

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || faculty.department.toLowerCase().includes(selectedDepartment)
    const matchesDesignation = selectedDesignation === 'all' || faculty.designation.toLowerCase().includes(selectedDesignation.replace('-', ' '))
    
    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const stats = {
    totalFaculty: facultyMembers.length,
    professors: facultyMembers.filter(f => f.designation === 'Professor').length,
    associateProfessors: facultyMembers.filter(f => f.designation === 'Associate Professor').length,
    assistantProfessors: facultyMembers.filter(f => f.designation === 'Assistant Professor').length,
    totalPublications: facultyMembers.reduce((sum, f) => sum + f.publications, 0),
    totalProjects: facultyMembers.reduce((sum, f) => sum + f.projects, 0)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Teaching Faculty</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet our distinguished faculty members who are experts in fisheries science, 
              aquaculture, and related fields, dedicated to excellence in teaching and research.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Statistics */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFaculty}</p>
              <p className="text-sm text-gray-600">Total Faculty</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 text-secondary-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.professors}</p>
              <p className="text-sm text-gray-600">Professors</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-accent-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPublications}</p>
              <p className="text-sm text-gray-600">Publications</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.associateProfessors}</p>
              <p className="text-sm text-gray-600">Associate Prof.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.assistantProfessors}</p>
              <p className="text-sm text-gray-600">Assistant Prof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              {/* Designation Filter */}
              <div>
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {designations.map(designation => (
                    <option key={designation.id} value={designation.id}>{designation.name}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('all')
                  setSelectedDesignation('all')
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((faculty) => (
              <Card key={faculty.id} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-32 h-40 object-cover rounded-lg mx-auto mb-4 shadow-md"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                  <p className="text-primary-600 font-medium mb-1">{faculty.designation}</p>
                  <p className="text-gray-600 text-sm">{faculty.department}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Qualification & Experience</h4>
                    <p className="text-gray-700 text-sm mb-1">{faculty.qualification}</p>
                    <p className="text-gray-600 text-sm">Experience: {faculty.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specialization</h4>
                    <p className="text-gray-700 text-sm">{faculty.specialization}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Research Areas</h4>
                    <ul className="space-y-1">
                      {faculty.research.slice(0, 3).map((area, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      <p className="text-lg font-bold text-primary-600">{faculty.publications}</p>
                      <p className="text-xs text-gray-600">Publications</p>
                    </div>
                    <div className="p-3 bg-secondary-50 rounded-lg">
                      <p className="text-lg font-bold text-secondary-600">{faculty.projects}</p>
                      <p className="text-xs text-gray-600">Projects</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to={`/faculty/${faculty.id}`}
                      className="btn-primary w-full text-center"
                    >
                      View Profile
                      <ChevronRight className="w-4 h-4 ml-2 inline" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No faculty found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDepartment('all')
                  setSelectedDesignation('all')
                }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Faculty</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. 
            Explore opportunities to contribute to fisheries education and research.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Contact Us
            </Link>
            
            <Link
              to="/about"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faculty