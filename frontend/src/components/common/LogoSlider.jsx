import React from 'react'

const LogoSlider = () => {
  // Sample partner/client logos - you can replace these with actual logo filenames from your public folder
  const logos = [
    { name: 'DOF', src: '/dof.jpg', alt: 'India Department of Fisheries Logo' },
    { name: 'NFDB', src: '/nfdb.jpg', alt: 'National Fisheries Development Board Logo' },
    { name: 'ICAR-CMFRI', src: '/icar-cmfri.jpg', alt: 'ICAR-CMFRI Logo' },
    { name: 'CIFRI', src: '/cifri.jpeg', alt: 'CIFRI logo' },
    { name: 'CIFA', src: '/cifa.jpeg', alt: 'CIFA Logo' },
    { name: 'CIBA', src: '/ciba.png', alt: 'CIBA Logo' },
    { name: 'CIFT', src: '/cift.png', alt: 'CIFT Logo' },
    { name: 'CIFE', src: '/cife.jpeg', alt: 'CIFE Logo' },
    { name: 'NBFGR', src: '/nbfgr.jpeg', alt: 'NBFGR Logo' },
    { name: 'DCFR', src: '/dcfr.png', alt: 'DCFR Logo' },
  ]

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

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
            className="flex animate-scroll-left"
            style={{
              animation: 'scroll-left 30s linear infinite'
            }}
            onMouseEnter={(e) => {
              e.target.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.target.style.animationPlayState = 'running'
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 lg:mx-8"
              >
                <div className="h-16 lg:h-20 w-24 lg:w-32 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-sm hover:shadow-md">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .animate-scroll-left {
            animation-duration: 20s !important;
          }
        }
      `}</style>
    </section>
  )
}

export default LogoSlider
