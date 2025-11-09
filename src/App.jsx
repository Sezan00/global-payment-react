import { Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './dashboard/Dashboard'
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="login" element={<Login/>}/>
    </Routes>
  )
}

export default App;
