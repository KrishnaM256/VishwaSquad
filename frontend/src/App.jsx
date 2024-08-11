import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';
import DisasterDetail from './components/DisasterDetail';
import TrainingPage from './components/TrainingPage';
import Quiz from './components/Quiz';
import EmergencyNo from './components/HomePage/EmergencyNo';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/emergencyNo" element={<EmergencyNo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
