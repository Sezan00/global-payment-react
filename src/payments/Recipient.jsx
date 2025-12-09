import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const Recipient = () => {
  const [quotation, setQuotation] = useState(null);
  const {id} = useParams();
  
  const [formData, SetFormData] = useState({
      receive_type: "",
      full_name: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      bank_name: "",
      bank_account: "",
      wallet_type: "",
      wallet_number: ""
  });

  const handleChange = (e) => {
    SetFormData({...formData, [e.target.name]: e.target.value});
    
  }



  useEffect(()=>{
     if(!quotation) return;
     
     const fetchContry = async ()=>{
       const token = localStorage.getItem('token');
        if(!token) return;
      try{
        const res = await axios.get(`http://localhost:8000/api/recipients/country/${id}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setQuotation(res.data.data);
      } catch(error){
        console.log('Api not found', error)
      }
     }
     fetchContry();
  }, [id])

  useEffect(()=>{
    if(quotation?.target_currency?.id){
      SetFormData(prev=>({
        ...prev,
        target_country_currency_id: quotation.target_currency.id
      }));
    }
  }, [quotation])


    const handleSubmit = async (e)=> {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if(!token) return;

    try{
      const res = await axios.post('http://localhost:8000/api/recipients/store',
        {quotation_id:id,
          target_country_currency_id: formData.target_country_currency_id,
          ...formData
        },
        {
          headers:{
             Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Saved', res.data);
    }catch(error){
      console.log("Erorr", error.response?.data || error);
    }
    
  };

  return (
    <>
   <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 tracking-wide">
          Add New Recipient
        </h1>
        <p className="text-center text-gray-500 mt-1 text-sm">
          Fill in the required details to continue
        </p>

        {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {/* Recipient Type */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">
              Recipient Type
            </label>
            <select name='receive_type' onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
              <option value="">Select Type</option>
              <option value="person">Person</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Full Name</label>
            <input
              name='full_name'
              onChange={handleChange}
              type="text"
              placeholder="Enter full name"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Country */}
          {/* <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Country</label>
            {quotation?.target_currency?.country ? (
              <p className='w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition' value={quotation.target_currency.country.id}> {quotation.target_currency.country.name} </p>
            ) : (
               <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
            )
            }
        
          </div> */}

          {/* Currency */}
          {/* <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Currency</label>
    
              {quotation?.target_currency?.currency ?(
                <p className='w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition' value={quotation.target_currency.currency.id}> {quotation.target_currency.currency.name} </p>
              ): (
                <div className='w-full h-10 bg-gray-300 rounded-lg animate-pulse'></div>
              )
            
            }
         
          </div> */}

              {/* bank name  */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Bank Name</label>
            <input
              name='bank_name'
              onChange={handleChange}
              type="text"
              placeholder="Enter bank name"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Account Number */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">
              Account Number (optional)
            </label>
            <input
              name='bank_account'
              onChange={handleChange}
              type="text"
              placeholder="Enter account number"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
            {/* address  */}
           <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Address (optional)</label>
            <input
              name='address'
              onChange={handleChange}
              type="text"
              placeholder="Enter address"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Email (optional)</label>
            <input
              name='email'
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Phone (optional)</label>
            <input
              name='phone'
              onChange={handleChange}
              type="text"
              placeholder="Phone number"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* city  */}

          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">City (optional)</label>
            <input
              name='city'
              onChange={handleChange}
              type="text"
              placeholder="Enter city"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
              {/* wallet type */}
           <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Wallet Type (optional)</label>
            <select 
            name='wallet_type'
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
              <option value="">Select Method</option>
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
            </select>
          </div>

          {/* wallet number  */}

           <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Wallet Number (optional)</label>
            <input
              name='wallet_number'
              onChange={handleChange}
              type="text"
              placeholder="Wallet number"
              className="w-full p-3 rounded-lg bg-gray-100 focus:bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-lg"
          >
            Save Recipient
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Recipient;