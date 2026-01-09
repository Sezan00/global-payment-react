import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const TransferView = () => {
 
 const [TranData, setTranData] = useState("");
 const {id} = useParams();
  useEffect(()=>{
    const fetchTransactionData = async ()=> {
      try{
        const token = localStorage.getItem('token');
        const res   = await axios.get(`http://localhost:8000/api/transaction-view/${id}`, {
          headers: {Authorization:`Bearer ${token}`}
        })
         console.log('Transaction:', res.data.transaction);
        setTranData(res.data.transaction);
      } catch(err){
        console.log('Not showing')
      }
    }
    fetchTransactionData();
  }, [id])

  //handle submi to data
   const handleSend = async () => {
  try {
    const token = localStorage.getItem('token');

    await axios.post(
      `http://localhost:8000/api/transactions/${id}/send`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Transfer is being processed');
  } catch (err) {
    alert('Something went wrong');
  }
};


  return (
    <>
    <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg">
        
        {/* Header Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button className="text-slate-500 hover:text-slate-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-sm font-semibold text-slate-900">Review transfer</span>
          <div className="w-6"></div> {/* Spacer to center title */}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          
          {/* Section 1: Money Breakdown (The "Wise" Style) */}
          <div className="p-6 pb-2">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Transfer details</h2>
            
            <div className="relative pl-4 border-l-2 border-slate-100 space-y-8 my-2">
              
              {/* You Send */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-900 ring-4 ring-white"></div>
                <div className="flex justify-between items-start group">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{TranData?.user?.name} (You send)</p>
                    <p className="text-xl font-bold text-slate-900">{TranData?.quotation?.source_currency?.currency?.symbol} 
                      {TranData?.quotation?.amount} {TranData?.quotation?.source_currency?.currency?.code}</p>
                  </div>
                  <div className="bg-slate-100 px-3 py-1 rounded text-sm font-medium text-slate-700">
                    {TranData?.quotation?.source_currency?.country?.iso2} - {TranData?.quotation?.source_currency?.currency?.code}
                  </div>
                </div>
              </div>

              {/* Fee & Rate Section (Collapsible looking) */}
              <div className="relative py-1">
                 {/* Fee Line */}
                 <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">-</div>
                      <span>Service fee</span>
                    </div>
                    <span className="font-medium text-slate-900">$5.45 USD</span>
                 </div>
                 
                 {/* Amount to Convert */}
                 <div className="flex justify-between items-center text-sm mb-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">=</div>
                      <span>Amount we'll convert</span>
                    </div>
                    <span className="font-medium text-slate-900">$500.00 USD</span>
                 </div>

                 {/* Rate */}
                 <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">×</div>
                      <span className="text-emerald-600 font-medium">Guaranteed rate</span>
                    </div>
                    <span className="font-medium text-emerald-600">117.50</span>
                 </div>
              </div>

              {/* Recipient Gets */}
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{TranData?.recipient?.full_name} gets</p>
                    <p className="text-2xl font-bold text-slate-900">{TranData?.quotation?.target_currency?.currency?.symbol} {TranData?.converted_amount} {TranData?.quotation?.target_currency?.currency?.code}</p>
                  </div>
                  <div className="bg-emerald-50 px-3 py-1 rounded text-sm font-medium text-emerald-700">
                    {TranData?.quotation?.target_currency?.country?.iso2} - {TranData?.quotation?.target_currency?.currency?.code}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Should arrive by <span className="text-slate-700 font-medium">Jan 2nd, 2:00 PM</span></p>
              </div>

            </div>
          </div>

          <div className="h-px bg-slate-100 w-full my-4"></div>

          {/* Section 2: Recipient Details */}
          <div className="p-6 pt-2">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recipient</h2>
               <button className="text-emerald-600 text-sm font-medium hover:underline">Edit</button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    AK
                 </div>
                 <div>
                    <p className="font-semibold text-slate-900">{TranData?.recipient?.full_name}</p>
                    <p className="text-sm text-slate-500">{TranData?.recipient?.email}</p>
                 </div>
              </div>
              
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                    <span className="text-slate-500">Bank</span>
                    <span className="font-medium text-slate-900">{TranData?.recipient?.bank_name}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Account number</span>
                    <span className="font-medium text-slate-900">{TranData?.recipient?.bank_account || "N/A"}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-500">Reference</span>
                    <span className="font-medium text-slate-900">{TranData?.source_of_fund?.source_fund}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="p-6 bg-slate-50 border-t border-slate-200">
             <div className="flex items-start gap-3 mb-6">
                <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
                <label htmlFor="terms" className="text-sm text-slate-500 cursor-pointer select-none">
                   I agree to the <a href="#" className="text-emerald-600 underline">Terms of Service</a> and confirm that these details are correct.
                </label>
             </div>

             <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              onClick={handleSend}
             >
                <span>Confirm and send</span>
                <span className="text-slate-400">|</span>
                <span>$505.45</span>
             </button>
             
             <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Encrypted and secure payment
             </p>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default TransferView;
