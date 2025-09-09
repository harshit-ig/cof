import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Form, FormGroup, Input, PasswordInput, SubmitButton } from '../common/Form'
import { Lock, User, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const { login, isAuthenticated, loading, error, clearError } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await login(formData)
      
      if (result.success) {
        toast.success('Login successful!')
        // Navigation will happen automatically due to the Navigate component above
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center section-padding">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Lock className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <Form onSubmit={handleSubmit} isLoading={isSubmitting}>
            <FormGroup
              label="Username or Email"
              required
            >
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </FormGroup>

            <FormGroup
              label="Password"
              required
            >
              <PasswordInput
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton
              isLoading={isSubmitting}
              loadingText="Signing in..."
            >
              Sign In
            </SubmitButton>
          </Form>

          {/* Info Section */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Admin Access Only</p>
                <p>
                  This area is restricted to authorized administrators only. 
                  If you don't have admin credentials, please contact the system administrator.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Fishery College Jabalpur. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin






