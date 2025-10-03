import React from 'react'
import { Link } from 'react-router-dom'
import { Users2, Building2, Users, Target, Calendar, MapPin, ChevronRight, ExternalLink, Award, Globe } from 'lucide-react'
import Card from '../components/common/Card'

const Collaborations = () => {
  // MoUs & Implementations Data
  const mouImplementations = [
    {
      organization: "National Agricultural Cooperative Marketing Federation of India Ltd. (NAFED)",
      type: "Government Agency",
      category: "Marketing & Distribution",
      signedDate: "March 2023",
      duration: "5 Years",
      description: "Strategic partnership for marketing support, distribution networks, and procurement of fish products from college demonstration units and associated farmers.",
      objectives: [
        "Market linkage for fish products",
        "Price stabilization support",
        "Technical assistance in post-harvest management",
        "Training on cooperative marketing",
        "Quality certification support"
      ],
      activities: [
        "Monthly fish procurement drives",
        "Farmer training on quality standards",
        "Market price information dissemination",
        "Cooperative formation support",
        "Value chain development"
      ],
      outcomes: "₹15 lakh annual procurement, 200+ farmers benefited",
      contactPerson: "Dr. A.K. Sharma, Nodal Officer",
      status: "Active"
    },
    {
      organization: "National Fisheries Development Board (NFDB)",
      type: "Government Board",
      category: "Development & Funding",
      signedDate: "January 2022",
      duration: "Ongoing",
      description: "Comprehensive collaboration for fisheries development, infrastructure enhancement, capacity building, and technology demonstration projects.",
      objectives: [
        "Infrastructure development support",
        "Technology demonstration projects",
        "Capacity building programs",
        "Research collaboration",
        "Extension and outreach activities"
      ],
      activities: [
        "Biofloc demonstration units",
        "RAS technology transfer",
        "Farmer training programs",
        "Seed production enhancement",
        "Aquaculture extension services"
      ],
      outcomes: "₹2.5 crore funding received, 5 demonstration units established",
      contactPerson: "Prof. R.K. Mishra, Principal Investigator",
      status: "Active"
    },
    {
      organization: "Indian Council of Agricultural Research (ICAR)",
      type: "Research Council",
      category: "Research & Education",
      signedDate: "June 2021",
      duration: "Permanent",
      description: "Academic and research collaboration for student exchange, joint research projects, faculty development, and knowledge sharing in fisheries science.",
      objectives: [
        "Joint research initiatives",
        "Faculty exchange programs",
        "Student internship opportunities",
        "Resource sharing",
        "Publication collaborations"
      ],
      activities: [
        "Research project collaborations",
        "Faculty training programs",
        "Student placement support",
        "Library resource sharing",
        "Conference participations"
      ],
      outcomes: "15 joint research projects, 50+ student internships",
      contactPerson: "Dr. S.P. Singh, Research Coordinator",
      status: "Active"
    },
    {
      organization: "Madhya Pradesh State Fisheries Development Corporation",
      type: "State Corporation",
      category: "State Development",
      signedDate: "September 2023",
      duration: "3 Years",
      description: "State-level partnership for fisheries development, technology transfer, capacity building, and marketing support across Madhya Pradesh.",
      objectives: [
        "Statewide technology dissemination",
        "Farmer capacity building",
        "Market development support",
        "Policy implementation assistance",
        "Resource mobilization"
      ],
      activities: [
        "District-wise training programs",
        "Technology demonstration",
        "Market facilitation",
        "Policy advisory services",
        "Data collection and analysis"
      ],
      outcomes: "500+ farmers trained, 10 districts covered",
      contactPerson: "Dr. M.K. Patel, Extension Officer",
      status: "Active"
    },
    {
      organization: "Self Help Group Federation (MPSHGF)",
      type: "NGO Federation",
      category: "Rural Development",
      signedDate: "November 2022",
      duration: "4 Years",
      description: "Grassroots collaboration for women empowerment through fisheries, SHG capacity building, and livelihood enhancement programs.",
      objectives: [
        "Women empowerment through fisheries",
        "SHG capacity building",
        "Livelihood diversification",
        "Financial inclusion support",
        "Skill development programs"
      ],
      activities: [
        "Women-focused training programs",
        "SHG formation and strengthening",
        "Microfinance facilitation",
        "Value addition training",
        "Market linkage support"
      ],
      outcomes: "150 SHGs formed, 2000+ women trained",
      contactPerson: "Ms. Priya Sharma, Program Manager",
      status: "Active"
    },
    {
      organization: "WorldFish Center",
      type: "International NGO",
      category: "Global Partnership",
      signedDate: "May 2024",
      duration: "5 Years",
      description: "International collaboration for research excellence, student exchange, capacity building, and sustainable aquaculture development.",
      objectives: [
        "International research collaboration",
        "Student exchange programs",
        "Faculty development",
        "Technology transfer",
        "Global best practices adoption"
      ],
      activities: [
        "Joint research projects",
        "International internships",
        "Virtual conferences",
        "Publication collaborations",
        "Training material development"
      ],
      outcomes: "2 joint research projects initiated, 5 student exchanges",
      contactPerson: "Dr. Sarah Johnson, Country Representative",
      status: "Active"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Collaborations</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Strategic partnerships and collaborations with government agencies, research institutions, 
              industry leaders, and international organizations to advance fisheries education and development.
            </p>
          </div>
        </div>
      </section>



      {/* MoUs & Implementations */}
      <section id="mou-Implementations" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MoUs & Implementations</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Formal agreements and institutional implementations with government agencies, research organizations, 
              NGOs, and international bodies for collaborative development in fisheries sector.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mouImplementations.map((mou, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {mou.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {mou.type}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{mou.organization}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Category:</span>
                    <p className="text-gray-600">{mou.category}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Duration:</span>
                    <p className="text-gray-600">{mou.duration}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Signed:</span>
                    <p className="text-gray-600">{mou.signedDate}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Contact:</span>
                    <p className="text-gray-600">{mou.contactPerson}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{mou.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Objectives</h4>
                    <ul className="space-y-1">
                      {mou.objectives.slice(0, 3).map((objective, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Current Activities</h4>
                    <ul className="space-y-1">
                      {mou.activities.slice(0, 3).map((activity, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <ChevronRight className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1">Key Outcomes</h4>
                    <p className="text-sm text-green-800">{mou.outcomes}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* National Partnerships */}
      <section id="national-partnerships" className="section-padding bg-blue-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🤝 Our Collaborations & Partnerships
            </h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We are proud to collaborate with leading national organizations, research institutes, and development agencies 
              that play a vital role in advancing fisheries, aquaculture, and allied sectors. These partnerships strengthen 
              our programs, provide valuable expertise, and ensure effective implementation of initiatives.
            </p>
          </div>

          <div className="space-y-8">
            {/* Government Departments */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                Government Departments & Boards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Department of Fisheries (DOF)</h4>
                  <p className="text-sm text-gray-600">Central government department for fisheries policy and development</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">National Fisheries Development Board (NFDB)</h4>
                  <p className="text-sm text-gray-600">National board for fisheries development and infrastructure</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Pradhan Mantri Matsya Sampada Yojana (PMMSY)</h4>
                  <p className="text-sm text-gray-600">Flagship scheme for fisheries sector development</p>
                </div>
              </div>
            </Card>

            {/* ICAR Institutes */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 text-green-600 mr-3" />
                ICAR (Indian Council of Agricultural Research) & Institutes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CMFRI, Kochi, Kerala</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Marine Fisheries Research Institute</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Marine Research</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CIFRI, Barrackpore, West Bengal</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Inland Fisheries Research Institute</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Inland Fisheries</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CIFA, Bhubaneswar, Odisha</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Institute of Freshwater Aquaculture</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Freshwater Aquaculture</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CIBA, Chennai, Tamil Nadu</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Institute of Brackishwater Aquaculture</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Brackishwater</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CIFT, Cochin, Kerala</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Institute of Fisheries Technology</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Fisheries Technology</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-CIFE, Mumbai, Maharashtra</h4>
                    <p className="text-sm text-gray-600 mb-2">Central Institute of Fisheries Education (Deemed University)</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Education</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-NBFGR, Lucknow, Uttar Pradesh</h4>
                    <p className="text-sm text-gray-600 mb-2">National Bureau of Fish Genetic Resources</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Genetics</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-1">ICAR-DCFR, Bhimtal, Uttarakhand</h4>
                    <p className="text-sm text-gray-600 mb-2">Directorate of Coldwater Fisheries Research</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Coldwater</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Development & Extension */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-purple-600 mr-3" />
                Development & Extension Organizations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">MANAGE</h4>
                  <p className="text-sm text-gray-600">National Institute of Agricultural Extension Management</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">SFAC</h4>
                  <p className="text-sm text-gray-600">Small Farmers' Agribusiness Consortium</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-gray-900 mb-2">NERAMAC</h4>
                  <p className="text-sm text-gray-600">North Eastern Regional Agricultural Marketing Corporation</p>
                </div>
              </div>
            </Card>

            {/* Marketing & Export */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Globe className="w-6 h-6 text-orange-600 mr-3" />
                Marketing & Export Organizations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">MPEDA</h4>
                  <p className="text-sm text-gray-600 mb-2">Marine Products Export Development Authority</p>
                  <a href="#" className="text-xs text-orange-600 hover:text-orange-800 flex items-center">
                    Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">NAFED</h4>
                  <p className="text-sm text-gray-600">National Agricultural Cooperative Marketing Federation of India</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">NCDC</h4>
                  <p className="text-sm text-gray-600">National Cooperative Development Corporation</p>
                </div>
              </div>
            </Card>

            {/* Financial & Development */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 text-indigo-600 mr-3" />
                Financial & Rural Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Award className="w-5 h-5 text-indigo-600 mr-2" />
                    NABARD
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">National Bank for Agriculture and Rural Development</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div>• Rural development financing</div>
                    <div>• Agricultural infrastructure support</div>
                    <div>• Capacity building programs</div>
                  </div>
                </div>
                <div className="p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Users className="w-5 h-5 text-indigo-600 mr-2" />
                    Partner Benefits
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">Key advantages of our partnerships</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div>• Research collaboration opportunities</div>
                    <div>• Technology transfer programs</div>
                    <div>• Capacity building initiatives</div>
                    <div>• Market linkage support</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Collaboration Statistics */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Impact</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12+</h3>
              <p className="text-gray-600">Active MoUs & Agreements</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Industry Partners</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5000+</h3>
              <p className="text-gray-600">Farmers Benefited</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">8+</h3>
              <p className="text-gray-600">International Implementations</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collaborations






