import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Move, Save, X, Upload } from 'lucide-react'
import { slideshowAPI } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import Card from '../common/Card'
import toast from 'react-hot-toast'

const SlideshowManagement = () => {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [draggedItem, setDraggedItem] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    cta: 'Learn More',
    link: '/about',
    image: null,
    isActive: true
  })

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await slideshowAPI.getAllAdmin()
      if (response.data.success) {
        setSlides(response.data.data.slides)
      }
    } catch (error) {
      console.error('Error fetching slides:', error)
      toast.error('Failed to fetch slides')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('subtitle', formData.subtitle)
      submitData.append('description', formData.description)
      submitData.append('cta', formData.cta)
      submitData.append('link', formData.link)
      submitData.append('isActive', formData.isActive)
      
      // Add order field - keep existing order when editing, or get next available order for new slides
      if (editingSlide) {
        const order = editingSlide.order !== undefined ? editingSlide.order : 0
        submitData.append('order', order)
        console.log('Updating slide with order:', order)
      } else {
        // For new slides, calculate next order
        const nextOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order || 0)) + 1 : 0
        submitData.append('order', nextOrder)
        console.log('Creating slide with order:', nextOrder)
      }
      
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      console.log('Submitting form data:', {
        title: formData.title,
        editing: !!editingSlide,
        hasImage: !!formData.image
      })

      let response
      if (editingSlide) {
        response = await slideshowAPI.update(editingSlide._id, submitData)
        toast.success('Slide updated successfully')
      } else {
        response = await slideshowAPI.create(submitData)
        toast.success('Slide created successfully')
      }

      if (response.data.success) {
        await fetchSlides()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving slide:', error)
      console.error('Error response:', error.response?.data)
      toast.error(error.response?.data?.message || 'Failed to save slide')
    }
  }

  const handleEdit = (slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      cta: slide.cta,
      link: slide.link,
      image: null, // Don't set existing image for file input
      isActive: slide.isActive
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) {
      return
    }

    try {
      await slideshowAPI.delete(id)
      toast.success('Slide deleted successfully')
      await fetchSlides()
    } catch (error) {
      console.error('Error deleting slide:', error)
      toast.error('Failed to delete slide')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      cta: 'Learn More',
      link: '/about',
      image: null,
      isActive: true
    })
    setEditingSlide(null)
    setShowForm(false)
    // Reset file input
    const fileInput = document.getElementById('slide-image')
    if (fileInput) fileInput.value = ''
  }

  const handleDragStart = (e, slide) => {
    setDraggedItem(slide)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetSlide) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem._id === targetSlide._id) return

    try {
      const newSlides = [...slides]
      const draggedIndex = newSlides.findIndex(s => s._id === draggedItem._id)
      const targetIndex = newSlides.findIndex(s => s._id === targetSlide._id)

      // Remove dragged item and insert at target position
      const [removed] = newSlides.splice(draggedIndex, 1)
      newSlides.splice(targetIndex, 0, removed)

      // Update order numbers
      const reorderData = newSlides.map((slide, index) => ({
        id: slide._id,
        order: index
      }))

      await slideshowAPI.reorder(reorderData)
      setSlides(newSlides)
      toast.success('Slides reordered successfully')
    } catch (error) {
      console.error('Error reordering slides:', error)
      toast.error('Failed to reorder slides')
    }
    
    setDraggedItem(null)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Hero Slideshow Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Slide
        </button>
      </div>

      {showForm && (
        <Card className="bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingSlide ? 'Edit Slide' : 'Add New Slide'}
              </h3>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  maxLength={150}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
                required
                maxLength={300}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Call to Action Text
                </label>
                <input
                  type="text"
                  value={formData.cta}
                  onChange={(e) => setFormData({...formData, cta: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                  placeholder="/about, /programs, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slide Image {editingSlide && '(Leave empty to keep current image)'}
              </label>
              <input
                id="slide-image"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required={!editingSlide}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">
                Active (visible on website)
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingSlide ? 'Update' : 'Create'} Slide
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {slides.length === 0 ? (
          <Card className="text-center py-8">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No slides found. Create your first slide!</p>
          </Card>
        ) : (
          slides.map((slide) => (
            <Card
              key={slide._id}
              className={`transition-all cursor-move ${!slide.isActive ? 'opacity-60' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, slide)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, slide)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Move className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-20 h-12 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{slide.title}</h3>
                  <p className="text-sm text-gray-600">{slide.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    CTA: "{slide.cta}" → {slide.link}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    slide.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {slide.isActive ? (
                      <>
                        <Eye className="w-3 h-3 inline mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 inline mr-1" />
                        Inactive
                      </>
                    )}
                  </span>

                  <button
                    onClick={() => handleEdit(slide)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit slide"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(slide._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {slides.length > 0 && (
        <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
          <strong>Tip:</strong> Drag and drop slides to reorder them. The order here determines the order on your website.
        </div>
      )}
    </div>
  )
}

export default SlideshowManagement





