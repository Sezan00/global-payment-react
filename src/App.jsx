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
import RecipientCRUD from "./dashboard/RecipientCRUD";
import FundAndRealtion from "./payments/FundAndRealtion";
import  PayMore  from "./payments/PayMore";
import FlowRecipientCreate  from "./payments/FlowRecipientCreate";
import ProfileEdit from "./Profile/ProfileEdit";
import TransferView  from "./payments/TransferView";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/:name" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="login" element={<Login/>}/>
      <Route path="/payment" element={<Payment/>}/> 
      <Route path="/currencyselet" element={<CurrencySelect/>}/>
      <Route path="/confirm-cur/:id" element={<ConfrimCur/>}/>
      <Route path="/recipient" element={<Recipient/>}/>
      <Route path="/recipient-list/:id" element={<RecipientList/>}/>
      <Route path="/recipient-view/:id" element={<RecipientFull/>}/>
      <Route path="/recipient-dash" element={<RecipientCRUD/>}/>
      <Route path="/sourcfund-realtion/:id" element={<FundAndRealtion/>}/>
      <Route path="/paymore/:id" element={<PayMore/>}/>
      <Route path="/recipient-create/:id" element={<FlowRecipientCreate/>}/>
      <Route path="/profile-edit/:id" element={<ProfileEdit/>}/>
      <Route path="/transfer-view/:id" element={<TransferView/>}/>
    </Routes>
  )
}

export default App;
