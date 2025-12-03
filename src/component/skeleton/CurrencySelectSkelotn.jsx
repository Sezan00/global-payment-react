import React from 'react'

export const CurrencySelectSkelotn = () => {
  return (
    <>
       <div className="w-full animate-pulse">
      {/* Label skeleton */}
      <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>

      {/* Dropdown box skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
    </div>
    </>
  )
}

export default CurrencySelectSkelotn;
