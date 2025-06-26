import React from 'react';
import { Row, Col, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const AdminMetrics = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <Col span={6}>
        <Card className="metric-card">
          <Title level={4}>Total Users</Title>
          <Text strong>150</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="metric-card">
          <Title level={4}>Active Cases</Title>
          <Text strong>45</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="metric-card">
          <Title level={4}>Pending Approvals</Title>
          <Text strong>12</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card className="metric-card">
          <Title level={4}>Inactive Users</Title>
          <Text strong>8</Text>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminMetrics;