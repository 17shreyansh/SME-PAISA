import React from 'react';
import { Card } from 'antd';

const MetricCard = ({ title = 'Metric', value = '0', icon = '📊' }) => {
  return (
    <Card title={title} bordered={false} style={{ textAlign: 'center', border: '1px solid #000', borderRadius: 0 }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>{value}</div>
      <div style={{ fontSize: '16px', color: '#000' }}>{icon}</div>
    </Card>
  );
};

export default MetricCard;