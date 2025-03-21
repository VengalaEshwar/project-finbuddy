import React from 'react'

function LoadingComponents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="feature-card">
          <div className="bg-gray-200 animate-pulse h-40 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-1"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-1 w-5/6"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6"></div>
        </div>
      ))}
    </div>
  )
}

export default LoadingComponents