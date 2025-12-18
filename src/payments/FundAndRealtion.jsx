import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const FundAndRealtion = () => {
  const [SourceFund, setSourceFund]         = useState([]);
  const [Realtion, setRealtion] = useState([]);
  const [Transfer, setTransfer] = useState([]);
  const [loading, setLoading]   = useState(true);

  const [formData, setFormData] = useState({
    'realtion_id':'',
    'source_of_fund_id':'',
    'purpose_of_transfer_id':'',
  })

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:8000/api/master-data`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
    }).then(res => {
      setSourceFund(res.data.SourceOfFund);
      setRealtion(res.data.Realton);
      setTransfer(res.data.purposeOfTransfer);
    }).finally(()=> setLoading(false))
  }, []);

  const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      });
  };

  return (
    <>
      <div className='min-h-screen bg-gray-100 flex justify-center items-center px-4'>
        <div className='w-full max-w-xl bg-white p-8 rounded-lg shadow-lg'>
          <label className='block text-gray-500 mb-1'>Source Of Fund</label>
          <select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' name="source_of_fund_id" onChange={handleChange}>
            <option value={formData.source_of_fund_id}>Select Source</option>
            {SourceFund.map(src => (
                 <option value={src.id} key={src.id}>{src.source_fund}</option>
              ))}
          </select>

        <div>
          <label className='block text-gray-500 mb-1 mt-2'>Realtion</label>
           <select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' name="realtion_id" id="" value={formData.realtion_id} onChange={handleChange}>
              <option value="">Select Realtion</option>
              {Realtion.map(rln => (
                 <option value={rln.id} key={rln.id}>{rln.relation}</option>
              ))}
           </select>
        </div>

        <div>
            <label className='block text-gray-500 mb-1 mt-2'>Purpose Of Transfer</label>
            <select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' name="purpose_of_transfer_id" id="" value={formData.purpose_of_transfer_id} onChange={handleChange}>
              <option value="">Select Transfer</option>
              {Transfer.map(trans => (
                <option value={trans.id} key={trans.id}>{trans.purpose_transfer}</option>
              ))}
            </select>
        </div>
         </div>

      </div>
    </>
  )
}

export default FundAndRealtion;
