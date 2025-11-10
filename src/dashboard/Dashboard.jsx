import React from 'react'
import { logout } from '../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = localStorage.getItem("user");
  console.log(userData);
    const user = userData ? JSON.parse(userData) : null;
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  }
  return (
    <>
      
  <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">Payment Dashboard</h1>
          </div>

          <nav className="mt-6 space-y-2">
            <div
              onClick={() => navigate("/payment")}  
            className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-full cursor-pointer">
              Dashboard
            </div>
            <div className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-full cursor-pointer">
              Payments
            </div>
            <div className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-full cursor-pointer">
              Analytics
            </div>
            <div className="px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-r-full cursor-pointer">
              Settings
            </div>
          </nav>
        </div>
        <button onClick={handleLogout} className='px-2 py-1 bg-red-300 hover:bg-red-700 text-white font-semibold duration-200 rounded-md'>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          User Payment Dashboard
        </h1>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Balance</p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">$2,500.00</h2>
          </div>

        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Transactions
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-sm hover:bg-gray-50">
                <td className="p-2">2025-11-09</td>
                <td className="p-2">Payment to John Doe</td>
                <td className="p-2 text-red-500">-$120.00</td>
                <td className="p-2 text-yellow-600">Pending</td>
              </tr>
              <tr className="border-b text-sm hover:bg-gray-50">
                <td className="p-2">2025-11-08</td>
                <td className="p-2">Salary Received</td>
                <td className="p-2 text-green-500">+$2,000.00</td>
                <td className="p-2 text-green-600">Completed</td>
              </tr>
              <tr className="text-sm hover:bg-gray-50">
                <td className="p-2">2025-11-05</td>
                <td className="p-2">Netflix Subscription</td>
                <td className="p-2 text-red-500">-$10.00</td>
                <td className="p-2 text-green-600">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
      
    </>
   
  )
}

export default Dashboard;