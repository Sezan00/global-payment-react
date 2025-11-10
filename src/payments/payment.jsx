import React from 'react'

export const payment = () => {
  return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Payment Details</h2>
            
            <div className="mb-4">
            <label className="block text-gray-500 mb-1">Name</label>
            <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-500 mb-1">Card Number</label>
            <input
                type="text"
                placeholder="**** **** **** 1234"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            </div>

            <div className="flex gap-4 mb-4">
            <div className="flex-1">
                <label className="block text-gray-500 mb-1">Expiry</label>
                <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="flex-1">
                <label className="block text-gray-500 mb-1">Currency</label>
                <input
                type="text"
                placeholder="USD"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            </div>

            <div className="mb-6">
            <label className="block text-gray-500 mb-1">Card Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Card Type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="amex">Amex</option>
            </select>
            </div>

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600">
            Submit Payment
            </button>
        </div>
        </div>
  )
}

export default payment;