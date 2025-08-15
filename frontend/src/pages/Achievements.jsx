import React from 'react';

const Achievements = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
    <div className="max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Achievements</h1>
      <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
      <p className="text-lg text-gray-700 mb-8">
        The College of Fisheries, Kishanganj is proud of its achievements in education, research, and extension activities. Here we highlight some of our key milestones and recognitions.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800 font-medium">Achievements will be updated soon.<br/>Please check back for the latest accomplishments of our college and students.</p>
      </div>
    </div>
  </div>
);

export default Achievements;