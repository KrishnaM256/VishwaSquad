import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
