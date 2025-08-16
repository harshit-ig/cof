import React, { useState, useRef } from 'react'
import { Upload, X, Image, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { uploadAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ImageUpload = ({ 
  onUploadSuccess, 
  maxFiles = 1, 
  acceptedTypes = 'image/*',
  uploadType = 'images',
  className = '',
  showPreview = true 
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = async (files) => {
    if (files.length === 0) return

    // Validate file count
    if (files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} file(s)`)
      return
    }

    // Validate file types
    const validFiles = Array.from(files).filter(file => {
      if (acceptedTypes === 'image/*') {
        return file.type.startsWith('image/')
      } else if (acceptedTypes === 'document/*') {
        return file.type.startsWith('application/') || 
               file.type === 'text/plain' ||
               file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i)
      }
      return true
    })

    if (validFiles.length !== files.length) {
      toast.error('Some files were rejected due to invalid file type')
    }

    if (validFiles.length === 0) return

    setUploading(true)

    try {
      const uploadPromises = validFiles.map(file => {
        if (maxFiles === 1) {
          return uploadAPI.single(file)
        } else {
          return uploadAPI.single(file) // For now, upload one by one
        }
      })

      const results = await Promise.all(uploadPromises)
      const successfulUploads = results.filter(result => result.data.success)
      
      if (successfulUploads.length > 0) {
        const newFiles = successfulUploads.map(result => result.data.data)
        setUploadedFiles(prev => [...prev, ...newFiles])
        
        toast.success(`${successfulUploads.length} file(s) uploaded successfully`)
        
        // Call success callback
        if (onUploadSuccess) {
          if (maxFiles === 1) {
            onUploadSuccess(newFiles[0])
          } else {
            onUploadSuccess(newFiles)
          }
        }
      }

    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getImageUrl = (filename) => {
    return uploadAPI.getImageUrl(filename, uploadType)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes}
          onChange={handleChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {acceptedTypes === 'image/*' ? 'PNG, JPG, GIF up to 5MB' : 'PDF, DOC, XLS, PPT up to 5MB'}
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files Preview */}
      {showPreview && uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group border rounded-lg p-3 bg-gray-50">
                <div className="flex items-start space-x-3">
                  {/* File Preview */}
                  <div className="flex-shrink-0">
                    {file.mimetype.startsWith('image/') ? (
                      <img
                        src={getImageUrl(file.filename)}
                        alt={file.originalName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <div className="flex items-center mt-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Uploaded</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>• Max files: {maxFiles}</span>
          <span>• Max size: 5MB per file</span>
          <span>• Types: {acceptedTypes === 'image/*' ? 'Images only' : 'Documents only'}</span>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
