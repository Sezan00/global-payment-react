import React from 'react'

export const RecipientSkelotn = () => {
  return (
    <>
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 tracking-tight text-gray-900">Recipient List</h2>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Bank</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Account</th>
                    </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
                    {/* Skeleton Rows */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="animate-pulse">
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>

    </>
  )
}

export default RecipientSkelotn;