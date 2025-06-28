import React from 'react';

// Component for displaying audit trail of actions
const AuditLog = ({ userId }) => {
  const auditData = [
    { id: '1', action: 'Document Uploaded', user: 'Admin', timestamp: '2025-06-27 15:00 IST' },
    { id: '2', action: 'Status Changed to Rejected', user: 'Admin', timestamp: '2025-06-27 16:00 IST' },
  ];

  return (
    <div className="audit-log">
      <h3>Audit Log for User {userId}</h3>
      <ul>
        {auditData.map((entry) => (
          <li key={entry.id}>
            {entry.action} by {entry.user} at {entry.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLog;