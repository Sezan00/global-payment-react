import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SignUp = () => {
  const [countries, setContries] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
     country_id: "",
  });

  useEffect(()=>{
    axios.get("http://localhost:8000/api/countries-with-currencies")
         .then((res)=>setContries(res.data))
         .catch((err)=> console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/register", formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white flex items-center justify-center shadow-lg rounded-2xl p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <select
            name='country_id'
            value={formData.country_id}
            onChange={handleChange}
            required
            className="w-full mb-4 p-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none duration-300"
          >
            <option value="">Select Country</option>
            {countries.map((country) =>(
                <option key={country.id} value={country.id}>
                  {country.flag_url ? country.flag_url + "": ""} {country.name}
                  
                  </option>
            ))}
           
          </select>


          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
