import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const FundAndRealtion = () => {
  const {id} = useParams();

  const navigate = useNavigate();
  const [SourceFund, setSourceFund] = useState([]);
  const [Transfer, setTransfer] = useState([]);
  const [loading, setLoading]   = useState(true);

  const [formData, setFormData] = useState({
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
      setTransfer(res.data.purposeOfTransfer);
    }).finally(()=> setLoading(false))
  }, []);

  const handleChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      });
  };

  const handleSubmit = async () => {

    if(!formData.source_of_fund_id || !formData.purpose_of_transfer_id){
      alert('select')
      return;
    }

 const token = localStorage.getItem('token');
    try{
        await axios.put(
          `http://localhost:8000/api/transaction/extra-info/${id}`,
          {
            purpose_of_transfer_id:formData.purpose_of_transfer_id,
            source_of_fund_id:formData.source_of_fund_id,
          },
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        console.log("Submitting:", formData);

         navigate(`/transfer-view/${id}`)
         } catch(error){
            console.log(error);
            alert('bal hyche');
         }
      
  };

  return (
    <>
      <div className='min-h-screen bg-gray-100 flex justify-center items-center px-4'>
        <div className='w-full max-w-xl bg-white p-8 rounded-lg shadow-lg'>
          <label className='block text-gray-500 mb-1'>Source Of Fund</label>

          <select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' 
          name="source_of_fund_id" 
          value={formData.source_of_fund_id} 
          onChange={handleChange}>

        <option value="">Select Source</option>
            {SourceFund.map(src => (
                 <option value={src.id} key={src.id}>{src.source_fund}</option>
              ))}
          </select>

        <div>
            <label className='block text-gray-500 mb-1 mt-2'>Purpose Of Transfer</label>
            <select className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' 
            name="purpose_of_transfer_id" 
            value={formData.purpose_of_transfer_id} 
            onChange={handleChange}>
              <option value="">Select Transfer</option>
              {Transfer.map(trans => (
                <option value={trans.id} key={trans.id}>{trans.purpose_transfer}</option>
              ))}
            </select>
        </div>

         <div className='flex items-center justify-center mt-10'>
              <button 
              className='px-10 py-2 bg-blue-400 font-semibold rounded-md hover:bg-blue-600 duration-200'
              onClick={handleSubmit}
              >
                Next 
              </button>
         </div>
         </div>

      </div>
    </>
  )
}

export default FundAndRealtion;
