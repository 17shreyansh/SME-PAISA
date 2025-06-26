import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ClientInteractions = ({ data = [] }) => {
  return (
    <div>
      {data.map((client, index) => (
        <div key={index} className="client-interaction-item">
          <Avatar 
            className="client-avatar" 
            src={client.avatar} 
            icon={<UserOutlined />}
            size={40}
          />
          <div className="client-info">
            <div className="client-name">{client.name}</div>
            <Text className="client-message">{client.lastMessage}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientInteractions;