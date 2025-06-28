import React from 'react';
import StatusTag from './StatusTag.jsx';

// Component for displaying a visual checklist of required documents
const DocumentChecklist = ({ user, role }) => {
  const requiredDocs = {
    Client: ['PAN', 'Aadhaar', 'Bank Statement', 'Address Proof'],
    Associate: ['PAN', 'GST Certificate', 'Business License', 'Bank Statement'],
  };

  const userDocs = user.documents || [];

  return (
    <div className="document-checklist">
      <h3>Document Checklist</h3>
      <ul>
        {requiredDocs[role].map((docType) => {
          const doc = userDocs.find((d) => d.type === docType);
          const status = doc ? doc.status : 'Missing';
          return (
            <li key={docType} className={`checklist-item ${status.toLowerCase()}`}>
              {docType}: <StatusTag status={status} reason={doc?.reason} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DocumentChecklist;