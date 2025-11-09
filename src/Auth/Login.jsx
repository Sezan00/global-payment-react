import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/authSlice';

const Login = () => {
  const [form, setForm] = useState({
    email:"",
    password:"",
  });

  const {user, status, error} = useSelector((state)=> state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    dispatch(login(form));
  };

  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  }, [user, navigate])

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white flex items-center justify-center shadow-lg rounded-2xl p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
