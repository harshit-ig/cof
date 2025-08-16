import React, { useState } from 'react'
import { Upload, Image, FileText, Check, X, AlertCircle } from 'lucide-react'
import { uploadAPI } from '../../services/api'
import ImageUpload from './ImageUpload'
import toast from 'react-hot-toast'

const FileUploadDemo = () => {
  const [uploadResults, setUploadResults] = useState([])
  const [activeTab, setActiveTab] = useState('images')

  const handleUploadSuccess = (file, type) => {
    const result = {
      id: Date.now(),
      file,
      type,
      timestamp: new Date().toLocaleString()
    }
    setUploadResults(prev => [result, ...prev])
  }

  const getImageUrl = (filename, type) => {
    return uploadAPI.getImageUrl(filename, type)
  }

  const clearResults = () => {
    setUploadResults([])
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🖼️ Image Upload System
        </h1>
        <p className="text-gray-600">
          Upload and manage images for faculty, news, research, and general content
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'images', label: 'General Images', icon: Image },
            { id: 'faculty', label: 'Faculty Photos', icon: Image },
            { id: 'news', label: 'News Images', icon: Image },
            { id: 'research', label: 'Research Images', icon: Image },
            { id: 'documents', label: 'Documents', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Upload {activeTab === 'documents' ? 'Documents' : 'Images'} - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <p className="text-sm text-gray-600">
            {activeTab === 'documents' 
              ? 'Upload PDF, DOC, XLS, and other document files'
              : `Upload images for ${activeTab === 'images' ? 'general use' : activeTab}`
            }
          </p>
        </div>

        <ImageUpload
          onUploadSuccess={(file) => handleUploadSuccess(file, activeTab)}
          uploadType={activeTab}
          maxFiles={activeTab === 'faculty' ? 1 : 5}
          acceptedTypes={activeTab === 'documents' ? 'document/*' : 'image/*'}
          showPreview={true}
        />
      </div>

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload History ({uploadResults.length})
            </h3>
            <button
              onClick={clearResults}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {uploadResults.map((result) => (
              <div key={result.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  {/* File Preview */}
                  <div className="flex-shrink-0">
                    {result.file.mimetype.startsWith('image/') ? (
                      <img
                        src={getImageUrl(result.file.filename, result.type)}
                        alt={result.file.originalName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.file.originalName}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        result.type === 'faculty' ? 'bg-blue-100 text-blue-800' :
                        result.type === 'news' ? 'bg-green-100 text-green-800' :
                        result.type === 'research' ? 'bg-purple-100 text-purple-800' :
                        result.type === 'documents' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.type}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-4">
                        <span>Size: {(result.file.size / 1024).toFixed(1)} KB</span>
                        <span>Type: {result.file.mimetype}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Filename: <code className="bg-gray-100 px-1 rounded text-xs">{result.file.filename}</code></span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Uploaded: {result.timestamp}
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">
                        <span className="font-medium">Direct URL:</span>
                        <code className="ml-2 bg-gray-100 px-1 rounded">
                          /uploads/{result.type}/{result.file.filename}
                        </code>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">API URL:</span>
                        <code className="ml-2 bg-gray-100 px-1 rounded">
                          /api/upload/serve/{result.type}/{result.file.filename}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              How to Use the Image Upload System
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <div>
                <strong>1. Choose Upload Type:</strong> Select the appropriate tab for your content type (faculty photos, news images, etc.)
              </div>
              <div>
                <strong>2. Upload Files:</strong> Drag and drop files or click to browse. Images are automatically organized into folders.
              </div>
              <div>
                <strong>3. Use in Content:</strong> Copy the filename from upload results and use it in faculty/news/research forms.
              </div>
              <div>
                <strong>4. Integration:</strong> The uploaded images will automatically appear in the admin panels for faculty, news, and research management.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadDemo
