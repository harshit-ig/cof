import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const galleryImages = [
    {
      id: 1,
      src: '/COF NEW.png',
      title: 'College of Fisheries - Main Building',
      category: 'infrastructure',
      description: 'Main administrative and academic building of College of Fisheries, Jabalpur'
    },
    {
      id: 2,
      src: '/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg',
      title: 'Academic Buildings',
      category: 'infrastructure',
      description: 'Modern academic buildings with state-of-the-art classrooms and facilities'
    },
    {
      id: 3,
      src: '/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg',
      title: 'Research Laboratories',
      category: 'research',
      description: 'Well-equipped research laboratories for fisheries science studies'
    },
    {
      id: 4,
      src: '/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg',
      title: 'Hatchery Facilities',
      category: 'facilities',
      description: 'Modern fish hatchery units for breeding and demonstration'
    },
    {
      id: 5,
      src: '/WhatsApp Image 2025-08-19 at 09.04.52_e4f075d7.jpg',
      title: 'Campus Environment',
      category: 'campus',
      description: 'Beautiful campus environment and student areas'
    },
    {
      id: 6,
      src: '/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg',
      title: 'Processing Units',
      category: 'facilities',
      description: 'Fish processing and feed manufacturing facilities'
    },
    {
      id: 7,
      src: '/WhatsApp Image 2025-08-19 at 09.04.54_38d4a9cd.jpg',
      title: 'Library and Study Areas',
      category: 'infrastructure',
      description: 'Central library with comprehensive academic resources'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Images' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'research', name: 'Research' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'campus', name: 'Campus Life' }
  ]

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeFilter)

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
    }
    
    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section background="bg-gray-50">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Explore our campus, facilities, and academic environment through these images"
          align="center"
        />
      </Section>

      {/* Filter Tabs */}
      <Section background="bg-white">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}
      </Section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information Section */}
      <Section background="bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We welcome prospective students and their families to visit our campus and experience 
            our facilities firsthand. Schedule a visit to see why College of Fisheries, Jabalpur 
            is the right choice for your education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Schedule a Visit
            </a>
            <a
              href="/infrastructure"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Learn About Facilities
            </a>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Gallery
