import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './dashboard/Dashboard'
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import  Payment  from "./payments/payment";
import CurrencySelect  from "./payments/CurrencySelect";
import ConfrimCur from "./payments/ConfrimCur";
import Recipient from "./payments/Recipient";
import RecipientList from "./payments/RecipientList";
import RecipientFull from "./payments/RecipientFull";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/:name" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="login" element={<Login/>}/>
      <Route path="/payment" element={<Payment/>}/> 
      <Route path="/currencyselet" element={<CurrencySelect/>}/>
      <Route path="/confirm-cur/:id" element={<ConfrimCur/>}/>
      <Route path="/recipient/:id" element={<Recipient/>}/>
      <Route path="/recipient-list" element={<RecipientList/>}/>
      <Route path="/recipient-view/:id" element={<RecipientFull/>}/>
    </Routes>
  )
}

export default App;
