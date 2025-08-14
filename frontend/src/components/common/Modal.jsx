import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props 
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div 
        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        onClick={handleOverlayClick}
      >
        {/* Background overlay with blur */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300" />

        {/* Modal positioning */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />

        {/* Modal content */}
        <div
          className={`relative inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl border border-gray-200 transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6 ${sizeClasses[size]} ${className}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
              )}
              
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  // Use portal to render modal at body level
  return createPortal(modalContent, document.body)
}

// Confirmation Modal Component
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
  ...props 
}) => {
  const typeStyles = {
    danger: {
      confirmBtn: 'inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow-sm transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500',
      icon: 'text-red-600'
    },
    warning: {
      confirmBtn: 'inline-flex items-center justify-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md shadow-sm transition-all duration-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500',
      icon: 'text-yellow-600'
    },
    info: {
      confirmBtn: 'btn-primary',
      icon: 'text-blue-600'
    }
  }

  const styles = typeStyles[type] || typeStyles.info

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      {...props}
    >
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className={`w-full sm:w-auto ${styles.confirmBtn} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            confirmText
          )}
        </button>
        
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="w-full sm:w-auto btn-ghost"
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  )
}

// Image Modal Component
export const ImageModal = ({ 
  isOpen, 
  onClose, 
  src, 
  alt, 
  caption,
  ...props 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="p-0"
      {...props}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black bg-opacity-50 text-white p-2 hover:bg-opacity-70 transition-opacity"
        >
          <X className="h-6 w-6" />
        </button>
        
        <img
          src={src}
          alt={alt}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        
        {caption && (
          <div className="p-4 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              {caption}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Modal