import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const Header = ({ title = 'Coordinator Dashboard', user = 'User' }) => {
  return (
    <div className="dashboard-header">
      <Title className="dashboard-title">{title}</Title>
      {/* <Text className="welcome-text">Welcome back, {user}</Text> */}
    </div>
  );
};

export default Header;