import React, { useState, useEffect } from 'react'
import { partnersAPI, uploadAPI } from '../../services/api'

const LogoSlider = () => {
  const [logos, setLogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await partnersAPI.getAll()
      
      if (response.data.success) {
        // Transform partners data to match the expected logo format
        const partnersData = response.data.data.partners.map(partner => ({
          name: partner.name,
          src: uploadAPI.getImageUrl(partner.logo, 'partners'),
          alt: partner.altText,
          link: partner.link,
          category: partner.category,
          description: partner.description
        }))
        setLogos(partnersData)
      }
    } catch (error) {
      console.error('Error fetching partners:', error)
      // Fallback to empty array if API fails
      setLogos([])
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything while loading or if no partners
  if (loading || logos.length === 0) {
    return null
  }

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Partners & Collaborators</h2>
          <p className="text-gray-600">Proud to work with leading organizations in Fishery Science and aquaculture.</p>
        </div>

        {/* Logo Slider Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Sliding Container */}
          <div 
            className="flex animate-scroll-infinite"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 lg:mx-8"
              >
                <a 
                  href={logo.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={logo.description || logo.alt} 
                  className="block h-16 lg:h-20 w-24 lg:w-32 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text placeholder if image fails
                      e.target.style.display = 'none'
                      const placeholder = e.target.nextSibling
                      if (placeholder) {
                        placeholder.style.display = 'flex'
                      }
                    }}
                  />
                  <div className="hidden items-center justify-center h-full w-full text-xs text-gray-400 font-medium">
                    {logo.name}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoSlider
