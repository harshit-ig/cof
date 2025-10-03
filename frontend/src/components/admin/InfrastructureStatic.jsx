import React from 'react'
import { Building, Info, ExternalLink, Eye } from 'lucide-react'
import Card from '../common/Card'

const InfrastructureStatic = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Infrastructure Management</h1>
            <p className="text-gray-600">College infrastructure and facilities information</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open('/infrastructure', '_blank')}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Static Content Notice */}
      <Card className="p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-6">
            <Info className="h-8 w-8 text-amber-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Static Content Page</h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              The Infrastructure page content is currently <strong>static and fixed</strong>. 
              This means the content cannot be edited through the admin panel.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                </div>
                <div className="ml-3 text-left">
                  <h3 className="text-sm font-medium text-amber-800">
                    Why is this content static?
                  </h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Infrastructure details require specialized layouts and technical specifications</li>
                      <li>Content changes infrequently compared to other sections</li>
                      <li>Maintains consistent presentation and formatting</li>
                      <li>Reduces complexity while ensuring data accuracy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need to update Infrastructure content?</h3>
              <div className="text-gray-600 space-y-3">
                <p>To modify the infrastructure page content, contact your technical administrator or developer.</p>
                <p>Content changes require direct file editing in the source code.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => window.open('/infrastructure', '_blank')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Infrastructure Page
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Go Back
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default InfrastructureStatic