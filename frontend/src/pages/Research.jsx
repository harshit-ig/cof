import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Award, Building, FileText, Calendar, MapPin, Phone, Mail } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Research = () => {
  const [researchProjects, setResearchProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample research data based on reference site
  const researchData = {
    ongoingProjects: [
      {
        id: 1,
        title: 'Development of Sustainable Feed for Freshwater Fish',
        description: 'This project focuses on developing cost-effective and environmentally sustainable fish feed using local agricultural waste and by-products.',
        type: 'ICAR Funded Project',
        status: 'Ongoing',
        principalInvestigator: 'Dr. Rajesh Kumar Sharma',
        coInvestigators: ['Dr. Priya Verma', 'Dr. Anil Kumar Jain'],
        fundingAgency: 'Department of Science & Technology, Government of India',
        budget: '₹15,00,000',
        duration: '2023-2026',
        department: 'Fisheries Science',
        objectives: [
          'Develop sustainable fish feed formulations',
          'Evaluate nutritional quality and growth performance',
          'Assess environmental impact and cost-effectiveness'
        ],
        expectedOutcomes: [
          'Novel sustainable feed formulations',
          'Improved growth rates in fish',
          'Reduced environmental impact'
        ]
      },
      {
        id: 2,
        title: 'Water Quality Management in Aquaculture Systems',
        description: 'Research on optimal water quality parameters and management strategies for different aquaculture systems in the central India region.',
        type: 'NFDB Project',
        status: 'Ongoing',
        principalInvestigator: 'Dr. Anil Kumar Jain',
        coInvestigators: ['Dr. Rajesh Kumar Sharma'],
        fundingAgency: 'National Fisheries Development Board',
        budget: '₹8,00,000',
        duration: '2023-2025',
        department: 'Aquaculture',
        objectives: [
          'Study water quality parameters',
          'Develop management protocols',
          'Evaluate impact on fish health'
        ],
        expectedOutcomes: [
          'Water quality management protocols',
          'Improved fish health monitoring',
          'Enhanced aquaculture productivity'
        ]
      },
      {
        id: 3,
        title: 'PMMSY: Fish Seed Production and Distribution',
        description: 'Under Pradhan Mantri Matsya Sampada Yojana, focusing on quality fish seed production and distribution to farmers.',
        type: 'PMMSY Project',
        status: 'Ongoing',
        principalInvestigator: 'Dr. Priya Verma',
        coInvestigators: ['Dr. Rajesh Kumar Sharma'],
        fundingAgency: 'Ministry of Fisheries, Animal Husbandry & Dairying',
        budget: '₹25,00,000',
        duration: '2022-2025',
        department: 'Fish Breeding & Genetics',
        objectives: [
          'Quality fish seed production',
          'Farmer training and capacity building',
          'Technology transfer and extension'
        ],
        expectedOutcomes: [
          'Increased fish seed availability',
          'Improved farmer income',
          'Enhanced aquaculture adoption'
        ]
      }
    ],
    publications: [
      {
        id: 1,
        title: 'Sustainable Aquaculture Practices in India',
        authors: 'Dr. Rajesh Kumar Sharma, Dr. Priya Verma',
        journal: 'Journal of Aquaculture Research',
        year: 2023,
        impactFactor: '2.8',
        doi: '10.1000/example.2023.001',
        abstract: 'Comprehensive study on sustainable aquaculture practices and their implementation in Indian context.'
      },
      {
        id: 2,
        title: 'Water Quality Parameters for Freshwater Aquaculture',
        authors: 'Dr. Anil Kumar Jain, Dr. Rajesh Kumar Sharma',
        journal: 'Aquaculture International',
        year: 2023,
        impactFactor: '3.2',
        doi: '10.1000/example.2023.002',
        abstract: 'Analysis of critical water quality parameters affecting freshwater aquaculture systems.'
      },
      {
        id: 3,
        title: 'Fish Nutrition and Feed Technology Advances',
        authors: 'Dr. Priya Verma, Dr. Anil Kumar Jain',
        journal: 'Fisheries Science',
        year: 2022,
        impactFactor: '2.5',
        doi: '10.1000/example.2022.001',
        abstract: 'Recent advances in fish nutrition and feed technology for sustainable aquaculture.'
      }
    ],
    studentResearch: [
      {
        id: 1,
        title: 'Eco-friendly Fish Feed Development',
        student: 'Rahul Patel',
        supervisor: 'Dr. Rajesh Kumar Sharma',
        year: 2024,
        status: 'Completed',
        description: 'Development of eco-friendly fish feed using agricultural waste products.',
        awards: ['National Innovation Award', 'Best Student Project']
      },
      {
        id: 2,
        title: 'Water Quality Monitoring System',
        student: 'Priya Singh',
        supervisor: 'Dr. Anil Kumar Jain',
        year: 2024,
        status: 'Ongoing',
        description: 'IoT-based water quality monitoring system for aquaculture ponds.',
        awards: ['University Merit Award']
      }
    ],
    researchFacilities: [
      {
        id: 1,
        name: 'Aquaculture Research Laboratory',
        description: 'Modern laboratory equipped with advanced instruments for water quality analysis, fish health monitoring, and feed analysis.',
        equipment: [
          'Water quality testing equipment',
          'Microscopes and imaging systems',
          'Feed analysis instruments',
          'Fish health monitoring tools'
        ],
        incharge: 'Dr. Anil Kumar Jain',
        contact: '+91 761 2345681',
        email: 'lab@fisherycollegejabalpur.edu.in'
      },
      {
        id: 2,
        name: 'Fish Hatchery Unit',
        description: 'Commercial scale fish hatchery for breeding and production of fish seed for research and commercial purposes.',
        equipment: [
          'Breeding pools',
          'Nursery tanks',
          'Water circulation system',
          'Temperature control system'
        ],
        incharge: 'Mr. Suresh Kumar',
        contact: '+91 761 2345682',
        email: 'hatchery@fisherycollegejabalpur.edu.in'
      },
      {
        id: 3,
        name: 'Feed Technology Laboratory',
        description: 'Specialized laboratory for fish feed formulation, analysis, and quality testing.',
        equipment: [
          'Feed formulation equipment',
          'Nutritional analysis tools',
          'Quality testing instruments',
          'Storage and preservation facilities'
        ],
        incharge: 'Dr. Priya Verma',
        contact: '+91 761 2345679',
        email: 'feedlab@fisherycollegejabalpur.edu.in'
      }
    ]
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setResearchProjects(researchData.ongoingProjects)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Research Projects"
          subtitle="Explore ongoing research projects, publications, student research, collaborations, and research facilities."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading research information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Ongoing Research Projects */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                Ongoing Research Projects
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {researchData.ongoingProjects.map((project) => (
                  <Card key={project.id} className="h-full">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Ongoing' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Type:</span>
                          <span className="text-gray-600 ml-2">{project.type}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Principal Investigator:</span>
                          <span className="text-gray-600 ml-2">{project.principalInvestigator}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Funding Agency:</span>
                          <span className="text-gray-600 ml-2">{project.fundingAgency}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Budget:</span>
                          <span className="text-gray-600 ml-2">{project.budget}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{project.duration}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-700 mb-2">Objectives:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {project.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 text-green-600 mr-2" />
                Publications
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {researchData.publications.map((pub) => (
                  <Card key={pub.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-semibold">Authors:</span> {pub.authors}</p>
                        <p><span className="font-semibold">Journal:</span> {pub.journal}</p>
                        <p><span className="font-semibold">Year:</span> {pub.year}</p>
                        <p><span className="font-semibold">Impact Factor:</span> {pub.impactFactor}</p>
                        <p><span className="font-semibold">DOI:</span> <span className="text-blue-600">{pub.doi}</span></p>
                      </div>
                      <p className="text-sm text-gray-700 mt-3 italic">{pub.abstract}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Student Research */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                Student Research
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {researchData.studentResearch.map((research) => (
                  <Card key={research.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{research.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-semibold">Student:</span> {research.student}</p>
                        <p><span className="font-semibold">Supervisor:</span> {research.supervisor}</p>
                        <p><span className="font-semibold">Year:</span> {research.year}</p>
                        <p><span className="font-semibold">Status:</span> 
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            research.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {research.status}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">{research.description}</p>
                      {research.awards.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-700 mb-2">Awards:</h4>
                          <div className="flex flex-wrap gap-2">
                            {research.awards.map((award, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                {award}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Research Facilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-orange-600 mr-2" />
                Research Facilities
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {researchData.researchFacilities.map((facility) => (
                  <Card key={facility.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{facility.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Equipment:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {facility.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{facility.incharge}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{facility.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{facility.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}

export default Research