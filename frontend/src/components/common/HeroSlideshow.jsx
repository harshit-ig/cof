import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: '/COF NEW.png',
      title: 'College of Fisheries, Jabalpur',
      subtitle: 'Excellence in Fisheries Education & Research',
      description: 'Leading institution under Nanaji Deshmukh Veterinary Science University for fisheries science education, committed to nurturing future professionals in aquaculture and fisheries management.',
      cta: 'Learn More',
      link: '/about'
    },
    {
      id: 2,
      image: '/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg',
      title: 'State-of-the-Art Facilities',
      subtitle: 'Modern Infrastructure for Quality Education',
      description: 'Well-equipped laboratories, research facilities, and comprehensive infrastructure to provide hands-on learning experience.',
      cta: 'Explore Facilities',
      link: '/infrastructure'
    },
    {
      id: 3,
      image: '/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg',
      title: 'Research & Innovation',
      subtitle: 'Advancing Fisheries Science',
      description: 'Cutting-edge research programs contributing to sustainable fisheries development and aquaculture innovation.',
      cta: 'View Research',
      link: '/research'
    },
    {
      id: 4,
      image: '/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg',
      title: 'Campus Life & Activities',
      subtitle: 'Vibrant Student Community',
      description: 'Experience a dynamic campus environment with various student activities, cultural events, and academic programs.',
      cta: 'Explore Campus',
      link: '/about'
    },
    {
      id: 5,
      image: '/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg',
      title: 'Practical Learning',
      subtitle: 'Hands-on Experience',
      description: 'Field training, practical sessions, and real-world exposure to fisheries and aquaculture practices.',
      cta: 'Learn More',
      link: '/academics'
    },
    {
      id: 6,
      image: '/WhatsApp Image 2025-08-19 at 09.04.54_38d4a9cd.jpg',
      title: 'Admission 2025-26',
      subtitle: 'Join Our Academic Excellence',
      description: 'Applications now open for Bachelor of Fisheries Science program. Shape your future with quality education.',
      cta: 'Apply Now',
      link: '/academics'
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  return (
    <div 
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      style={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden'
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          {/* Background Image */}
          <img 
            src={slide.image} 
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            sizes="100vw"
            loading="eager"
          />
          
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 102, 51, 0.7))'
            }}
          />
          

          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <div className="mb-4">
                  <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
                    Government of Madhya Pradesh
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl text-green-200 font-medium mb-6">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={slide.link}
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-colors duration-200"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg font-semibold rounded-lg transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-green-400 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  )
}

export default HeroSlideshow
