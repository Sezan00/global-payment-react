import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CurrencyAmount() {
  const [countries, setCountries] = useState([]);
  const [senderCurrency, setSenderCurrency] = useState([]); 
  const [receiverCountry, setReceiverCountry] = useState("");
  const [amount, setAmount] = useState("");
 const [receiverCurrencies, setReceiverCurrencies] = useState([]);
  // this useEffect for fetch currecies 
  useEffect(()=>{
    const fetchCurrencies = async ()=>{
      try{
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/user/sendercurrencies", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setSenderCurrency(response.data);
      } catch(err){
        console.log('Error Fetching currencies', err)
      }
    }
    fetchCurrencies();
  }, []);

  //this UseEffect fetch of Fetch Receiver Country 
  useEffect(()=>{
     const fetchCountries = async ()=>{
      const token = localStorage.getItem('token');
      try{
        const res = await axios.get("http://localhost:8000/api/receiver/countries", {
            headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setCountries(res.data);
        // console.log('Receiver Country', res.data);
      } catch(err){
          console.log("Error fetch country", err)
      }
     };
     fetchCountries();
  }, []);

   // Fetch currencies when country changes

   useEffect(()=>{

    if(!receiverCountry) return;

     const fetchReceiverCurrencies = async ()=>{
      const token = localStorage.getItem("token");
        if (!token) return; 
      try{
        const res = await axios.get(`http://localhost:8000/api/receiver/countries/${receiverCountry}/currencies`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setReceiverCurrencies(res.data);
      } catch (err){
        console.log("Fetch Receiver Currencies error:", err);
      }
     };
     fetchReceiverCurrencies();
   }, [receiverCountry]);



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Send Money
        </h2>

        <div className="mb-5">
          <label className="block text-gray-600 mb-1 font-medium">
            Your Currency (Sender)
          </label>
          <select name="" id="" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400">
            {senderCurrency.map((cur)=>(
             <option key={cur.id} value={cur.id}>
               {cur.name} ({cur.symbol})
              </option>
            ))}
          </select>
          
          <input type="number" 
          placeholder="Enter amount"
           className="w-full mt-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Receiver Currency */}
        <div className="mb-5">
          <label className="block text-gray-600 mb-1 font-medium">
            Receiver Country
          </label>
          <select
           value={receiverCountry}
           onChange={(e) => setReceiverCountry(e.target.value)}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Country</option>
          {/* maping for recivier country  */}
            {countries.map((country)=>(
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
            
          
          </select>
        </div>

        {/* country currencies  */}
        <div className="mb-5">
          <label className="block text-gray-600 mb-1 font-medium">
             Receiver Currency
          </label>
          <select
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Country Currencies</option>
            {receiverCurrencies.map((recCur)=>(
              <option key={recCur.id} value={recCur.id}>
                 {recCur.name} ({recCur.symbol})
              </option>
            ))}
          
          </select>
        </div>

        {/* Sender Amount Input */}
        <div className="mb-5">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
