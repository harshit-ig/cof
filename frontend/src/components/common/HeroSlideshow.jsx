import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'College of Fisheries, Jabalpur',
      subtitle: 'Excellence in Fisheries Education & Research',
      description: 'Leading institution under Nanaji Deshmukh Veterinary Science University for fisheries science education, committed to nurturing future professionals in aquaculture and fisheries management.',
      cta: 'Learn More',
      link: '/about'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250a67d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'State-of-the-Art Facilities',
      subtitle: 'Modern Infrastructure for Quality Education',
      description: 'Well-equipped laboratories, research facilities, and comprehensive infrastructure to provide hands-on learning experience.',
      cta: 'Explore Facilities',
      link: '/infrastructure'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Research & Innovation',
      subtitle: 'Advancing Fisheries Science',
      description: 'Cutting-edge research programs contributing to sustainable fisheries development and aquaculture innovation.',
      cta: 'View Research',
      link: '/research'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
  }, [slides.length])

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
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 102, 51, 0.7)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
