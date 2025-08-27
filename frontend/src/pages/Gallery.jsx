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
      src: '/cllg.jpg',
      title: 'College of Fisheries - Main Building',
      category: 'infrastructure',
      description: 'Main administrative and academic building of College of Fisheries, Jabalpur'
    },
    {
      id: 2,
      src: '/COF NEW.png',
      title: 'College Logo & Branding',
      category: 'campus',
      description: 'Official logo and branding of College of Fisheries'
    },
    {
      id: 3,
      src: '/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg',
      title: 'Campus Infrastructure',
      category: 'infrastructure',
      description: 'Modern campus infrastructure and building facilities'
    },
    {
      id: 4,
      src: '/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg',
      title: 'Research Laboratories',
      category: 'research',
      description: 'Well-equipped research laboratories for fisheries science studies'
    },
    {
      id: 5,
      src: '/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg',
      title: 'Academic Activities',
      category: 'campus',
      description: 'Classroom sessions and academic activities'
    },
    {
      id: 6,
      src: '/WhatsApp Image 2025-08-19 at 09.04.52_e4f075d7.jpg',
      title: 'Student Activities',
      category: 'campus',
      description: 'Student life and campus activities'
    },
    {
      id: 7,
      src: '/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg',
      title: 'Field Work & Research',
      category: 'research',
      description: 'Field research and practical training activities'
    },
    {
      id: 8,
      src: '/WhatsApp Image 2025-08-19 at 09.04.54_38d4a9cd.jpg',
      title: 'Extension Programs',
      category: 'facilities',
      description: 'Extension programs and farmer training activities'
    },
    {
      id: 9,
      src: '/WhatsApp Image 2025-08-21 at 22.43.39_1241e1b8.jpg',
      title: 'Campus Events',
      category: 'campus',
      description: 'Special events and celebrations on campus'
    },
    {
      id: 10,
      src: '/WhatsApp Image 2025-08-21 at 22.43.39_b0838fbd.jpg',
      title: 'Cultural Programs',
      category: 'campus',
      description: 'Cultural programs and annual functions'
    },
    {
      id: 11,
      src: '/WhatsApp Image 2025-08-21 at 22.43.39_d6ab2436.jpg',
      title: 'Practical Training',
      category: 'research',
      description: 'Hands-on practical training sessions'
    },
    {
      id: 12,
      src: '/WhatsApp Image 2025-08-21 at 22.43.41_288fca02.jpg',
      title: 'Workshop Sessions',
      category: 'facilities',
      description: 'Technical workshops and skill development programs'
    },
    {
      id: 13,
      src: '/WhatsApp Image 2025-08-21 at 22.43.42_4e674a8f.jpg',
      title: 'Seminar Hall',
      category: 'infrastructure',
      description: 'Conference hall and seminar facilities'
    },
    {
      id: 14,
      src: '/WhatsApp Image 2025-08-21 at 22.43.42_b0410280.jpg',
      title: 'Library & Resources',
      category: 'infrastructure',
      description: 'Central library and learning resources center'
    },
    {
      id: 15,
      src: '/slider.jpg',
      title: 'Campus Overview',
      category: 'campus',
      description: 'Beautiful overview of the entire campus'
    },
    {
      id: 16,
      src: '/slider-2.jpg',
      title: 'Sports Facilities',
      category: 'facilities',
      description: 'Sports complex and recreational facilities'
    },
    {
      id: 17,
      src: '/slider-3.jpg',
      title: 'Hostel Facilities',
      category: 'infrastructure',
      description: 'Student hostel and accommodation facilities'
    },
    {
      id: 18,
      src: '/slider-4.jpg',
      title: 'Garden & Landscape',
      category: 'campus',
      description: 'Beautiful gardens and landscaped areas'
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


