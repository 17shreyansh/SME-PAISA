import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  Home,
  FileText,
  Building,
  Shield,
  Users,
  Book,
  Clock,
  MessageCircle,
  HelpCircle,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const Sidebar = ({ collapsed: externalCollapsed, onCollapse }) => {
  const location = useLocation();
  const [internalCollapsed, setInternalCollapsed] = useState(externalCollapsed || false);

  const handleToggle = () => {
    const newCollapsed = !internalCollapsed;
    setInternalCollapsed(newCollapsed);
    if (onCollapse) onCollapse(newCollapsed);
  };

  // Auto collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setInternalCollapsed(true);
        if (onCollapse) onCollapse(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [onCollapse]);

  const mainMenuItems = [
    { key: '/', icon: <Home size={18} />, label: 'Home', to: '/' },
    { key: '/about', icon: <FileText size={18} />, label: 'About Us', to: '/about' },
    { key: '/products', icon: <Building size={18} />, label: 'Loan Products', to: '/products' },
    { key: '/apply', icon: <Shield size={18} />, label: 'Apply Now', to: '/apply' },
    { key: '/associate', icon: <Users size={18} />, label: 'Become Associate', to: '/associate' },
    { key: '/knowledge', icon: <Book size={18} />, label: 'Knowledge Hub', to: '/knowledge' },
    { key: '/track', icon: <Clock size={18} />, label: 'Track My Case', to: '/track' },
    { key: '/contact', icon: <MessageCircle size={18} />, label: 'Contact', to: '/contact' },
  ];

  const bottomMenuItems = [
    { key: '/help', icon: <HelpCircle size={18} />, label: 'Help & Support', to: '/help' },
    { key: '/settings', icon: <Settings size={18} />, label: 'Settings', to: '/settings' },
  ];

  return (
    <div className={`sidebar ${internalCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={handleToggle}>
        <span className="sidebar-logo">{internalCollapsed ? 'SP' : 'SME PAISA'}</span>
        <span className="sidebar-toggle">
          {internalCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </span>
      </div>

      <div className="sidebar-menu">
        {mainMenuItems.map(item => (
          <Link
            key={item.key}
            to={item.to}
            className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!internalCollapsed && <span className="sidebar-label">{item.label}</span>}
          </Link>
        ))}
      </div>

      <div className="sidebar-menu mt-auto">
        {bottomMenuItems.map(item => (
          <Link
            key={item.key}
            to={item.to}
            className={`sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!internalCollapsed && <span className="sidebar-label">{item.label}</span>}
          </Link>
        ))}
        <button className="sidebar-link logout-btn" onClick={() => alert('Logout')}>
          <span className="sidebar-icon"><LogOut size={18} /></span>
          {!internalCollapsed && <span className="sidebar-label">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
