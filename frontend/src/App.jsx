import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Index from './pages/Home.jsx';
import AboutUs from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import KYCUpload from './pages/auth/KYCUpload.jsx';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/kyc-upload" element={<KYCUpload />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;