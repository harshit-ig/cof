import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, AlertTriangle, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center section-padding relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/15 to-blue-500/15 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400/15 to-indigo-500/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 left-1/6 w-20 h-20 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-indigo-400/10 to-purple-500/10 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>

      <div className="text-center max-w-lg mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-blue-100/50 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full transform -translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-400/15 to-blue-500/15 rounded-full transform translate-x-20 translate-y-20 group-hover:scale-110 transition-transform duration-300"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AlertTriangle className="w-10 h-10 text-blue-600" />
              </div>
              
              <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4 animate-pulse">
                404
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Oops! The page you're looking for seems to have sailed away. 
                Let's get you back to familiar waters.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Home className="h-5 w-5 mr-2" />
                Return Home
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Search className="w-4 h-4 mr-2" />
                <span>Lost? Try searching from the homepage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound






