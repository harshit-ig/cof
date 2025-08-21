import React from 'react'
import { Link } from 'react-router-dom'
import { FlaskConical, Users, Award, BookOpen, Globe, ChevronRight, Building, Fish, Microscope } from 'lucide-react'
import Card from '../components/common/Card'

const Research = () => {

  const ongoingProjects = [
    {
      title: 'Development of Sustainable Aquaculture Practices for Climate Resilience',
      principal: 'Dr. Rajesh Kumar',
      duration: '2023-2026',
      funding: 'ICAR',
      amount: '₹45 Lakhs',
      description: 'Research on climate-smart aquaculture technologies and practices to enhance resilience against climate change impacts in fisheries sector.',
      objectives: [
        'Develop climate-resilient aquaculture systems',
        'Study impact of climate change on fish production',
        'Design adaptation strategies for fish farmers'
      ]
    },
    {
      title: 'Integrated Fish Health Management in Freshwater Aquaculture',
      principal: 'Dr. Priya Sharma',
      duration: '2023-2025',
      funding: 'NFDB',
      amount: '₹32 Lakhs',
      description: 'Comprehensive study on fish disease prevention, diagnosis, and treatment strategies in freshwater aquaculture systems.',
      objectives: [
        'Develop early disease detection protocols',
        'Study immunology and vaccine development',
        'Create health monitoring systems'
      ]
    },
    {
      title: 'Evaluation of Alternative Protein Sources in Fish Feed',
      principal: 'Dr. Amit Patel',
      duration: '2024-2026',
      funding: 'PMMSY',
      amount: '₹28 Lakhs',
      description: 'Research on sustainable and cost-effective protein alternatives for fish feed formulation to reduce dependency on fishmeal.',
      objectives: [
        'Identify local protein sources',
        'Optimize feed formulations',
        'Assess growth performance and economics'
      ]
    },
    {
      title: 'Genetic Improvement of Native Fish Species',
      principal: 'Dr. Meera Singh',
      duration: '2024-2027',
      funding: 'DBT',
      amount: '₹38 Lakhs',
      description: 'Selective breeding and genetic enhancement programs for improving growth, disease resistance, and productivity of indigenous fish species.',
      objectives: [
        'Develop breeding protocols',
        'Study genetic diversity',
        'Enhance productivity traits'
      ]
    }
  ]

  const studentResearch = [
    {
      title: 'Water Quality Assessment in Aquaculture Ponds',
      student: 'Rakesh Sharma',
      degree: 'M.F.Sc',
      supervisor: 'Dr. Amit Patel',
      year: '2024',
      description: 'Comprehensive analysis of water quality parameters and their impact on fish health and productivity in different aquaculture systems.'
    },
    {
      title: 'Nutritional Evaluation of Local Feed Ingredients',
      student: 'Priya Verma',
      degree: 'M.F.Sc',
      supervisor: 'Dr. Rajesh Kumar',
      year: '2024',
      description: 'Study on the nutritional value and digestibility of locally available ingredients for sustainable fish feed formulation.'
    },
    {
      title: 'Disease Surveillance in Freshwater Fish Farms',
      student: 'Anil Kumar',
      degree: 'M.F.Sc',
      supervisor: 'Dr. Priya Sharma',
      year: '2023',
      description: 'Monitoring and identification of common diseases in freshwater aquaculture with focus on prevention and treatment strategies.'
    }
  ]

  const researchCollaborations = [
    {
      organization: 'Central Institute of Freshwater Aquaculture (CIFA)',
      location: 'Bhubaneswar',
      type: 'ICAR Institute',
      focus: 'Freshwater aquaculture research and technology development',
      activities: [
        'Joint research projects',
        'Faculty exchange programs',
        'Student training programs',
        'Technology transfer'
      ]
    },
    {
      organization: 'National Bureau of Fish Genetic Resources (NBFGR)',
      location: 'Lucknow',
      type: 'ICAR Institute',
      focus: 'Fish genetic resources and biodiversity conservation',
      activities: [
        'Genetic improvement programs',
        'Biodiversity assessment',
        'Germplasm conservation',
        'Molecular research'
      ]
    },
    {
      organization: 'Central Inland Fisheries Research Institute (CIFRI)',
      location: 'Barrackpore',
      type: 'ICAR Institute',
      focus: 'Inland fisheries research and development',
      activities: [
        'Fisheries enhancement',
        'Stock assessment',
        'Environmental studies',
        'Capacity building'
      ]
    },
    {
      organization: 'State Fisheries Departments',
      location: 'Madhya Pradesh & Neighboring States',
      type: 'Government Partnership',
      focus: 'Field implementation and extension services',
      activities: [
        'Technology demonstration',
        'Farmer training programs',
        'Policy support',
        'Field trials'
      ]
    }
  ]

  const researchFacilities = [
    {
      name: 'Central Research Laboratory',
      description: 'State-of-the-art multi-disciplinary research facility with modern analytical instruments',
      equipment: [
        'Spectrophotometers (UV-Vis, AAS)',
        'High-resolution microscopes',
        'Centrifuges and incubators',
        'Analytical balances',
        'pH meters and dissolved oxygen meters'
      ],
      area: '500 sq.m'
    },
    {
      name: 'Aquaculture Research Unit',
      description: 'Dedicated facility for practical aquaculture research and demonstration',
      equipment: [
        'Hatchery and nursery systems',
        'Experimental pond facilities',
        'Water quality monitoring equipment',
        'Feed processing unit',
        'Aeration systems'
      ],
      area: '2 hectares'
    },
    {
      name: 'Fish Health Laboratory',
      description: 'Specialized laboratory for fish disease diagnosis and health monitoring',
      equipment: [
        'Pathology and histology equipment',
        'Microbiology culture facilities',
        'Diagnostic kits and reagents',
        'Quarantine facilities',
        'Microscopy and imaging systems'
      ],
      area: '200 sq.m'
    },
    {
      name: 'Molecular Biology Laboratory',
      description: 'Advanced facility for genetic and molecular research in fisheries',
      equipment: [
        'PCR machines (conventional and real-time)',
        'Gel electrophoresis systems',
        'DNA/RNA extraction equipment',
        'Sequencing facilities',
        'Tissue culture setup'
      ],
      area: '150 sq.m'
    },
    {
      name: 'Processing Technology Lab',
      description: 'Research facility for fish processing, preservation, and value addition',
      equipment: [
        'Fish processing equipment',
        'Quality analysis instruments',
        'Packaging machines',
        'Cold storage facilities',
        'Sensory evaluation setup'
      ],
      area: '300 sq.m'
    }
  ]

  const publications = [
    {
      title: 'Climate Change Adaptation Strategies in Freshwater Aquaculture',
      authors: 'Kumar, R., Sharma, P., Patel, A.',
      journal: 'Aquaculture Research',
      year: '2024',
      impact: '3.2',
      type: 'Research Article'
    },
    {
      title: 'Sustainable Fish Feed Formulation Using Local Ingredients',
      authors: 'Patel, A., Singh, M., Kumar, R.',
      journal: 'Journal of Applied Aquaculture',
      year: '2024',
      impact: '2.8',
      type: 'Research Article'
    },
    {
      title: 'Disease Management in Indian Major Carps: A Review',
      authors: 'Sharma, P., Kumar, R., Verma, S.',
      journal: 'Fish & Shellfish Immunology',
      year: '2023',
      impact: '4.1',
      type: 'Review Article'
    },
    {
      title: 'Genetic Diversity Assessment of Indigenous Fish Species',
      authors: 'Singh, M., Patel, A., Kumar, R.',
      journal: 'Conservation Genetics',
      year: '2023',
      impact: '3.5',
      type: 'Research Article'
    },
    {
      title: 'Water Quality Management in Intensive Aquaculture Systems',
      authors: 'Patel, A., Sharma, P., Singh, M.',
      journal: 'Aquacultural Engineering',
      year: '2023',
      impact: '2.9',
      type: 'Research Article'
    },
    {
      title: 'Economics of Small-scale Fish Farming in Central India',
      authors: 'Kumar, R., Patel, A., Sharma, P.',
      journal: 'Aquaculture Economics & Management',
      year: '2022',
      impact: '2.3',
      type: 'Research Article'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Research & Innovation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Advancing fisheries science through cutting-edge research, innovative projects, and collaborative partnerships 
              for sustainable aquaculture development.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding bg-white border-b">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#ongoing-projects" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Ongoing Projects
            </a>
            <a href="#publications" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Publications & Journals
            </a>
            <a href="#student-research" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Student Research
            </a>
            <a href="#collaborations" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Research Collaborations
            </a>
            <a href="#facilities" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Research Facilities
            </a>
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section id="ongoing-projects" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ongoing Projects (ICAR, NFDB, PMMSY, etc.)</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our current research projects funded by premier agencies focusing on sustainable aquaculture, 
              fish health management, and technology development.
            </p>
          </div>

          <div className="space-y-8">
            {ongoingProjects.map((project, index) => (
              <Card key={index} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Objectives</h4>
                      <ul className="space-y-2">
                        {project.objectives.map((objective, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                      <FlaskConical className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium">Active Research</p>
                      <p className="text-green-600 text-sm">In Progress</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Publications and Journals */}
      <section id="publications" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publications and Journals</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Research publications by our faculty and students in peer-reviewed journals, 
              contributing to the advancement of fisheries science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{pub.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{pub.authors}</p>
                <p className="text-gray-700 mb-3">{pub.journal}, {pub.year}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{pub.type}</span>
                  <span className="text-sm text-gray-500">IF: {pub.impact}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <Link
                    to="/research"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Research */}
      <section id="student-research" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Research</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Graduate student research projects contributing to fisheries science knowledge and 
              practical solutions for the aquaculture industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentResearch.map((research, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{research.title}</h3>
                <p className="text-gray-600 mb-4">{research.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Student:</span>
                    <span className="text-sm font-medium text-gray-900">{research.student}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Degree:</span>
                    <span className="text-sm font-medium text-gray-900">{research.degree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Supervisor:</span>
                    <span className="text-sm font-medium text-gray-900">{research.supervisor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year:</span>
                    <span className="text-sm font-medium text-gray-900">{research.year}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Collaborations */}
      <section id="collaborations" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Collaborations</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategic partnerships with leading research institutions and organizations 
              for collaborative research and knowledge exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchCollaborations.map((collab, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{collab.organization}</h3>
                    <p className="text-gray-600 text-sm mb-1">{collab.location}</p>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded">{collab.type}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{collab.focus}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Collaboration Activities</h4>
                  <ul className="space-y-2">
                    {collab.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-primary-600 mr-2" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Facilities */}
      <section id="facilities" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Facilities</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art research infrastructure and facilities supporting diverse 
              research activities in fisheries and aquaculture sciences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchFacilities.map((facility, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{facility.name}</h3>
                    <p className="text-gray-600 text-sm">{facility.area}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{facility.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Equipment & Facilities</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {facility.equipment.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Microscope className="w-4 h-4 text-primary-600" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore opportunities for research collaboration, student projects, and innovation 
            in fisheries science and sustainable aquaculture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Contact Research Office
            </Link>
            
            <Link
              to="/faculty"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Meet Our Researchers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Research