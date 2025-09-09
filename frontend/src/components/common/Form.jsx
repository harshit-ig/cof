import React, { useState } from 'react'
import { Eye, EyeOff, Upload, X } from 'lucide-react'

// Form Container Component
export const Form = ({ 
  onSubmit, 
  children, 
  className = '',
  isLoading = false,
  ...props 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isLoading && onSubmit) {
      onSubmit(e)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-6 ${className}`} 
      {...props}
    >
      {children}
    </form>
  )
}

// Form Group Component
export const FormGroup = ({ 
  label, 
  children, 
  error, 
  required = false, 
  className = '',
  id,
  ...props 
}) => {
  return (
    <div className={`space-y-1 ${className}`} {...props}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

// Input Component
export const Input = ({ 
  type = 'text', 
  error, 
  className = '',
  ...props 
}) => {
  const errorClass = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
  
  return (
    <input
      type={type}
      className={`form-input ${errorClass} ${className}`}
      {...props}
    />
  )
}

// Password Input Component
export const PasswordInput = ({ 
  error, 
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const errorClass = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className={`form-input pr-10 ${errorClass} ${className}`}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  )
}

// Textarea Component
export const Textarea = ({ 
  error, 
  className = '',
  rows = 4,
  ...props 
}) => {
  const errorClass = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
  
  return (
    <textarea
      rows={rows}
      className={`form-textarea ${errorClass} ${className}`}
      {...props}
    />
  )
}

// Select Component
export const Select = ({ 
  options = [], 
  error, 
  placeholder = 'Select an option',
  className = '',
  ...props 
}) => {
  const errorClass = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
  
  return (
    <select
      className={`form-select ${errorClass} ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  )
}

// Checkbox Component
export const Checkbox = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-500 focus:ring-primary-500 border-gray-300 rounded"
        {...props}
      />
      {label && (
        <label className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
      {error && <p className="form-error ml-6">{error}</p>}
    </div>
  )
}

// Radio Group Component
export const RadioGroup = ({ 
  name, 
  options = [], 
  value, 
  onChange, 
  error,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${index}`}
            name={name}
            value={option.value || option}
            checked={value === (option.value || option)}
            onChange={onChange}
            className="h-4 w-4 text-blue-500 focus:ring-primary-500 border-gray-300"
          />
          <label 
            htmlFor={`${name}-${index}`}
            className="ml-2 block text-sm text-gray-700"
          >
            {option.label || option}
          </label>
        </div>
      ))}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

// File Upload Component
export const FileUpload = ({ 
  accept, 
  multiple = false, 
  onFileSelect, 
  error,
  maxSize = 5,
  allowedTypes = [],
  className = '',
  ...props 
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])

  const handleFiles = (fileList) => {
    const validFiles = []
    const errors = []

    Array.from(fileList).forEach(file => {
      // Check file size (in MB)
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} is too large. Maximum size is ${maxSize}MB.`)
        return
      }

      // Check file type
      if (allowedTypes.length > 0) {
        const fileType = file.type.toLowerCase()
        const fileExtension = file.name.split('.').pop().toLowerCase()
        
        const isValidType = allowedTypes.some(type => 
          fileType.includes(type.toLowerCase()) || 
          fileExtension === type.toLowerCase().replace('.', '')
        )

        if (!isValidType) {
          errors.push(`${file.name} is not a supported file type.`)
          return
        }
      }

      validFiles.push(file)
    })

    if (validFiles.length > 0) {
      setFiles(multiple ? [...files, ...validFiles] : validFiles)
      onFileSelect && onFileSelect(multiple ? validFiles : validFiles[0])
    }

    if (errors.length > 0) {
      console.error('File upload errors:', errors)
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

  return (
    <div className={`relative ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
        <div className="text-gray-600">
          <Upload className="h-8 w-8 mx-auto mb-2" />
          <p>Drop files here or click to browse</p>
          {maxSize && (
            <p className="text-sm text-gray-500 mt-1">
              Maximum file size: {maxSize}MB
            </p>
          )}
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <File className="h-4 w-4 mr-2" />
                {file.name}
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = files.filter((_, i) => i !== index)
                    setFiles(newFiles)
                    onFileSelect && onFileSelect(multiple ? newFiles : null)
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {error && <p className="form-error mt-2">{error}</p>}
    </div>
  )
}

// Submit Button Component
export const SubmitButton = ({ 
  children, 
  isLoading = false, 
  loadingText = 'Processing...',
  className = '',
  ...props 
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Form






