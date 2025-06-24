import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  FileProtectOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  BankOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const mainMenuItems = [
  { key: '/', icon: <HomeOutlined />, label: 'Home', to: '/' },
  { key: '/about', icon: <FileTextOutlined />, label: 'About Us', to: '/about' },
  { key: '/products', icon: <BankOutlined />, label: 'Loan Products', to: '/products' },
  { key: '/apply', icon: <FileProtectOutlined />, label: 'Apply Now', to: '/apply' },
  { key: '/associate', icon: <TeamOutlined />, label: 'Become Associate', to: '/associate' },
  { key: '/knowledge', icon: <FileTextOutlined />, label: 'Knowledge Hub', to: '/knowledge' },
  { key: '/track', icon: <ClockCircleOutlined />, label: 'Track My Case', to: '/track' },
  { key: '/contact', icon: <MessageOutlined />, label: 'Contact', to: '/contact' },
];

const bottomMenuItems = [
  { key: 'help', icon: <QuestionCircleOutlined />, label: 'Help and Support', to: '/help' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings', to: '/settings' },
];

const Sidebar = ({ collapsed: externalCollapsed, onCollapse }) => {
  const location = useLocation();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  // Responsive collapse on small screens
  const handleBreakpoint = (broken) => {
    setInternalCollapsed(broken);
  };

  const handleToggle = () => {
    setInternalCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // Implement logout logic here
    alert('Logout functionality would be implemented here');
  };

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      trigger={null}
      width={220}
      collapsedWidth={80}
      breakpoint="md"
      onBreakpoint={handleBreakpoint}
      className={`sidebar-custom ${collapsed ? 'sidebar-collapsed' : ''}`}
      style={{ position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 1000, borderRight: '2px solid #000' }}
    >
      {/* Logo/Toggle */}
      <div
        className={`sidebar-logo-toggle ${collapsed ? 'sidebar-logo-collapsed' : ''}`}
        onClick={handleToggle}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <span className={`sidebar-logo-text${collapsed ? ' sidebar-logo-text-collapsed' : ''}`}>
          {collapsed ? 'SP' : 'SME PAISA'}
        </span>
        <span className="sidebar-logo-toggle-icon">
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </span>
      </div>
      {/* Main Menu */}
      <div style={{ flex: 1, paddingTop: 8 }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          {mainMenuItems.map(item => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                margin: '4px 12px',
                borderRadius: '12px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                backgroundColor: location.pathname === item.key ? '#000' : '#fff',
                color: location.pathname === item.key ? '#fff' : '#000',
                fontWeight: location.pathname === item.key ? 600 : 400
              }}
            >
              {!collapsed && (
                <Link to={item.to} style={{ color: location.pathname === item.key ? '#fff' : '#000', width: '100%', display: 'block', borderRadius: '12px' }}>{item.label}</Link>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      {/* Bottom Menu */}
      <div style={{ width: '100%', position: 'absolute', left: 0, bottom: 0, background: '#fff', borderTop: '1px solid #e9ecef', padding: 12 }}>
        <Menu mode="inline" style={{ backgroundColor: 'transparent', border: 'none' }}>
          {bottomMenuItems.map(item => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                margin: '4px 0',
                borderRadius: '12px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                backgroundColor: location.pathname === item.to ? '#000' : '#fff',
                color: location.pathname === item.to ? '#fff' : '#000',
                fontWeight: location.pathname === item.to ? 600 : 400
              }}
            >
              {!collapsed && (
                <Link to={item.to} style={{ color: location.pathname === item.to ? '#fff' : '#000', width: '100%', display: 'block', borderRadius: '12px' }}>{item.label}</Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ margin: '4px 0', borderRadius: '12px', height: '40px', display: 'flex', alignItems: 'center', padding: '0 12px', color: '#dc3545', background: '#fff' }} onClick={handleLogout}>
            {!collapsed && 'Logout'}
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;