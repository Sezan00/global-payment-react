import React, { useEffect, useState } from 'react'
import { getPurposeTransfer, getRelations, getSourceFunds } from '../Api/relations';

export const payment = () => {

    const [relations, setRelations] = useState([]);
    const [selectedRelation, setSelectedRelation] = useState("");
    
    const [sourceofunds, setSourceFunds] = useState([]);
    const [selectedSourceOfFund, setSelectedSourceOfFund] = useState("");

    const [purposeTransfer, setPurposeTransfer] = useState([]);
    const [selectPurposeTransfer, setSelectPurposeTransfer] = useState("");

    useEffect(()=>{
        const fetchRelations = async()=>{
            try{
                const data = await getRelations();
                // console.log("data result", data);
                 setRelations(data);
            } catch (err){
                console.log(err);
            }
        };
        fetchRelations();
    }, []);

    useEffect(() => {
  const fetchSourceFunds = async () => {
    try {
      const data = await getSourceFunds();
    //   console.log("Source of Fund Data:", data);
      setSourceFunds(data);
    } catch (err) {
      console.error("Error fetching source funds:", err);
    }
  };

  fetchSourceFunds();
}, []);


  useEffect(()=>{
    const fetchPurposeTransfer = async()=>{
        try{
            const data = await getPurposeTransfer();
            console.log("purpose of transfer:", data.data);
             setPurposeTransfer(data.data ?? data ?? []);
        } catch(err){
            console.log("Error fetching error purpose of transfer:", err);
        }   
    };
    fetchPurposeTransfer()
  }, [])

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
            <div className='mb-4'>
                 <label className="block text-gray-500 mb-1">Relation</label>
                <select 
                value={selectedRelation} 
                onChange={(e)=>setSelectedRelation(e.target.value)} 
                name="" 
                id="" 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    <option value="">Selected Relation</option>
                    {relations.map((relation)=>(
                        <option className='text-black' key={relation.id} value={relation.id}>
                            {relation.relation}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mb-4'>
                 <label className="block text-gray-500 mb-1">Source of fund</label>
                <select 
                value={selectedSourceOfFund}
                onChange={(e)=>setSelectedSourceOfFund(e.target.value)} 
                name="" 
                id="" 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    <option value="">Source of fund</option>
                    {sourceofunds.map((sourceFund)=>(
                        <option value={sourceFund.id} key={sourceFund.id}>
                            {sourceFund.source_fund}
                        </option>
                    ))}
                    
                </select>
            </div>
            <div className='mb-4'>
                 <label className="block text-gray-500 mb-1">Purpose of transfer</label>
                <select 
                value={selectPurposeTransfer}
                onChange={(e)=>setSelectPurposeTransfer(e.target.value)}
                name="" id="" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    <option value="">Purpose of transfer</option>
                    {purposeTransfer.map((purpose)=>(
                      <option value={purpose.id} key={purpose.id}>
                        {purpose.purpose_transfer}
                        </option>
                    ))}
                   
                </select>
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