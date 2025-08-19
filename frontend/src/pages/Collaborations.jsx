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
    </div>
  )
}

export default Collaborations