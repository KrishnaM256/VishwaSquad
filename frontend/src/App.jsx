<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';
import DisasterDetail from './components/DisasterDetail';
import TrainingPage from './components/TrainingPage';
=======
import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/authentication/Register'
import DisasterDetail from './components/DisasterDetail'
import Navbar from './components/Navbar/Navbar'
import TrainingPage from './components/TrainingPage'
<<<<<<< HEAD
import Quiz from './components/Quiz'


import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import ResetPassword from './components/authentication/resetPassword'
=======
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import ResetPassword from './components/authentication/resetPassword'
>>>>>>> b34bb936e84db13d7dfbe50fccfaa513e6d93183
>>>>>>> 094928f2483d265414c4d7794a50188daf47608d

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
=======
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
=======
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="//password/reset/:token" element={<ResetPassword />} />

>>>>>>> b34bb936e84db13d7dfbe50fccfaa513e6d93183
>>>>>>> 094928f2483d265414c4d7794a50188daf47608d
      </Routes>
    </BrowserRouter>
  );
}

export default App;

