import React from 'react'

const Students = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Students Corner</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to know about student life, admissions, scholarships, and opportunities.
          </p>
        </div>
      </section>

      {/* Admission Guidelines Section */}
      <section id="admission" className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Admission Guidelines</h2>
          <p className="text-gray-600 mb-4">Comprehensive information about admission procedures, eligibility criteria, and important dates.</p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-800">Admission guidelines content will be displayed here.</p>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section id="scholarships" className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Scholarships</h2>
          <p className="text-gray-600 mb-4">Available scholarship programs and financial assistance for students.</p>
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-green-800">Scholarship information will be displayed here.</p>
          </div>
        </div>
      </section>

      {/* Student Clubs Section */}
      <section id="clubs" className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Student Clubs</h2>
          <p className="text-gray-600 mb-4">Active student organizations and extracurricular activities.</p>
          <div className="bg-purple-50 p-6 rounded-lg">
            <p className="text-purple-800">Student clubs information will be displayed here.</p>
          </div>
        </div>
      </section>

      {/* Alumni Section */}
      <section id="alumni" className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Alumni</h2>
          <p className="text-gray-600 mb-4">Connect with our distinguished alumni network and success stories.</p>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <p className="text-yellow-800">Alumni information will be displayed here.</p>
          </div>
        </div>
      </section>

      {/* Placement Cell Section */}
      <section id="placement" className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Placement Cell</h2>
          <p className="text-gray-600 mb-4">Career services, placement statistics, and recruitment opportunities.</p>
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-800">Placement cell information will be displayed here.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Students