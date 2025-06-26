import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending Documents':
        return 'status-pending';
      case 'In Review':
        return 'status-review';
      case 'Approved':
        return 'status-approved';
      default:
        return 'status-pending';
    }
  };

  return <span className={getStatusClass(status)}>{status}</span>;
};

export default StatusBadge;