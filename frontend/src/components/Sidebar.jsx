import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  Home as HomeIcon,
  FileText as DocumentIcon,
  Building as BankIcon,
  Shield as ShieldIcon,
  Users as UsersIcon,
  Book as BookIcon,
  Clock as ClockIcon,
  MessageCircle as MessageIcon,
  HelpCircle as QuestionIcon,
  Settings as SettingsIcon,
  LogOut as SignOutIcon,
} from 'lucide-react';

const Sidebar = ({ collapsed: externalCollapsed, onCollapse }) => {
  const location = useLocation();
  const [internalCollapsed, setInternalCollapsed] = useState(externalCollapsed || false);

  const handleToggle = () => {
    const newCollapsed = !internalCollapsed;
    setInternalCollapsed(newCollapsed);
    if (onCollapse) onCollapse(newCollapsed);
  };

  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  const mainMenuItems = [
    { key: '/', icon: <HomeIcon size={16} />, label: 'Home', to: '/' },
    { key: '/about', icon: <DocumentIcon size={16} />, label: 'About Us', to: '/about' },
    { key: '/products', icon: <BankIcon size={16} />, label: 'Loan Products', to: '/products' },
    { key: '/apply', icon: <ShieldIcon size={16} />, label: 'Apply Now', to: '/apply' },
    { key: '/associate', icon: <UsersIcon size={16} />, label: 'Become Associate', to: '/associate' },
    { key: '/knowledge', icon: <BookIcon size={16} />, label: 'Knowledge Hub', to: '/knowledge' },
    { key: '/track', icon: <ClockIcon size={16} />, label: 'Track My Case', to: '/track' },
    { key: '/contact', icon: <MessageIcon size={16} />, label: 'Contact', to: '/contact' },
  ];

  const bottomMenuItems = [
    { key: 'help', icon: <QuestionIcon size={16} />, label: 'Help and Support', to: '/help' },
    { key: 'settings', icon: <SettingsIcon size={16} />, label: 'Settings', to: '/settings' },
  ];

  return (
    <div className={`sidebar-custom ${internalCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo-toggle" onClick={handleToggle}>
        <span className="sidebar-logo-text">
          {internalCollapsed ? 'SP' : 'SME PAISA'}
        </span>
        <span className="sidebar-toggle-icon">
          {internalCollapsed ? '▶' : '◀'}
        </span>
      </div>
      <nav className="sidebar-menu">
        {mainMenuItems.map(item => (
          <div
            key={item.key}
            className={`menu-item ${location.pathname === item.key ? 'active' : ''}`}
          >
            <Link to={item.to} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              {!internalCollapsed && <span className="menu-label">{item.label}</span>}
            </Link>
          </div>
        ))}
      </nav>
      <nav className="sidebar-bottom-menu">
        {bottomMenuItems.map(item => (
          <div
            key={item.key}
            className={`menu-item ${location.pathname === item.to ? 'active' : ''}`}
          >
            <Link to={item.to} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              {!internalCollapsed && <span className="menu-label">{item.label}</span>}
            </Link>
          </div>
        ))}
        <div className="menu-item logout-item">
          <button className="menu-link logout-button" onClick={handleLogout}>
            <span className="menu-icon"><SignOutIcon size={16} /></span>
            {!internalCollapsed && <span className="menu-label">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;