import React from 'react';

const Media = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
    <div className="max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Video / Documentary</h1>
      <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
      <p className="text-lg text-gray-700 mb-8">
        Explore our collection of videos and documentaries showcasing the activities, achievements, and campus life at the College of Fisheries, Kishanganj.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-800 font-medium">No videos or documentaries are available at the moment.<br/>Please check back soon for updates.</p>
      </div>
    </div>
  </div>
);

export default Media;