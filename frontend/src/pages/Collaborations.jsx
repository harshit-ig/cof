import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users2, Building2, Users, Target, Calendar, MapPin, ChevronRight, ExternalLink, Award, Globe } from 'lucide-react'
import Card from '../components/common/Card'
import { collaborationsAPI } from '../services/api'

const Collaborations = () => {
  const [mouImplementations, setMouImplementations] = useState([])
  const [partnerships, setPartnerships] = useState([])
  const [impactMetrics, setImpactMetrics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollaborations()
  }, [])

  const fetchCollaborations = async () => {
    try {
      setLoading(true)
      const [mouRes, partnerRes, impactRes] = await Promise.all([
        collaborationsAPI.getAll({ section: 'mou' }),
        collaborationsAPI.getAll({ section: 'partnership' }),
        collaborationsAPI.getAll({ section: 'impact' })
      ])
      
      if (mouRes.data.success) {
        setMouImplementations(mouRes.data.data.collaborations || [])
      }
      if (partnerRes.data.success) {
        setPartnerships(partnerRes.data.data.collaborations || [])
      }
      if (impactRes.data.success) {
        setImpactMetrics(impactRes.data.data.collaborations || [])
      }
    } catch (error) {
      console.error('Error fetching collaborations:', error)
    } finally {
      setLoading(false)
    }
  }

  // Group partnerships by partnerType
  const groupedPartnerships = partnerships.reduce((acc, p) => {
    const type = p.partnerType || 'Other'
    if (!acc[type]) acc[type] = []
    acc[type].push(p)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collaborations...</p>
        </div>
      </div>
    )
  }

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
            {mouImplementations.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-500">No MoU implementations available at the moment.</p>
              </div>
            ) : (
              mouImplementations.map((mou, index) => (
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
            ))
            )}
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
            {Object.keys(groupedPartnerships).length > 0 ? (
              Object.entries(groupedPartnerships).map(([type, partners]) => (
                <Card key={type} className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                    {type}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partners.map((partner) => (
                      partner.partners && partner.partners.map((p, idx) => (
                        <div key={idx} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-gray-900 mb-2">{p.name}</h4>
                          <p className="text-sm text-gray-600">{p.description}</p>
                        </div>
                      ))
                    ))}
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No partnership data available at the moment.</p>
              </div>
            )}
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
            {impactMetrics.length > 0 ? (
              impactMetrics.map((metric, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${metric.color || 'blue'}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Users2 className={`w-8 h-8 text-${metric.color || 'blue'}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                  <p className="text-gray-600">{metric.label}</p>
                </Card>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500">No impact metrics available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collaborations






