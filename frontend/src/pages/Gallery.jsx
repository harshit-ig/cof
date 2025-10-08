import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar, Eye } from 'lucide-react'
import Section, { SectionHeader } from '../components/common/Section'
import Card from '../components/common/Card'
import { uploadAPI, galleryAPI } from '../services/api'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Helper function to get proper image URL
  const getImageUrl = (image) => {
    // If imageUrl starts with http, use it directly (external images)
    if (image.imageUrl && image.imageUrl.startsWith('http')) {
      return image.imageUrl;
    }
    
    // Extract filename from imageUrl path
    const filename = image.imageUrl ? image.imageUrl.split('/').pop() : null;
    if (filename) {
      const url = uploadAPI.getImageUrl(filename, 'gallery');
      console.log('Gallery page - Generated URL:', url, 'from filename:', filename);
      return url;
    }
    
    // Fallback to direct imageUrl
    console.log('Gallery page - Using fallback imageUrl:', image.imageUrl);
    return image.imageUrl;
  }

  const categories = [
    { id: 'all', name: 'All Images' },
    { id: 'events', name: 'Events' },
    { id: 'campus', name: 'Campus Life' },
    { id: 'academics', name: 'Academics' },
    { id: 'research', name: 'Research' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'activities', name: 'Activities' },
    { id: 'facilities', name: 'Facilities' }
  ]

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const response = await galleryAPI.getAll()
      const data = response.data
      
      if (data.success) {
        setImages(data.data || [])
      } else {
        setError(data.error || 'Failed to load images')
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err)
      setError('Failed to load images')
    } finally {
      setLoading(false)
    }
  }
  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(image => image.category === activeFilter)

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
  }

  const navigateImage = (direction) => {
    let newIndex
    
    if (direction === 'next') {
      newIndex = currentImageIndex === filteredImages.length - 1 ? 0 : currentImageIndex + 1
    } else {
      newIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1
    }
    
    setSelectedImage(filteredImages[newIndex])
    setCurrentImageIndex(newIndex)
  }

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentImageIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading gallery</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchGalleryImages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section background="bg-gradient-to-r from-primary-600 to-navy-700 text-white">
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
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white hover:bg-primary-50 border border-primary-300 text-primary-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? 'No images have been uploaded yet.' 
                : `No images found in the "${categories.find(c => c.id === activeFilter)?.name}" category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image._id} 
                className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 border border-primary-100"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={getImageUrl(image)}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      if (!e.target.dataset.fallbackUsed) {
                        e.target.dataset.fallbackUsed = 'true'
                        console.error('Image failed to load:', e.target.src);
                        console.log('Trying fallback URL...');
                        // Fallback to direct imageUrl from database
                        e.target.src = image.imageUrl;
                      }
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                  )}
                  {image.date && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(image.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-navy-900 bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-navy-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-navy-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-navy-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center">
              <img 
                src={getImageUrl(selectedImage)}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-navy-900 bg-opacity-80 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-primary-200 mb-2">{selectedImage.description}</p>
              )}
              {selectedImage.date && (
                <p className="text-xs text-gray-300 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(selectedImage.date).toLocaleDateString()}
                </p>
              )}
            </div>
            
            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-navy-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Additional Information Section */}
      <Section background="bg-secondary-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Visit Our Campus</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We welcome prospective students and their families to visit our campus and experience 
            our facilities firsthand. Schedule a visit to see why College of Fishery, Jabalpur 
            is the right choice for your education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Visit
            </a>
            <a
              href="/infrastructure"
              className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors shadow-lg hover:shadow-xl"
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







