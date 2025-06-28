import React from 'react';

// Component for displaying status tags with color coding
const StatusTag = ({ status, reason }) => {
  const getClassName = () => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'missing': return 'status-missing';
      default: return 'status-pending';
    }
  };

  return (
    <span className={`status-tag ${getClassName()}`}>
      {status} {reason && `(Reason: ${reason})`}
    </span>
  );
};

export default StatusTag;