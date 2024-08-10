import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/authentication/Register'
import DisasterDetail from './components/DisasterDetail'
import Navbar from './components/Navbar/Navbar'
import TrainingPage from './components/TrainingPage'
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import ResetPassword from './components/authentication/resetPassword'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="//password/reset/:token" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
