import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import RecipientSkelotn from '../component/skeleton/RecipientSkelotn';


export const RecipientList = () => {
  const {id} = useParams();
  const [RecipientList, setRecipientList] = useState(null)
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedId, setSelectedId] = useState(null);


  const navigate = useNavigate();

  useEffect(()=>{
    const fetchRecipient = async ()=>{
      try{
        const token = localStorage.getItem('token');
         const res = await axios.get(`https://global-backend.sezan.xyz/api/recipients-list?quotation_id=${id}`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }
         });
         setRecipientList(res.data.data);
          console.log("Full Response:", res.data);
       console.log("Recipient List:", res.data.data);
       console.log("Quotation ID:", id);
      } catch(error){
        console.log('error data', error)
      } finally{
        setLoading(false)
      }
    }
   if(id) fetchRecipient();
  }, [id])

  if(loading) return  <RecipientSkelotn/>;
  if(!RecipientList) return <div></div>

  const handleSelectRecipient = async (recipient_id) => {
    try {
    const token = localStorage.getItem('token');

    const res = await axios.post(
      'https://global-backend.sezan.xyz/api/trainsaction',
      {
        quotation_id: id,        
        recipient_id: recipient_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate(`/sourcfund-realtion/${res.data.data.id}`);

  } catch (err) {
    console.log('transaction error', err);
  }
  }


  return (
    <>
        
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 tracking-tight text-gray-900">Recipient List</h2>
        <div className='flex justify-end'>
    
        </div>
          

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mt-5">
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
                {RecipientList && RecipientList.length  > 0 ?  (
                RecipientList?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={()=> {setSelectedId(item.id)
                      handleSelectRecipient(item.id);
                    }}
                    
                    className={`cursor-pointer transition-colors duration-200
                        ${selectedId === item.id ? 'bg-blue-100' : 'odd:bg-white even:bg-gray-50'}
                      `}
                  >
                    <td className="px-6 py-4 font-medium">{item.full_name}</td>
                    <td className="px-6 py-4">{item.city}</td>
                    <td className="px-6 py-4">{item.bank_name}</td>
                    <td className="px-6 py-4 font-mono">{item.phone}</td>
                   
                  </tr>
                )) 
              ): (
               <tr>
      <td colSpan="5" className="text-center py-4 text-gray-500">
        No Recipient Found
        <div className="mt-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate(`/recipient-create/${id}`)}
          >
            Create Recipient
          </button>
        </div>
      </td>
    </tr>

              )}
              
              </tbody>
            </table>

          </div>
        </div>
</div>

    </>
  )
}

export default RecipientList;
