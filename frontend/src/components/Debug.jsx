import React from 'react'

const Debug = () => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h2 className="text-lg font-bold mb-2">Debug Info</h2>
      <p>React is working!</p>
      <p>Current path: {window.location.pathname}</p>
      <p>Environment: {import.meta.env.MODE}</p>
      <p>Base URL: {import.meta.env.BASE_URL}</p>
    </div>
  )
}

export default Debug







