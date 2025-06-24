import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Register from './pages/auth/Register.jsx';
import Footer from './components/Footer.jsx';
import Sidebar from './components/Sidebar.jsx';
import Index from './pages/Home.jsx';
import AboutUs from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import KnowledgeHub from './pages/KnowledgeHub.jsx';
import Dashboard from './pages/homePages/screens/HomeClient.jsx';
import KYCUpload from './pages/auth/KYCUpload.jsx';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';
import TriggerEmailVerification from './pages/auth/TriggerEmailVerification.jsx';
import Login from './pages/auth/Login.jsx';

const { Content } = Layout;

function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';
  const showSidebar = !hideHeaderFooter;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sidebar width: 220px expanded, 80px collapsed
  const sidebarWidth = sidebarCollapsed ? 80 : 220;

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        {showSidebar && <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />}
        <Layout style={{ marginLeft: showSidebar ? sidebarWidth : 0, transition: 'margin-left 0.2s' }}>
          <Content style={{ margin: 0, padding: 24, background: '#fff' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/kyc-upload" element={<KYCUpload />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/trigger-email-verification" element={<TriggerEmailVerification />} />
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/knowledge" element={<KnowledgeHub />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
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