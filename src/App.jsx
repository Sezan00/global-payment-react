import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './dashboard/Dashboard'
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import  Payment  from "./payments/payment";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/:name" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="login" element={<Login/>}/>
      <Route path="/payment" element={<Payment/>}/>
    </Routes>
  )
}

export default App;
