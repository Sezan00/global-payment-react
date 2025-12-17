import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RecipientSkelotn from '../component/skeleton/RecipientSkelotn';


export const RecipientList = () => {
  const [RecipientList, setRecipientList] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

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


   const deleteRecipient = async (id) => {
     try{
       const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/recipient/delete/${id}`, {
         headers:{
            Authorization: `Bearer ${token}`,
          }
       });
           setRecipientList(prev => prev.filter(r => r.id !== id));
           setShowModal(false);
           setSelectedRecipient(null);

       console.log('Recipient deleted successfully');
       
     }catch(err){
      console.log(err);
     }
     
   }

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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-800 text-sm">
                {RecipientList && RecipientList.length  > 0 ?  (
                RecipientList?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/recipient-view/${item.id}`)}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 odd:bg-white even:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">{item.full_name}</td>
                    <td className="px-6 py-4">{item.city}</td>
                    <td className="px-6 py-4">{item.bank_name}</td>
                    <td className="px-6 py-4 font-mono">{item.phone}</td>
                    <td> <button 
                       onClick={(e)=> {
                      e.stopPropagation();
                      setSelectedRecipient(item);
                      setShowModal(true)

                    }} className='font-semibold text-white px-4 py-3 mt-1 mb-2 ml-4 bg-red-400 rounded-md shadow-md hover:bg-red-700 duration-400 cursor-pointer' >Delete</button>
                    </td>
                  </tr>
                )) 
              ): (
                    <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Recipient Found
                </td>
              </tr>
              )}
              
              </tbody>
            </table>

            {showModal && selectedRecipient && (
              <div className="fixed inset-0 bg-transparent backdrop-blur-sm  flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                  <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                  <p className="mb-6">
                    Are you sure you want to delete <strong>{selectedRecipient.full_name}</strong>?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteRecipient(selectedRecipient.id)}
                      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              )}

          </div>
        </div>
</div>

    </>
  )
}

export default RecipientList;
