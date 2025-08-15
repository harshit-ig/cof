import React from 'react';

const Library = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
    <div className="max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Library</h1>
      <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
      <p className="text-lg text-gray-700 mb-8">
        The College of Fisheries Library provides access to a wide range of books, journals, and digital resources to support learning and research in fisheries science and allied subjects.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-800 font-medium">Library resources and services will be updated soon.<br/>Please check back for more information.</p>
      </div>
    </div>
  </div>
);

export default Library;