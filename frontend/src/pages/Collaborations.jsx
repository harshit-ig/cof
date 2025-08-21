<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import { Users2, Building2, Users, Target, Calendar, MapPin, ChevronRight, ExternalLink, Award, Globe } from 'lucide-react'
import Card from '../components/common/Card'

const Collaborations = () => {
  // MoUs & Linkages Data
  const mouLinkages = [
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

  // Industry Partnerships Data
  const industryPartnerships = [
    {
      company: "Godrej Agrovet Limited",
      sector: "Aquaculture Feed & Nutrition",
      partnership: "Technology & Training",
      since: "2022",
      description: "Strategic partnership for fish feed development, nutrition research, feed quality testing, and farmer training on modern feeding practices.",
      collaboration: [
        "Feed formulation research",
        "Quality testing services",
        "Farmer training programs",
        "Technical support services",
        "Product development initiatives"
      ],
      benefits: [
        "Access to latest feed technologies",
        "Student internship opportunities",
        "Research funding support",
        "Technical expertise sharing",
        "Market ready product development"
      ],
      achievements: "3 new feed formulations, 200+ farmers trained",
      projects: ["Cost-effective feed development", "Nutritional requirement studies", "Feed conversion efficiency trials"],
      contactInfo: "Mr. Rajesh Kumar, Regional Manager"
    },
    {
      company: "Avanti Feeds Limited",
      sector: "Aqua Feed Manufacturing",
      partnership: "Research & Development",
      since: "2023",
      description: "Collaborative partnership focusing on innovative feed solutions, research support, technology transfer, and industry-ready skill development.",
      collaboration: [
        "Research and development projects",
        "Technology transfer programs",
        "Student placement support",
        "Faculty industry exposure",
        "Joint patent applications"
      ],
      benefits: [
        "Industry exposure for students",
        "Research grant support",
        "Employment opportunities",
        "Technical infrastructure access",
        "Commercial product development"
      ],
      achievements: "2 patents filed, 15 students placed",
      projects: ["Functional feed development", "Immunostimulant research", "Sustainable feed ingredients"],
      contactInfo: "Dr. Amit Patel, R&D Head"
    },
    {
      company: "Waterbase Limited",
      sector: "Aquaculture Equipment & Systems",
      partnership: "Infrastructure & Technology",
      since: "2021",
      description: "Comprehensive partnership for aquaculture equipment, system design, technology demonstration, and hands-on training on modern aquaculture systems.",
      collaboration: [
        "Equipment demonstration units",
        "System design consultancy",
        "Technical training programs",
        "Maintenance support services",
        "Innovation development"
      ],
      benefits: [
        "State-of-the-art equipment access",
        "Technical skill development",
        "Industry standard training",
        "Employment opportunities",
        "Technology adaptation"
      ],
      achievements: "5 demonstration units installed, 100+ students trained",
      projects: ["RAS system optimization", "Biofloc system design", "Water quality monitoring systems"],
      contactInfo: "Eng. Suresh Reddy, Technical Director"
    },
    {
      company: "Growel Feeds Private Limited",
      sector: "Animal & Aqua Nutrition",
      partnership: "Nutrition Research & Training",
      since: "2023",
      description: "Partnership focused on nutritional research, feed development, quality assurance, farmer education, and sustainable aquaculture practices.",
      collaboration: [
        "Nutritional research studies",
        "Feed quality assessment",
        "Farmer education programs",
        "Product testing facilities",
        "Market development support"
      ],
      benefits: [
        "Research collaboration opportunities",
        "Industry standard testing facilities",
        "Practical training exposure",
        "Career development support",
        "Innovation in nutrition"
      ],
      achievements: "4 research papers published, 300+ farmers reached",
      projects: ["Indigenous feed ingredient research", "Probiotics in aquaculture", "Sustainable nutrition solutions"],
      contactInfo: "Dr. Neha Singh, Technical Manager"
    },
    {
      company: "CP Aquaculture India",
      sector: "Integrated Aquaculture Solutions",
      partnership: "Comprehensive Development",
      since: "2024",
      description: "Holistic partnership covering technology transfer, capacity building, market linkages, sustainable practices, and value chain development.",
      collaboration: [
        "Technology transfer programs",
        "Comprehensive training modules",
        "Market linkage facilitation",
        "Sustainable practice promotion",
        "Value chain development"
      ],
      benefits: [
        "Integrated aquaculture exposure",
        "Global best practices access",
        "Market connection opportunities",
        "Skill enhancement programs",
        "Career pathway development"
      ],
      achievements: "2 technology transfer programs, 500+ beneficiaries",
      projects: ["Integrated aquaculture systems", "Market linkage platforms", "Sustainability assessment tools"],
      contactInfo: "Mr. Vikram Thakur, Country Head"
    },
    {
      company: "Aquaculture Foundation of India",
      sector: "Industry Development",
      partnership: "Policy & Development",
      since: "2022",
      description: "Strategic alliance for policy advocacy, industry development, research support, skill development, and sustainable aquaculture promotion.",
      collaboration: [
        "Policy research and advocacy",
        "Industry development initiatives",
        "Skill development programs",
        "Research funding support",
        "Sustainability promotion"
      ],
      benefits: [
        "Policy research opportunities",
        "Industry networking access",
        "Professional development",
        "Research grant opportunities",
        "Leadership development"
      ],
      achievements: "3 policy papers, 250+ industry connections",
      projects: ["Aquaculture policy research", "Industry skill mapping", "Sustainable development frameworks"],
      contactInfo: "Dr. Manoj Sharma, Executive Director"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white">
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

      {/* Quick Navigation */}
      <section className="section-padding bg-white border-b">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#mou-linkages" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              MoUs & Linkages
            </a>
            <a href="#industry-partnerships" className="px-6 py-3 bg-gray-100 hover:bg-primary-600 hover:text-white rounded-lg font-medium transition-colors">
              Industry Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* MoUs & Linkages */}
      <section id="mou-linkages" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MoUs & Linkages</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Formal agreements and institutional linkages with government agencies, research organizations, 
              NGOs, and international bodies for collaborative development in fisheries sector.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mouLinkages.map((mou, index) => (
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

      {/* Industry Partnerships */}
      <section id="industry-partnerships" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Partnerships</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategic alliances with leading industry players in aquaculture, feed manufacturing, 
              equipment supply, and technology development for practical exposure and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industryPartnerships.map((partnership, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      Since {partnership.since}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{partnership.company}</h3>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Sector:</span>
                    <p className="text-gray-600">{partnership.sector}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Partnership Type:</span>
                    <p className="text-gray-600">{partnership.partnership}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Contact:</span>
                    <p className="text-gray-600">{partnership.contactInfo}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{partnership.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Collaboration Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {partnership.collaboration.slice(0, 4).map((area, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                    <ul className="space-y-1">
                      {partnership.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <Award className="w-4 h-4 text-orange-600 mr-2 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ongoing Projects</h4>
                    <ul className="space-y-1">
                      {partnership.projects.map((project, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-1">Achievements</h4>
                    <p className="text-sm text-orange-800">{partnership.achievements}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Statistics */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Impact</h2>
            <div className="w-20 h-1 bg-primary-500 rounded mx-auto mb-6"></div>
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
              <p className="text-gray-600">International Linkages</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Partner with Us</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Interested in collaborating with College of Fisheries? We welcome partnerships 
            that contribute to fisheries education, research, and sustainable development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Partnership Inquiry
            </Link>
            
            <Link
              to="/about"
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
=======
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building, Users, FileText, Calendar, MapPin, Phone, Mail, ExternalLink, Award, Handshake } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Collaborations = () => {
  const [loading, setLoading] = useState(true)

  // Sample collaboration data based on reference site
  const collaborationData = {
    mouLinkages: [
      {
        id: 1,
        organization: 'NAFED (National Agricultural Cooperative Marketing Federation)',
        type: 'MoU',
        signedDate: '2023-06-15',
        duration: '5 years',
        description: 'Strategic partnership for marketing and distribution of fish products, capacity building, and technology transfer.',
        objectives: [
          'Market access for fish farmers',
          'Quality certification support',
          'Export facilitation',
          'Training and capacity building',
          'Technology transfer'
        ],
        activities: [
          'Joint marketing campaigns',
          'Quality standards development',
          'Farmer training programs',
          'Market research studies',
          'Export promotion'
        ],
        benefits: [
          'Enhanced market access',
          'Better price realization',
          'Quality improvement',
          'Export opportunities',
          'Farmer empowerment'
        ],
        contact: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'nafed@fisherycollegejabalpur.edu.in',
        status: 'Active',
        logo: 'cllg.jpg'
      },
      {
        id: 2,
        organization: 'NFDB (National Fisheries Development Board)',
        type: 'MoU',
        signedDate: '2023-03-20',
        duration: '3 years',
        description: 'Collaboration for fisheries development, research projects, and extension activities.',
        objectives: [
          'Research collaboration',
          'Extension programs',
          'Technology demonstration',
          'Capacity building',
          'Policy support'
        ],
        activities: [
          'Joint research projects',
          'Farmer training programs',
          'Technology demonstrations',
          'Extension literature',
          'Policy recommendations'
        ],
        benefits: [
          'Research funding',
          'Technical expertise',
          'National network',
          'Policy influence',
          'Recognition'
        ],
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680',
        email: 'nfdb@fisherycollegejabalpur.edu.in',
        status: 'Active',
        logo: 'cllg.jpg'
      },
      {
        id: 3,
        organization: 'ICAR (Indian Council of Agricultural Research)',
        type: 'Strategic Partnership',
        signedDate: '2022-12-10',
        duration: 'Ongoing',
        description: 'Long-term strategic partnership for research, education, and extension in fisheries sector.',
        objectives: [
          'Research collaboration',
          'Student exchange',
          'Faculty development',
          'Technology transfer',
          'Extension activities'
        ],
        activities: [
          'Joint research projects',
          'Student internships',
          'Faculty training',
          'Technology demonstrations',
          'Extension programs'
        ],
        benefits: [
          'Research excellence',
          'Student opportunities',
          'Faculty development',
          'National recognition',
          'Funding support'
        ],
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'icar@fisherycollegejabalpur.edu.in',
        status: 'Active',
        logo: 'cllg.jpg'
      }
    ],
    icarInstitutes: [
      {
        id: 1,
        name: 'ICAR-NBFGR (National Bureau of Fish Genetic Resources)',
        location: 'Lucknow, Uttar Pradesh',
        focus: 'Fish genetic resources conservation and management',
        collaboration: [
          'Genetic diversity studies',
          'Breeding programs',
          'Conservation strategies',
          'Student training',
          'Research projects'
        ],
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680',
        email: 'nbfgr@fisherycollegejabalpur.edu.in',
        website: 'https://nbfgr.res.in'
      },
      {
        id: 2,
        name: 'ICAR-CIFRI (Central Inland Fisheries Research Institute)',
        location: 'Barrackpore, West Bengal',
        focus: 'Inland fisheries research and development',
        collaboration: [
          'Water quality research',
          'Aquaculture systems',
          'Fish health management',
          'Extension programs',
          'Student exposure trips'
        ],
        contact: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'cifri@fisherycollegejabalpur.edu.in',
        website: 'https://cifri.org.in'
      },
      {
        id: 3,
        name: 'ICAR-CIFE (Central Institute of Fisheries Education)',
        location: 'Mumbai, Maharashtra',
        focus: 'Fisheries education and research',
        collaboration: [
          'Academic programs',
          'Research collaboration',
          'Faculty exchange',
          'Student exchange',
          'Joint publications'
        ],
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'cife@fisherycollegejabalpur.edu.in',
        website: 'https://cife.edu.in'
      },
      {
        id: 4,
        name: 'ICAR-CIBA (Central Institute of Brackishwater Aquaculture)',
        location: 'Chennai, Tamil Nadu',
        focus: 'Brackishwater aquaculture research',
        collaboration: [
          'Brackishwater systems',
          'Shrimp farming',
          'Water management',
          'Technology transfer',
          'Training programs'
        ],
        contact: 'Dr. Anil Kumar Jain',
        phone: '+91 761 2345680',
        email: 'ciba@fisherycollegejabalpur.edu.in',
        website: 'https://ciba.res.in'
      },
      {
        id: 5,
        name: 'ICAR-CMFRI (Central Marine Fisheries Research Institute)',
        location: 'Kochi, Kerala',
        focus: 'Marine fisheries research',
        collaboration: [
          'Marine fisheries',
          'Coastal aquaculture',
          'Marine biodiversity',
          'Climate change studies',
          'Extension activities'
        ],
        contact: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'cmfri@fisherycollegejabalpur.edu.in',
        website: 'https://cmfri.org.in'
      },
      {
        id: 6,
        name: 'ICAR-DCFR (Directorate of Coldwater Fisheries Research)',
        location: 'Bhimtal, Uttarakhand',
        focus: 'Coldwater fisheries research',
        collaboration: [
          'Coldwater fisheries',
          'Trout farming',
          'Mountain aquaculture',
          'Ecotourism',
          'Technology transfer'
        ],
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'dcfr@fisherycollegejabalpur.edu.in',
        website: 'https://dcfr.res.in'
      }
    ],
    ngoPartnerships: [
      {
        id: 1,
        name: 'Fisheries Development Foundation',
        type: 'NGO',
        focus: 'Community-based fisheries development',
        collaboration: [
          'Community mobilization',
          'Farmer training',
          'Technology adoption',
          'Market linkage',
          'Capacity building'
        ],
        projects: [
          'Women empowerment in fisheries',
          'Sustainable aquaculture',
          'Organic fish farming',
          'Value addition',
          'Market access'
        ],
        beneficiaries: '500+ farmers',
        contact: 'Mr. Suresh Kumar',
        phone: '+91 761 2345683',
        email: 'fdf@fisherycollegejabalpur.edu.in',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Aquaculture Development Society',
        type: 'NGO',
        focus: 'Aquaculture technology transfer',
        collaboration: [
          'Technology demonstration',
          'Farmer field schools',
          'Extension services',
          'Research support',
          'Policy advocacy'
        ],
        projects: [
          'Biofloc technology',
          'Integrated farming',
          'Water management',
          'Feed optimization',
          'Disease control'
        ],
        beneficiaries: '300+ farmers',
        contact: 'Mrs. Sunita Sharma',
        phone: '+91 761 2345684',
        email: 'ads@fisherycollegejabalpur.edu.in',
        status: 'Active'
      }
    ],
    industryPartnerships: [
      {
        id: 1,
        name: 'Blue Revolution Aquaculture Ltd.',
        type: 'Private Company',
        focus: 'Commercial aquaculture and processing',
        collaboration: [
          'Student internships',
          'Faculty training',
          'Research projects',
          'Technology transfer',
          'Placement opportunities'
        ],
        activities: [
          'Industry visits',
          'Guest lectures',
          'Project guidance',
          'Job placement',
          'Technology sharing'
        ],
        benefits: [
          'Industry exposure',
          'Career opportunities',
          'Technology insights',
          'Market understanding',
          'Professional development'
        ],
        contact: 'Dr. Priya Verma',
        phone: '+91 761 2345679',
        email: 'industry@fisherycollegejabalpur.edu.in',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Fresh Fish Farm Network',
        type: 'Farmer Producer Organization',
        focus: 'Collective fish farming and marketing',
        collaboration: [
          'Farmer training',
          'Technology support',
          'Market linkage',
          'Quality certification',
          'Financial assistance'
        ],
        activities: [
          'Training programs',
          'Field demonstrations',
          'Market access',
          'Quality control',
          'Financial support'
        ],
        benefits: [
          'Farmer empowerment',
          'Market access',
          'Quality improvement',
          'Income enhancement',
          'Sustainable practices'
        ],
        contact: 'Dr. Rajesh Kumar Sharma',
        phone: '+91 761 2345678',
        email: 'fpo@fisherycollegejabalpur.edu.in',
        status: 'Active'
      }
    ],
    internationalCollaborations: [
      {
        id: 1,
        organization: 'WorldFish Center',
        country: 'Malaysia',
        type: 'Research Collaboration',
        focus: 'Global fisheries research and development',
        collaboration: [
          'Joint research projects',
          'Student exchange',
          'Faculty development',
          'Technology transfer',
          'Policy support'
        ],
        projects: [
          'Climate-smart aquaculture',
          'Sustainable fisheries',
          'Food security',
          'Poverty reduction',
          'Gender equality'
        ],
        contact: 'Dr. Rajesh Kumar Sharma',
        email: 'worldfish@fisherycollegejabalpur.edu.in',
        status: 'Active'
      },
      {
        id: 2,
        organization: 'FAO (Food and Agriculture Organization)',
        country: 'Italy',
        type: 'Technical Cooperation',
        focus: 'Global food security and sustainable agriculture',
        collaboration: [
          'Technical assistance',
          'Capacity building',
          'Policy support',
          'Knowledge sharing',
          'Best practices'
        ],
        projects: [
          'Sustainable aquaculture',
          'Fisheries management',
          'Food safety',
          'Climate adaptation',
          'Rural development'
        ],
        contact: 'Dr. Anil Kumar Jain',
        email: 'fao@fisherycollegejabalpur.edu.in',
        status: 'Active'
      }
    ]
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Collaborations"
          subtitle="Strategic partnerships and collaborations with government agencies, research institutions, NGOs, and industry partners."
          align="left"
        />
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading collaboration information...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* MoUs & Linkages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Handshake className="h-6 w-6 text-blue-600 mr-2" />
                MoUs & Strategic Linkages
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborationData.mouLinkages.map((mou) => (
                  <Card key={mou.id} className="h-full">
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={mou.logo}
                          alt={mou.organization}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{mou.organization}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mou.status)}`}>
                              {mou.status}
                            </span>
                            <span className="text-sm text-gray-600">{mou.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{mou.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Signed Date:</span>
                          <span className="text-gray-600 ml-2">{formatDate(mou.signedDate)}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Duration:</span>
                          <span className="text-gray-600 ml-2">{mou.duration}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Objectives:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {mou.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {mou.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {mou.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{mou.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{mou.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{mou.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ICAR Institutes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-green-600 mr-2" />
                ICAR Institute Collaborations
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborationData.icarInstitutes.map((institute) => (
                  <Card key={institute.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{institute.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Location:</span>
                          <span className="text-gray-600 ml-2">{institute.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Focus:</span>
                          <span className="text-gray-600 ml-2">{institute.focus}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Collaboration Areas:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {institute.collaboration.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{institute.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{institute.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{institute.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                          <a href={institute.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* NGO Partnerships */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                NGO Partnerships
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborationData.ngoPartnerships.map((ngo) => (
                  <Card key={ngo.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{ngo.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Type:</span>
                          <span className="text-gray-600 ml-2">{ngo.type}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Focus:</span>
                          <span className="text-gray-600 ml-2">{ngo.focus}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Beneficiaries:</span>
                          <span className="text-gray-600 ml-2">{ngo.beneficiaries}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(ngo.status)}`}>
                            {ngo.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Collaboration Areas:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {ngo.collaboration.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Projects:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {ngo.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{ngo.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{ngo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{ngo.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Industry Partnerships */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Building className="h-6 w-6 text-orange-600 mr-2" />
                Industry Partnerships
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborationData.industryPartnerships.map((industry) => (
                  <Card key={industry.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{industry.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Type:</span>
                          <span className="text-gray-600 ml-2">{industry.type}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Focus:</span>
                          <span className="text-gray-600 ml-2">{industry.focus}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(industry.status)}`}>
                            {industry.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Collaboration Areas:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {industry.collaboration.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Activities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {industry.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {industry.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{industry.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{industry.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{industry.email}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* International Collaborations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ExternalLink className="h-6 w-6 text-indigo-600 mr-2" />
                International Collaborations
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {collaborationData.internationalCollaborations.map((collab) => (
                  <Card key={collab.id} className="h-full">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{collab.organization}</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Country:</span>
                          <span className="text-gray-600 ml-2">{collab.country}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Type:</span>
                          <span className="text-gray-600 ml-2">{collab.type}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Focus:</span>
                          <span className="text-gray-600 ml-2">{collab.focus}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Status:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(collab.status)}`}>
                            {collab.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Collaboration Areas:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {collab.collaboration.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Projects:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {collab.projects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-700">{collab.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-600">{collab.email}</span>
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
>>>>>>> 356a3acf66188d788cf322698f07ebf8ec85f7f3
    </div>
  )
}

export default Collaborations