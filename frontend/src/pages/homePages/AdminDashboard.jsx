import React from 'react';
import { Layout, Card, Table, Typography, Button, Tag, Row, Col } from 'antd';
import './AdminDashboard.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const userData = [
    {
      key: '1001',
      userId: '1001',
      name: 'Ethan Harper',
      email: 'ethan.harper@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      key: '1002',
      userId: '1002',
      name: 'Olivia Bennett',
      email: 'olivia.bennett@example.com',
      role: 'Associate',
      status: 'Active',
    },
    {
      key: '1003',
      userId: '1003',
      name: 'Noah Carter',
      email: 'noah.carter@example.com',
      role: 'User',
      status: 'Inactive',
    },
    {
      key: '1004',
      userId: '1004',
      name: 'Ava Morgan',
      email: 'ava.morgan@example.com',
      role: 'Associate',
      status: 'Active',
    },
    {
      key: '1005',
      userId: '1005',
      name: 'Liam Foster',
      email: 'liam.foster@example.com',
      role: 'User',
      status: 'Active',
    },
  ];

  const marginData = [
    { key: '2001', id: '2001', name: 'Olivia Bennett', margin: '5%' },
    { key: '2002', id: '2002', name: 'Ava Morgan', margin: '7%' },
    { key: '2003', id: '2003', name: 'Lucas Reed', margin: '6%' },
  ];

  const documentData = [
    { key: '3001', id: '3001', user: 'Ethan Harper', type: 'KYC', status: 'Approved', date: '2024-07-26' },
    { key: '3002', id: '3002', user: 'Olivia Bennett', type: 'Income Proof', status: 'Pending', date: '2024-07-27' },
    { key: '3003', id: '3003', user: 'Noah Carter', type: 'Business Registration', status: 'Rejected', date: '2024-07-28' },
    { key: '3004', id: '3004', user: 'Ava Morgan', type: 'Bank Statement', status: 'Approved', date: '2024-07-29' },
  ];

  const renderTag = (value) => {
    const colorMap = {
      Active: 'green',
      Inactive: 'default',
      Approved: 'green',
      Pending: 'orange',
      Rejected: 'red',
    };
    return <Tag color={colorMap[value] || 'default'}>{value}</Tag>;
  };

  return (
    <Layout>
      <Content className="admin-dashboard-container">
        <Title level={2}>Admin Dashboard</Title>

        {/* Metrics */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <Card className="metric-card">
              <Text>Total Users</Text>
              <Title level={3}>1,234</Title>
            </Card>
          </div>
          <div className="col-md-4 mb-3">
            <Card className="metric-card">
              <Text>Total Associates</Text>
              <Title level={3}>567</Title>
            </Card>
          </div>
          <div className="col-md-4 mb-3">
            <Card className="metric-card">
              <Text>Total Leads</Text>
              <Title level={3}>890</Title>
            </Card>
          </div>
        </div>

        {/* User Management */}
        <Title level={4}>User Management</Title>
        <Table
          className="mb-5"
          dataSource={userData}
          pagination={false}
          columns={[
            { title: 'User ID', dataIndex: 'userId', render: (text) => <a>{text}</a> },
            { title: 'Name', dataIndex: 'name' },
            { title: 'Email', dataIndex: 'email' },
            { title: 'Role', dataIndex: 'role', render: (text) => <Tag>{text}</Tag> },
            { title: 'Status', dataIndex: 'status', render: renderTag },
          ]}
        />

        {/* Associate Margin */}
        <Title level={4}>Associate Margin Settings</Title>
        <Table
          className="mb-5"
          dataSource={marginData}
          pagination={false}
          columns={[
            { title: 'Associate ID', dataIndex: 'id', render: (text) => <a>{text}</a> },
            { title: 'Name', dataIndex: 'name' },
            { title: 'Margin (%)', dataIndex: 'margin' },
            { title: 'Actions', render: () => <Button type="link">Edit</Button> },
          ]}
        />

        {/* Lead Funnel */}
        <Title level={4}>Lead Funnel</Title>
        <Card className="mb-5">
          <Text strong>Lead Conversion Funnel</Text>
          <Row gutter={16} className="mt-3">
            {[1, 2, 3, 4, 5].map((stage) => (
              <Col key={stage}>
                <div className="funnel-bar mb-2" />
                <div className="text-center">Stage {stage}</div>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Document Uploads */}
        <Title level={4}>Document Uploads</Title>
        <Table
          dataSource={documentData}
          pagination={false}
          columns={[
            { title: 'Document ID', dataIndex: 'id', render: (text) => <a>{text}</a> },
            { title: 'User', dataIndex: 'user' },
            { title: 'Type', dataIndex: 'type', render: (text) => <a>{text}</a> },
            { title: 'Status', dataIndex: 'status', render: renderTag },
            { title: 'Uploaded At', dataIndex: 'date' },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
