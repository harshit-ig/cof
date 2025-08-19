<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FlaskConical, Users, Award, BookOpen, Globe, Microscope, Leaf, Fish, Building, ChevronRight, Calendar, MapPin, Phone, Mail } from 'lucide-react'
import Card from '../components/common/Card'

const Research = () => {
  const [activeTab, setActiveTab] = useState('areas')

  const researchAreas = [
    {
      title: 'Aquaculture & Fisheries',
      icon: Fish,
      description: 'Advanced research in sustainable aquaculture practices and fisheries management',
      projects: [
        'Sustainable fish farming techniques',
        'Integrated aquaculture systems',
        'Fish breeding and genetics',
        'Aquaculture nutrition and feed'
      ],
      facilities: [
        'Hatchery units',
        'Pond systems',
        'Feed analysis lab',
        'Water quality monitoring'
      ]
    },
    {
      title: 'Fish Health & Disease Management',
      icon: Microscope,
      description: 'Research on aquatic animal health, disease prevention, and treatment',
      projects: [
        'Disease diagnosis and prevention',
        'Vaccine development',
        'Pathogen identification',
        'Health monitoring systems'
      ],
      facilities: [
        'Pathology laboratory',
        'Microbiology lab',
        'Diagnostic equipment',
        'Quarantine facilities'
      ]
    },
    {
      title: 'Aquatic Environment & Ecology',
      icon: Globe,
      description: 'Study of aquatic ecosystems, water quality, and environmental impact',
      projects: [
        'Water quality assessment',
        'Ecosystem monitoring',
        'Environmental impact studies',
        'Climate change adaptation'
      ],
      facilities: [
        'Environmental lab',
        'GIS facilities',
        'Monitoring equipment',
        'Field research tools'
      ]
    },
    {
      title: 'Fish Processing & Technology',
      icon: Building,
      description: 'Research on fish preservation, processing, and value addition',
      projects: [
        'Processing technology development',
        'Quality control systems',
        'Value addition techniques',
        'Food safety protocols'
      ],
      facilities: [
        'Processing unit',
        'Quality control lab',
        'Cold storage facilities',
        'Packaging equipment'
      ]
    },
    {
      title: 'Fisheries Economics & Extension',
      icon: BookOpen,
      description: 'Research on economic aspects and extension services in fisheries',
      projects: [
        'Economic analysis of fisheries',
        'Market research studies',
        'Extension program evaluation',
        'Policy impact assessment'
      ],
      facilities: [
        'Computer lab',
        'Statistical software',
        'Survey tools',
        'Extension units'
      ]
    },
    {
      title: 'Biotechnology & Genetics',
      icon: FlaskConical,
      description: 'Application of biotechnological tools in fisheries science',
      projects: [
        'Genetic improvement programs',
        'Molecular biology research',
        'Biotechnology applications',
        'Breeding technology'
      ],
      facilities: [
        'Molecular biology lab',
        'Tissue culture facility',
        'PCR equipment',
        'Genetic analysis tools'
      ]
    }
  ]

  const ongoingProjects = [
    {
      title: 'Sustainable Aquaculture Development',
      principal: 'Dr. Rajesh Kumar',
      duration: '2023-2026',
      funding: 'ICAR',
      amount: '₹45 Lakhs',
      description: 'Development of sustainable aquaculture practices for small-scale farmers',
      status: 'In Progress',
      progress: 65
    },
    {
      title: 'Fish Disease Prevention Strategies',
      principal: 'Dr. Priya Sharma',
      duration: '2023-2025',
      funding: 'DBT',
      amount: '₹32 Lakhs',
      description: 'Research on preventive measures for common fish diseases',
      status: 'In Progress',
      progress: 45
    },
    {
      title: 'Water Quality Management',
      principal: 'Dr. Amit Patel',
      duration: '2024-2026',
      funding: 'MoEFCC',
      amount: '₹28 Lakhs',
      description: 'Study of water quality parameters in aquaculture systems',
      status: 'In Progress',
      progress: 25
    }
  ]

  const completedProjects = [
    {
      title: 'Integrated Fish Farming Systems',
      principal: 'Dr. Meera Singh',
      duration: '2020-2023',
      funding: 'ICAR',
      amount: '₹38 Lakhs',
      description: 'Development of integrated farming systems for better productivity',
      status: 'Completed',
      outcomes: [
        'Increased fish production by 40%',
        'Reduced feed costs by 25%',
        'Published 8 research papers',
        'Technology transferred to 50 farmers'
      ]
    },
    {
      title: 'Fish Feed Formulation',
      principal: 'Dr. Shashikant Mahajan',
      duration: '2019-2022',
      funding: 'DBT',
      amount: '₹42 Lakhs',
      description: 'Development of cost-effective fish feed using local ingredients',
      status: 'Completed',
      outcomes: [
        'Feed cost reduced by 30%',
        'Improved growth rates',
        'Published 6 research papers',
        'Commercialized feed formula'
      ]
    }
  ]

  const researchFacilities = [
    {
      name: 'Central Laboratory',
      description: 'State-of-the-art research laboratory with modern equipment',
      equipment: [
        'Spectrophotometers',
        'Microscopes',
        'Centrifuges',
        'Incubators',
        'Analytical balances'
      ]
    },
    {
      name: 'Aquaculture Research Unit',
      description: 'Dedicated facility for aquaculture research and experiments',
      equipment: [
        'Hatchery systems',
        'Pond facilities',
        'Water quality analyzers',
        'Feed processing units'
      ]
    },
    {
      name: 'Molecular Biology Lab',
      description: 'Advanced laboratory for genetic and molecular research',
      equipment: [
        'PCR machines',
        'Gel electrophoresis',
        'DNA sequencers',
        'Microscopes'
      ]
    },
    {
      name: 'Processing Technology Lab',
      description: 'Facility for fish processing and technology research',
      equipment: [
        'Processing equipment',
        'Quality testing tools',
        'Packaging machines',
        'Storage facilities'
      ]
    }
  ]

  const publications = [
    {
      title: 'Sustainable Aquaculture Practices in Eastern India',
      authors: 'Kumar, R., Sharma, P., Patel, A.',
      journal: 'Journal of Aquaculture Research',
      year: '2024',
      impact: '2.8'
    },
    {
      title: 'Disease Prevention in Freshwater Aquaculture',
      authors: 'Sharma, P., Singh, M., Kumar, R.',
      journal: 'Aquaculture Health Management',
      year: '2023',
      impact: '3.2'
    },
    {
      title: 'Water Quality Management in Fish Farms',
      authors: 'Patel, A., Kumar, R., Mahajan, S.',
      journal: 'Environmental Science & Technology',
      year: '2023',
      impact: '4.1'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research Projects</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Cutting-edge research in fisheries science, aquaculture, and aquatic resource management. 
              Discover our innovative projects and contributions to the field.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('areas')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'areas'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Research Areas
            </button>
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'ongoing'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ongoing Projects
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed Projects
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'facilities'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Research Facilities
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Anchors */}
      <div id="publications"></div>
      <div id="student-research"></div>
      <div id="collaborations"></div>
      <div id="facilities"></div>

      {/* Research Areas */}
      {activeTab === 'areas' && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Areas</h2>
              <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchAreas.map((area, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <area.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{area.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">{area.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Projects</h4>
                    <ul className="space-y-1">
                      {area.projects.map((project, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                    <ul className="space-y-1">
                      {area.facilities.map((facility, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <Building className="w-3 h-3 text-primary-600 mr-2" />
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ongoing Projects */}
      {activeTab === 'ongoing' && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ongoing Research Projects</h2>
              <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            </div>

            <div className="space-y-6">
              {ongoingProjects.map((project, index) => (
                <Card key={index} className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Principal Investigator</p>
                          <p className="font-semibold text-gray-900">{project.principal}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-900">{project.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Funding Agency</p>
                          <p className="font-semibold text-gray-900">{project.funding}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Project Amount</p>
                          <p className="font-semibold text-gray-900">{project.amount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold text-primary-600">{project.progress}%</span>
                        </div>
                        <p className="text-sm text-gray-600">Progress</p>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-800 font-medium text-center">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed Projects */}
      {activeTab === 'completed' && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Completed Research Projects</h2>
              <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            </div>

            <div className="space-y-6">
              {completedProjects.map((project, index) => (
                <Card key={index} className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Principal Investigator</p>
                          <p className="font-semibold text-gray-900">{project.principal}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-900">{project.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Funding Agency</p>
                          <p className="font-semibold text-gray-900">{project.funding}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Project Amount</p>
                          <p className="font-semibold text-gray-900">{project.amount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                        <p className="text-blue-800 font-medium text-center">{project.status}</p>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-3">Key Outcomes</h4>
                      <ul className="space-y-2">
                        {project.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <Award className="w-4 h-4 text-primary-600 mr-2" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Research Facilities */}
      {activeTab === 'facilities' && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Facilities</h2>
              <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {researchFacilities.map((facility, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.name}</h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>
                  
                  <h4 className="font-semibold text-gray-900 mb-3">Available Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {facility.equipment.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FlaskConical className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Publications</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{pub.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{pub.authors}</p>
                <p className="text-gray-700 mb-3">{pub.journal}, {pub.year}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Impact Factor: {pub.impact}</span>
                  <Link
                    to="/research#publications"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1 inline" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Research Collaboration?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in advancing fisheries science and aquaculture research. 
            Explore opportunities for collaboration and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Contact Us
            </Link>
            
            <Link
              to="/research#publications"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Publications
            </Link>
          </div>
        </div>
      </section>
>>>>>>> 41d7fb679926a7c665e36ecef449b8f21d657422
    </div>
  )
}

export default Research