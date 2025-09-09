import React, { useState } from 'react'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  loading = 'lazy',
  fallback = null,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError && fallback) {
    return fallback
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        sizes={sizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default OptimizedImage 






