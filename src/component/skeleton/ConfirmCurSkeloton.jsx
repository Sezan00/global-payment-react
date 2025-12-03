import React from 'react'

export const ConfirmCurSkeloton = () => {
  return (
   <>
   <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 animate-pulse">
    <h2 className="h-10 bg-gray-300 rounded w-3/4 mx-auto mb-6"></h2>

    <div className="space-y-4">

      {/* Sending Amount Skeleton */}
      <div className="flex justify-between items-center bg-blue-50 px-5 py-4 rounded-xl border border-blue-100">
        <span className="h-4 bg-gray-300 rounded w-1/2"></span>
        <span className="h-6 bg-gray-300 rounded w-20"></span>
      </div>

      {/* Receiver Amount Skeleton */}
      <div className="flex justify-between items-center bg-green-50 px-5 py-4 rounded-xl border border-green-100">
        <span className="h-4 bg-gray-300 rounded w-1/2"></span>
        <span className="h-6 bg-gray-300 rounded w-20"></span>
      </div>

      {/* Exchange Rate Skeleton */}
      <div className="flex justify-between items-center bg-gray-50 px-5 py-4 rounded-xl border border-gray-200">
        <span className="h-4 bg-gray-300 rounded w-1/3"></span>
        <span className="h-5 bg-gray-300 rounded w-24"></span>
      </div>

    </div>

    {/* Divider */}
    <div className="my-6 border-t border-gray-200"></div>

    {/* Confirm Button Skeleton */}
    <div className="h-12 bg-blue-300 rounded-xl w-full"></div>
  </div>
</div>

   </>
  )
}

export default ConfirmCurSkeloton;
