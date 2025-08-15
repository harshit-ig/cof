import React from 'react';

const Workshop = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
    <div className="max-w-xl w-full text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Workshops</h1>
      <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
      <p className="text-lg text-gray-700 mb-8">
        Stay tuned for upcoming workshops, seminars, and training sessions organized by the College of Fisheries, Kishanganj. Our workshops aim to enhance knowledge and skills in fisheries science and aquaculture.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-800 font-medium">No workshops are currently scheduled.<br/>Please check back later for updates.</p>
      </div>
    </div>
  </div>
);

export default Workshop;