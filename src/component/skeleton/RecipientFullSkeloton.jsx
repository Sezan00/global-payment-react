import React from 'react'

export const RecipientFullSkeloton = () => {
  return (
    <>
        <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
    <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">

      {/* Title skeleton */}
      <div className="animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-40 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-56 mx-auto mt-3"></div>

        {/* Create At skeleton */}
        <div className="flex justify-end mt-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Repeatable skeleton cards */}
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-100 rounded-xl ">
                <div className="h-3 w-28 bg-gray-200 rounded mb-3"></div>
                <div className="h-5 w-full bg-gray-300 rounded"></div>
              </div>
            ))}

          </div>
        </div>

        <div className="mt-6">
          <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
    
    </>
  )
}

export default RecipientFullSkeloton;

