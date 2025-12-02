import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CurrencyAmount() {
  const [countries, setCountries] = useState([]);
  const [senderCurrency, setSenderCurrency] = useState([]); 
  const [receiverCountry, setReceiverCountry] = useState("");
  const [receiverCurrencies, setReceiverCurrencies] = useState([]);

  //change rate state
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");

  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);

  const getGetAvailableSource = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:8000/api/available-countries', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log(response.data);

      setSender(response.data.sender ?? []);
      setReceiver(response.data.receiver ?? []);
      
    } catch (error) {
      console.log(error);     
    }
  }

  useEffect(() => {
    getGetAvailableSource();
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



//fetching currencie  Rate
const fetchRate = async () => {
      console.log(source, target, amount)
    // console.log(source)
  if (!source || !target || !amount) return;
  

  try {
    const token = localStorage.getItem("token");
        if (!token) return; 
    const res = await axios.get(
      `http://localhost:8000/api/exhange-rate?source=${source.id}&target=${target.id}&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRate(res.data.data.ex_rate);

  } catch (error) {
    console.log("Rate fetch error:", error);
  }
};

 useEffect(() => {
  fetchRate();
}, [source, target, amount]);



   const handleSubmit = async () => {
      if (!source || !target || !amount || !rate) {
        setError("Please select currency and enter amount");
        return;
      }
      setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const convertedAmount = parseFloat((amount * rate).toFixed(2));

      const res = await axios.post(
        "http://localhost:8000/api/save-exchange",
        {
          source,
          target,
          converted_amount: convertedAmount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Saved:", res.data);
      alert("Exchange saved successfully");

    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving exchange");
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Send Money
        </h2>
        {error &&(
          <p className="bg-red-100 text-red-700 rounded-md mt-3 p-3">
            {error}
            </p>
        )}

        <div className="mb-5">
          <label className="block text-gray-600 mb-1 font-medium">
            Your Currency (Sender)
          </label>
          <select
            onChange={(e) => setSource(JSON.parse(e.target.value))}
            name="" id="" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400">
              <option value="">Select Sender Country</option>
            {sender.map((cur)=>(
             <option key={cur.id} value={JSON.stringify(cur)}>
               {cur.country.name} ({cur.currency.symbol})
              </option>
            ))}
          </select>
          
          <input 
          value={amount}
          onChange={(e)=> setAmount(e.target.value)}
          type="number" 
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
           onChange={(e) => setTarget(JSON.parse(e.target.value))}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Country</option>
          {/* maping for recivier country  */}
            {receiver.map((rec)=>(
              <option key={rec.id} value={JSON.stringify(rec)}>
                 {rec.country.name} ({rec.currency.symbol})
              </option>
            ))}
            
          
          </select>
        </div>

      
           {rate && amount && (
            <div className="mt-4 p-4 rounded-xl shadow-sm border bg-white">
              <div className="text-gray-500 text-sm font-medium">
                Current Rate
              </div>

              <div className="mt-1 text-xl font-semibold text-gray-800">
                {source.currency.code} → {target.currency.code}
              </div>

              <div className="mt-2 text-2xl font-bold text-blue-600">
                {(rate).toFixed(2)} {target.currency.code} Per {source.currency.code}
              </div>
              
              <div className="mt-2 text-2xl font-bold text-blue-600">
                For {(amount)} {source.currency.code} You will get {(amount * rate).toFixed()} {target.currency.code}
              </div>
            </div>
          )}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
