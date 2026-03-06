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
    const [relation, setRelation] = useState([]);
    const [countryCurrencie, setCountryCurencie] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    //data fetching country currency 
      useEffect(()=>{
    const fetchCountryCurrencies = async () => {

      const token = localStorage.getItem('token');
      try{
        const res = await axios.get(`https://global-backend.sezan.xyz/api/country-currencie`,{
          headers:{Authorization: `Bearer ${token}`}
        })
         setCountryCurencie(res.data);
         console.log('Res Data', res);
      } catch(error){
        console.log('error data', error)
      } 
   };
   fetchCountryCurrencies();
  },[]);
  //fetching and geting relation data 
const fetchRelation = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`https://global-backend.sezan.xyz/api/relations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRelation(res.data);
  } catch (err) {
    console.log('Error fetching relations:', err);
  }
};

useEffect(() => {
  fetchRelation();
}, []);

  // show recipient data from database 
  const fetchSingleRecipient = async () =>{
    try{
        const token = localStorage.getItem('token');
         const res = await axios.get(`https://global-backend.sezan.xyz/api/recipients/${id}`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setSingleRecipient(res.data)
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
      setSuccessMessage(null)
      setErrorMessage(null);

      const token = localStorage.getItem('token');

      const res = await axios.put(
        `https://global-backend.sezan.xyz/api/recipient/edit/${id}`,
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
     setSuccessMessage(res.data.message);

    } catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.")
      }
      console.log(err);
    }
  };
    const fields = [
      'receive_type',
      'full_name',
      'relation_id',
      'target_country_currency_id',
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
          {errorMessage &&(
            <h3 className='text-3xl text-red-500'>{errorMessage}</h3>
          )}

          {successMessage && (
            <h3 className='text-3xl text-blue-400'>{successMessage}</h3>
          )}

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

            {/* Recipient type  */}

          <div className='p-4 bg-gray-100 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:translate-y-1'
            onClick={()=>{
              setEditField('receive_type')
              setEditValue(singleRecipient?.Recipient?.receive_type)
            }}
          >
            <p className='text-gray-500 text-sm'>Recipient Type</p>
            {editField === 'receive_type' ? (
              <select   
               className='w-full p-2 border rounded-lg bg-white'
                value={editValue}
                onChange={(e)=> {setEditValue(e.target.value);
                 updateRecipient('receive_type', e.target.value);
                }}
                onBlur={()=>{
                  setEditField(null);
                }}
              >
                <option value="">Select Type</option>
                <option value="business">Business</option>
                <option value="Person">Person</option>
              </select>
            ) : (
                <p className="text-gray-800 font-semibold"> {singleRecipient?.Recipient?.receive_type ?? "Null"}</p>
            )
          }
          </div>

 {/* Relation section  */}

      <div className='space-y-1'>
        <p className="text-gray-500 text-sm">Relation</p>

        {editField === 'relation_id' ? (
          <select
            className='w-full p-2 border rounded-lg bg-white'
            name='relation_id'
            value={editValue || ''}
            onChange={(e) => {
              setEditValue(e.target.value);
              updateRecipient('relation_id', e.target.value);
            }}
            onBlur={() => setEditField(null)}
            autoFocus
          >
            <option value="">Select Relation</option>
            {relation.map(itemRln => (
              <option key={itemRln.id} value={itemRln.id}>
                {itemRln.relation}
              </option>
            ))}
          </select>
        ) : (
          <div
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-pointer"
            onClick={() => setEditField('relation_id')}
          >
            {relation.length > 0 && singleRecipient?.Recipient?.relation_id
              ? relation.find(r => r.id === singleRecipient.Recipient.relation_id)?.relation
              : "Null"}
          </div>
        )}
      </div>

        {/* contry  */}
        <div className='space-y-1'>
          <p className='text-gray-500 text-sm'>Country</p>
          {editField === 'target_country_currency_id' ? (
            <select
              className='w-full p-2 border rounded-lg bg-white'
              value={selectedCountry}
              onChange={(e)=>{
                const countryId = e.target.value
                setSelectedCountry(countryId)

                const list = countryCurrencie[countryId] || [];
                setCurrencies(list);
                setEditValue('');
              }}
            >
              <option value="">Select Country</option>
              {Object.values(countryCurrencie).map(item => (
                <option key={item[0].country.id} value={item[0].country.id}>
                  {item[0].country.name}  
                </option>
              ))}
            </select>
          ) : (
            <div 
              className='w-full p-2 border rounded-lg bg-gray-100 cursor-pointer'
               onClick={()=> setEditField('target_country_currency_id')}
            >
              {singleRecipient?.Recipient?.country_currency?.country?.name ?? "NULL"}
            </div>
          )}
        </div>

        {/* currencie section  */}

        <div className='space-y-1'>
          <p className='text-gray-500 text-sm'>Country</p>
          {editField === 'target_country_currency_id' ? (
            <select
             className='w-full p-2 border rounded-lg bg-white'
             value={editValue  || ''}
             onChange={(e) => {
              const value  = e.target.value
              setEditValue(value);
              updateRecipient('target_country_currency_id', value);
             }}
            >
              <option value="">Select Currency</option>
              {currencies.map(item=> (
                <option key={item.id} value={item.id}>
                    {item.currency.name} ({item.currency.code})
                </option>
              ))}
            </select>
          ) : (
           <div className='w-full p-2 border rounded-lg bg-gray-100 cursor-pointer'
              onClick={()=> setEditField('target_country_currency_id')}
           >  
            {singleRecipient?.Recipient?.country_currency?.currency?.name}

           </div>
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
            <select
              className='w-full p-2 border rounded-lg bg-white'
              value={editValue}
              onChange={(e)=> {setEditValue(e.target.value);
                updateRecipient('wallet_type', e.target.value);
              }}
              onBlur={() => setEditField(null)}
            >
              <option value="">Select Wallet Type</option>
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
            </select>
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
          Next
          </button>


          </div>
          </div>
          </div>
    
    </>
  )
}

export default RecipientFull;
