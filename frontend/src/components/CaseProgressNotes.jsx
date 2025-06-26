import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const CaseProgressNotes = ({ data = [] }) => {
  return (
    <div>
      {data.map((note, index) => (
        <div key={index} className="progress-note">
          <div className="progress-note-title">{note.title}</div>
          <div className="progress-note-date">{note.date}</div>
          <Text className="progress-note-content">{note.content}</Text>
        </div>
      ))}
    </div>
  );
};

export default CaseProgressNotes;