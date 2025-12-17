import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RecipientFullSkeloton from '../component/skeleton/RecipientFullSkeloton';

export const RecipientFull = () => {
    const { id } = useParams();
    const [singleRecipient, setSingleRecipient] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState("");


  const fetchSingleRecipient = async () =>{
    try{
        const token = localStorage.getItem('token');
         const res = await axios.get(`http://localhost:8000/api/recipients/${id}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setSingleRecipient(res.data)
        console.log('Single Recipient:', res.data);
    } catch(Erorr){
      console.log('Error:', Erorr)
    } finally{
      setLoading(false);
    }
   
  }
    useEffect(() => {
      fetchSingleRecipient();
  }, [id]);


  if(Loading){
    return  <RecipientFullSkeloton/>
  }


 const updateRecipient = async (field, value) => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(
        `http://localhost:8000/api/recipient/edit/${id}`,
        {
           field: field,
           value: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
        setSingleRecipient(prev => ({
        ...prev,
        Recipient: {
          ...prev.Recipient,
          [field]: value   
      }
    }));

    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  };
    const fields = [
      'receive_type',
      'full_name',
      'phone',
      'email',
      'city',
      'address',
      'bank_name',
      'bank_account',
      'wallet_type',
      'wallet_number',
    ];
  
  
  return (
    <>
   
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
          <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">


          <h1 className="text-3xl font-semibold text-center text-gray-800 tracking-wide">
          Recipient Details
          </h1>
          <p className="text-center text-gray-500 mt-1 text-sm">
          View all saved recipient information
          </p>
          <p className='flex justify-end font-bold'>
            Create at: {new Date(singleRecipient.Recipient.created_at).toLocaleDateString()}
          </p>

          <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* {singleRecipient.Recipient.map((item)=>(
            <div key={item.id} className="space-y-3"> */}
          

          {/* Receive type section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('receive_type');
              setEditValue(singleRecipient?.Recipient?.receive_type);
            }}
          >
          <p className="text-gray-500 text-sm">Recipient Type</p>
            {editField === "receive_type" ? (
              <input type="text" 
              className="w-full p-2 border rounded-lg bg-white"
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
              onBlur={() => {
              updateRecipient("receive_type", editValue);
              setEditField(null);
            }}                      
              />
            ) : (
              <p className="text-gray-800 font-semibold"> {singleRecipient?.Recipient?.receive_type ?? "Null"}</p>
            )
          }
          </div>

          {/* Full name section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
          onClick={()=>{
            setEditField('full_name');
            setEditValue(singleRecipient?.Recipient?.full_name)
          }}
          >
          <p className="text-gray-500 text-sm">Full Name</p>
            {editField === 'full_name' ? (
              <input
                className='w-full p-2 border rounded-lg bg-white'
                autoFocus
                value={editValue}
                onChange={(e)=> setEditValue(e.target.value)}
                 onBlur={() => {
              updateRecipient("full_name", editValue);
              setEditField(null);
            }}
              />
            ): (
               <p className="text-gray-800 font-semibold cursor-pointer">{singleRecipient?.Recipient?.full_name ?? "Null"}</p>
            )
            
          }
          </div>

          {/* Bank name secton  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField("bank_name");
              setEditValue(singleRecipient?.Recipient?.bank_name);
            }}
          >
          <p className="text-gray-500 text-sm">Bank Name</p>
            {editField === 'bank_name' ? (
              <input
                className='w-full p-2 border rounded-lg bg-white'
                autoFocus
                value={editValue}
                onChange={(e)=> setEditValue(e.target.value)}
                 onBlur={() => {
                updateRecipient("bank_name", editValue);
                setEditField(null);
            }}
              />
            ):(
              <p className="text-gray-800 font-semibold">"{singleRecipient?.Recipient?.bank_name ?? "Null"}"</p>
            )}
          </div>

            {/* Account number  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('bank_account');
              setEditValue(singleRecipient?.Recipient?.bank_account);
            }}
          >
          <p className="text-gray-500 text-sm">Account Number</p>
          {editField === 'bank_account' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("bank_account", editValue);
              setEditField(null);
            }}
            />
          ) : (
              <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.bank_account ?? "Null"}</p>
          )}
        
          </div>

          {/* Address section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('address')
              setEditValue(singleRecipient?.Recipient?.address)
            }}
          >
          <p className="text-gray-500 text-sm">Address</p>
          {editField === 'address' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("address", editValue);
              setEditField(null);
            }}
            />
          ) : (
             <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.address ?? "Null"}</p>
          )}

          </div>

          {/* Email section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('email');
              setEditValue(singleRecipient?.Recipient?.email);
            }}
          >
          <p className="text-gray-500 text-sm">Email</p>
          {editField === 'email' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("email", editValue);
              setEditField(null);
            }}
            />
          ) : (
           <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.email ?? "Null"}</p>
          )
        }
          </div>

          {/* Phone number section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('phone')
              setEditValue(singleRecipient?.Recipient?.phone)
            }}
          >
          <p className="text-gray-500 text-sm">Phone</p>
          {editField === 'phone' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("phone", editValue);
              setEditField(null);
            }}
            />
          ) : (
              <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.phone ?? "Null"}</p>
          )}
        
          </div>

            {/* City Section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('city')
              setEditValue(singleRecipient?.Recipient?.city)
            }}
          >
          <p className="text-gray-500 text-sm">City</p>
          {editField === 'city' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=> setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("city", editValue);
              setEditField(null);
            }}
            />
          ) : (
             <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.city ?? "Null"}</p>
          )}

          </div>

           {/* Wallet type section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
            onClick={()=>{
              setEditField('wallet_type');
              setEditValue(singleRecipient?.Recipient?.wallet_type);
            }}
          >
          <p className="text-gray-500 text-sm">Wallet Type</p>
          {editField === 'wallet_type' ? (
            <input
              className='w-full p-2 border rounded-lg bg-white'
              autoFocus
              value={editValue}
              onChange={(e)=>setEditValue(e.target.value)}
               onBlur={() => {
              updateRecipient("wallet_type", editValue);
              setEditField(null);
            }}
            />
          ) : (
            <p className="text-gray-800 font-semibold capitalize">{singleRecipient?.Recipient?.wallet_type ?? "Null"}</p>
          )}
          
          </div>

          {/* Wallet Number section  */}
          <div className="p-4 bg-gray-100 rounded-xl border cursor-pointer ransition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1"
           onClick={()=>{
              setEditField('wallet_number')
              setEditValue(singleRecipient?.Recipient?.wallet_number)
           }}
          >
          <p className="text-gray-500 text-sm">Wallet Number</p>
           {editField === 'wallet_number' ? (
              <input
                className='w-full p-2 border rounded-lg bg-white'
                autoFocus
                value={editValue}
                onChange={(e)=> setEditValue(e.target.value)}
                 onBlur={() => {
              updateRecipient("wallet_number", editValue);
              setEditField(null);
            }}
              />
           ) : (
             <p className="text-gray-800 font-semibold">{singleRecipient?.Recipient?.wallet_number ?? 'Null'}</p>
           )}
         
          </div>
          {/* </div> */}
          {/* ))} */}
         


          </div>


          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-lg">
          Back
          </button>


          </div>
          </div>
          </div>
    
    </>
  )
}

export default RecipientFull;
