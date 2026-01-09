import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmCurSkeloton from '../component/skeleton/ConfirmCurSkeloton';


export const ConfrimCur = () => {
    const {id} = useParams();

    const [quotation, setQuotation] = useState(null);
    const [loading, setLoding] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchQuotation = async () => {
            try{
                const token = localStorage.getItem('token');
                const res   = await axios.get(`http://localhost:8000/api/confirm-cur/${id}`, {
                    headers:{
                         Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res.data.data);
                setQuotation(res.data.data);
            }catch(err){
                console.log('error', err)
            } finally{
                setLoding(false);
            }
        };
        fetchQuotation();

    }, [id])    

    if (loading) return <ConfirmCurSkeloton />;
    if (!quotation) return <div></div>;

    // const handleRecipient = async () => {
    //   try{
    //     const token = localStorage.getItem('token');
    //     const res = await axios.post("http://localhost:8000/api/trainsaction", 
    //       {quotation_id:id },
    //       {
    //         headers:{
    //           Authorization: `Bearer ${token}`,
    //         }
    //       }
    //     );
    //     navigate(`/recipient-list/${res.data.data.id}`);

    //   } catch(err){
    //     console.log('error:', err)
    //   }
    // }

    const handleRecipient = () => {
        navigate(`/recipient-list/${id}`);
    }

  return (
    <>
    
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
   <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-200">
    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6"
    >
      Confirm Your Amount
    </h2>

    <div className="space-y-4">

      {/* Sending Amount */}
      <div className="flex justify-between items-center bg-blue-50 px-5 py-4 rounded-xl border border-blue-100">
        <span className="text-gray-700 font-medium">Sending ({quotation.source_currency.currency.code})</span>
        <span className="text-xl font-bold text-gray-900">{quotation.amount}</span>
      </div>

      {/* Receiver Amount */}
      <div className="flex justify-between items-center bg-green-50 px-5 py-4 rounded-xl border border-green-100">
        <span className="text-gray-700 font-medium">Receiver Gets ({quotation.target_currency.currency.code})</span>
        <span className="text-xl font-bold text-gray-900">
          {(quotation.amount * quotation.exhange_rate.ex_rate).toFixed(2)}
        </span>
      </div>

      {/* Exchange Rate */}
      <div className="flex justify-between items-center bg-gray-50 px-5 py-4 rounded-xl border border-gray-200">
        <span className="text-gray-700 font-medium">Current Rate</span>
        <span className="text-lg font-semibold text-gray-900">
          {quotation.exhange_rate.ex_rate} {quotation.source_currency.currency.code} / {quotation.target_currency.currency.code}
        </span>
      </div>

    </div>

    {/* Divider */}
    <div className="my-6 border-t border-gray-200"></div>

    {/* Confirm Button */}
   <button
    onClick={handleRecipient}
   className="
        w-full 
        bg-linear-to-r from-blue-600 to-blue-700
        hover:from-blue-700 hover:to-blue-800
        text-white 
        py-3 
        rounded-2xl 
        font-semibold 
        text-lg 
        shadow-[0_4px_10px_rgba(0,0,0,0.15)]
        hover:shadow-[0_6px_14px_rgba(0,0,0,0.20)]
        transform hover:-translate-y-0.5
        transition-all duration-300
        tracking-wide
            ">
    Confirm & Continue
    </button>

  </div>
        </div>

    </>
  )
}

export default ConfrimCur;
