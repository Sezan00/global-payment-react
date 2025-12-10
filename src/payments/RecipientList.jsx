import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RecipientSkelotn from '../component/skeleton/RecipientSkelotn';


export const RecipientList = () => {
  const [RecipientList, setRecipientList] = useState(null)
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchRecipient = async ()=>{
      try{
        const token = localStorage.getItem('token');
         const res = await axios.get('http://localhost:8000/api/recipients-list', {
          headers:{
            Authorization: `Bearer ${token}`,
          }
         });
         setRecipientList(res.data.data);
          console.log("Full Response:", res.data);
       console.log("Recipient List:", res.data.data);
      } catch(error){
        console.log('error data', error)
      } finally{
        setLoading(false)
      }
    }
    fetchRecipient();
  }, [])

  if(loading) return  <RecipientSkelotn/>;
  if(!RecipientList) return <div></div>
  
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
                {RecipientList?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/recipient-view/${item.id}`)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 odd:bg-white even:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">{item.full_name}</td>
                    <td className="px-6 py-4">{item.city}</td>
                    <td className="px-6 py-4">{item.bank_name}</td>
                    <td className="px-6 py-4 font-mono">{item.phone}</td>
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

export default RecipientList;
