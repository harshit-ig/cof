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
    <div className="min-h-screen text-left">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-green-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/4 w-44 h-44 bg-blue-300 rounded-full blur-4xl"></div>
        </div>
        
        {/* Subtle floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Collaboration/partnership themed shapes */}
          <div className="absolute top-20 right-20 w-12 h-8 bg-white/10 rounded-full animate-float transform rotate-12" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-24 left-24 w-8 h-10 bg-cyan-300/15 rounded animate-float transform -rotate-12" style={{animationDelay: '2s'}}></div>
          
          {/* Partnership bubbles */}
          <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container-max relative z-10">
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
      <section id="mou-Implementations" className="section-padding bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-36 h-36 bg-indigo-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-purple-300 rounded-full blur-2xl"></div>
        </div>

        {/* Partnership-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 w-10 h-6 bg-blue-400/20 rounded-lg animate-float transform rotate-45" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-32 left-32 w-8 h-8 bg-indigo-400/25 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-1/4 w-6 h-12 bg-purple-400/20 rounded-full animate-float transform -rotate-12" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MoUs & Implementations</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded mx-auto mb-6"></div>
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
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-blue-100/50 group hover:scale-[1.02] relative overflow-hidden">
                {/* Card corner decorations */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full transform -translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-400/15 to-blue-500/15 rounded-full transform translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-600 via-transparent to-indigo-600"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <Users2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-medium rounded-full border border-green-300/50">
                        {mou.status}
                      </span>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-medium rounded-full border border-blue-300/50">
                        {mou.type}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{mou.organization}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 p-3 rounded-lg border border-gray-200/50">
                      <span className="font-semibold text-gray-900 text-sm">Category:</span>
                      <p className="text-gray-700 font-medium">{mou.category}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 p-3 rounded-lg border border-gray-200/50">
                      <span className="font-semibold text-gray-900 text-sm">Duration:</span>
                      <p className="text-gray-700 font-medium">{mou.duration}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50/50 p-3 rounded-lg border border-gray-200/50">
                      <span className="font-semibold text-gray-900 text-sm">Signed:</span>
                      <p className="text-gray-700 font-medium">{mou.signedDate}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-green-50/50 p-3 rounded-lg border border-gray-200/50">
                      <span className="font-semibold text-gray-900 text-sm">Contact:</span>
                      <p className="text-gray-700 font-medium">{mou.contactPerson}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">{mou.description}</p>
                  
                  <div className="space-y-5">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Key Objectives
                      </h4>
                      <ul className="space-y-2">
                        {mou.objectives.slice(0, 3).map((objective, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200/50">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <ChevronRight className="w-4 h-4 text-indigo-600 mr-2" />
                        Current Activities
                      </h4>
                      <ul className="space-y-2">
                        {mou.activities.slice(0, 3).map((activity, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <ChevronRight className="w-3 h-3 text-indigo-600 mr-2 mt-1 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-300/50 shadow-sm">
                      <h4 className="font-bold text-green-900 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                        Key Outcomes
                      </h4>
                      <p className="text-sm text-green-800 font-medium leading-relaxed">{mou.outcomes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* National Partnerships */}
      <section id="national-partnerships" className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-400 rounded-full blur-4xl"></div>
          <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-purple-400 rounded-full blur-2xl"></div>
        </div>

        {/* Collaboration-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-24 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-40 right-40 w-12 h-6 bg-indigo-500/25 rounded-lg animate-float transform rotate-45" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-purple-500/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🤝 Our Collaborations & Partnerships
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We are proud to collaborate with leading national organizations, research institutes, and development agencies 
              that play a vital role in advancing fisheries, aquaculture, and allied sectors. These partnerships strengthen 
              our programs, provide valuable expertise, and ensure effective implementation of initiatives.
            </p>
          </div>

          <div className="space-y-8">
            {Object.keys(groupedPartnerships).length > 0 ? (
              Object.entries(groupedPartnerships).map(([type, partners]) => (
                <div key={type} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-blue-200/50 group hover:scale-[1.01] relative overflow-hidden">
                  {/* Card decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-indigo-500/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 to-blue-500/10 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-blue-600 via-transparent to-purple-600"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center group-hover:text-blue-600 transition-colors duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-md mr-4 group-hover:shadow-lg transition-shadow duration-300">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      {type}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {partners.map((partner) => (
                        partner.partners && partner.partners.map((p, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-100/80 p-5 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 group/card relative overflow-hidden">
                            {/* Card corner decoration */}
                            <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full transform translate-x-4 -translate-y-4"></div>
                            
                            <div className="relative z-10">
                              <h4 className="font-bold text-gray-900 mb-3 group-hover/card:text-blue-700 transition-colors duration-300">{p.name}</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>
                            </div>
                            
                            {/* Hover effect indicator */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left"></div>
                          </div>
                        ))
                      ))}
                    </div>
                  </div>
                </div>
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
      <section className="section-padding bg-gradient-to-br from-gray-50 via-purple-50 to-blue-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-16 left-16 w-36 h-36 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-16 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-indigo-300 rounded-full blur-2xl"></div>
        </div>

        {/* Statistics-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-8 h-8 bg-purple-500/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-28 left-28 w-6 h-12 bg-blue-500/25 rounded-lg animate-float transform rotate-12" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-10 h-6 bg-indigo-500/20 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        </div>

        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaboration Impact</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded mx-auto mb-6"></div>
            {/* Decorative subtitle */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Measuring the success and reach of our collaborative initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.length > 0 ? (
              impactMetrics.map((metric, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border border-purple-100/50 group hover:scale-105 relative overflow-hidden">
                  {/* Card corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400/15 to-blue-500/15 rounded-full transform -translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-400/10 to-indigo-500/10 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-600 via-transparent to-blue-600"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-18 h-18 bg-gradient-to-br from-${metric.color || 'blue'}-100 to-${metric.color || 'blue'}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      <Users2 className={`w-9 h-9 text-${metric.color || 'blue'}-600`} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">{metric.value}</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">{metric.label}</p>
                  </div>
                  
                  {/* Hover effect indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50">
                  <p className="text-gray-500">No impact metrics available at the moment.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Collaborations






