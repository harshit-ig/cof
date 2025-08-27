import React, { useState, useEffect } from 'react'
import { Plus, Upload, Edit, Trash2, Image, Eye, Grid, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const InfrastructureGalleryManagement = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
    isPublished: true
  })

  const categories = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'laboratories', label: 'Laboratories' },
    { value: 'hostels', label: 'Hostels & Accommodation' },
    { value: 'sports', label: 'Sports Facilities' },
    { value: 'library', label: 'Library' },
    { value: 'auditorium', label: 'Auditorium & Seminar Halls' },
    { value: 'research', label: 'Research Units' },
    { value: 'campus', label: 'Campus Environment' }
  ]

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content/infrastructure-gallery')
      const data = await response.json()
      
      if (data.success) {
        setImages(data.data.content || [])
      }
    } catch (error) {
      console.error('Error fetching infrastructure images:', error)
      toast.error('Failed to load infrastructure gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
  }

  const uploadImages = async (files) => {
    const uploadedPaths = []
    
    for (const file of files) {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('category', 'infrastructure')

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        })

        const data = await response.json()
        if (data.success) {
          uploadedPaths.push(data.data.path)
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    return uploadedPaths
  }

  const handleAddImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image')
      return
    }

    try {
      setSaving(true)
      const uploadedPaths = await uploadImages(selectedFiles)
      
      if (uploadedPaths.length === 0) {
        toast.error('No images were uploaded successfully')
        return
      }

      // Create content entries for each uploaded image
      for (const [index, imagePath] of uploadedPaths.entries()) {
        const fileName = selectedFiles[index].name.split('.')[0]
        const payload = {
          section: 'infrastructure-gallery',
          subsection: newImage.category,
          title: newImage.title || fileName,
          data: {
            imagePath,
            description: newImage.description,
            category: newImage.category,
            fileName: selectedFiles[index].name
          },
          isPublished: newImage.isPublished,
          order: images.length + index + 1
        }

        await fetch('/api/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(payload)
        })
      }

      toast.success(`${uploadedPaths.length} images added successfully!`)
      setShowAddModal(false)
      setSelectedFiles([])
      setNewImage({
        title: '',
        description: '',
        category: 'infrastructure',
        isPublished: true
      })
      fetchImages()
    } catch (error) {
      console.error('Error adding images:', error)
      toast.error('Failed to add images')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/content/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Image deleted successfully!')
        fetchImages()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Failed to delete image')
    }
  }

  const handleTogglePublish = async (image) => {
    try {
      const response = await fetch(`/api/content/${image._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          isPublished: !image.isPublished
        })
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`Image ${image.isPublished ? 'unpublished' : 'published'} successfully!`)
        fetchImages()
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error('Error updating image:', error)
      toast.error('Failed to update image')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Grid className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Infrastructure Gallery</h2>
              <p className="text-sm text-gray-600">Manage infrastructure photos displayed on the website</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Images</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Images</p>
                <p className="text-2xl font-bold text-blue-900">{images.length}</p>
              </div>
              <Image className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Published</p>
                <p className="text-2xl font-bold text-green-900">
                  {images.filter(img => img.isPublished).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Draft</p>
                <p className="text-2xl font-bold text-orange-900">
                  {images.filter(img => !img.isPublished).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Categories</p>
                <p className="text-2xl font-bold text-purple-900">
                  {new Set(images.map(img => img.data?.category)).size}
                </p>
              </div>
              <Grid className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Image Gallery</h3>
        
        {images.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No images uploaded yet</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add First Image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div key={image._id} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={image.data?.imagePath}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 truncate">{image.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {categories.find(cat => cat.value === image.data?.category)?.label}
                  </p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {image.data?.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      image.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {image.isPublished ? 'Published' : 'Draft'}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTogglePublish(image)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title={image.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image._id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Images Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Infrastructure Images</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Image title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newImage.description}
                    onChange={(e) => setNewImage(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Image description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="gallery-images"
                    />
                    <label
                      htmlFor="gallery-images"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Click to select images
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG, PNG up to 5MB each
                      </span>
                    </label>
                  </div>
                  {selectedFiles.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="publishImages"
                    checked={newImage.isPublished}
                    onChange={(e) => setNewImage(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="publishImages" className="text-sm text-gray-700">
                    Publish images immediately
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddImages}
                  disabled={saving || selectedFiles.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Uploading...' : 'Add Images'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfrastructureGalleryManagement
