import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/authentication/Register'
<<<<<<< HEAD
import DisasterDetail from './components/DisasterDetail'
import Navbar from './components/Navbar/Navbar'
import TrainingPage from './components/TrainingPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
