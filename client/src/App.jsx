import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import Home from './pages/Home'
import Register from './pages/Register.jsx'
import { BrowserRouter, Route, Routes,Navigate  } from "react-router-dom";
import Login from './pages/login'
import Appoinment from './pages/Appoinment.jsx'
import AdminDashboard from './pages/Admin Pannel/adminDash.jsx'
import ProfileCard from './pages/UserProfile.jsx'
import { useAuthContext } from '../src/hook/UseAuthContext.jsx'

function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
     <Navbar/>  
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/appoinment/:id' element={user ? <Appoinment /> : <Navigate to="/login" />} />
      <Route path='/profile/:id' element={<ProfileCard/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App
