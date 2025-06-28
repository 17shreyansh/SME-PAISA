import React from 'react';
import { Button } from 'antd';

// Component for displaying notification alerts
const NotificationBanner = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="notification-banner">
      <span>{message}</span>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default NotificationBanner;