import React from 'react';
import { Layout, Button, Table, Timeline } from 'antd';
import 'antd/dist/reset.css';
import './HomeClient.css';

const { Header, Content } = Layout;

const Welcome = ({ name }) => (
  <div className="welcome">Welcome back, {name}</div>
);

const QuickActions = ({ actions }) => (
  <div className="quick-actions">
    {actions.map((action, index) => (
      <Button key={index} type={action.type} className={action.className}>
        {action.label}
      </Button>
    ))}
  </div>
);

const ApplicationOverview = ({ applications }) => {
  const columns = [
    { title: 'Application ID', dataIndex: 'id', key: 'id' },
    { title: 'Loan Type', dataIndex: 'loanType', key: 'loanType' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Last Updated', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  ];
  return <Table columns={columns} dataSource={applications} pagination={false} />;
};

const RecentActivity = ({ activities }) => (
  <Timeline>
    {activities.map((activity, index) => (
      <Timeline.Item key={index} dot={activity.icon}>
        {activity.description} <span className="date">{activity.date}</span>
      </Timeline.Item>
    ))}
  </Timeline>
);

const Dashboard = () => {
  const mockData = {
    name: 'Alex',
    quickActions: [
      { label: 'Apply for Loan', type: 'primary', className: 'apply-loan' },
      { label: 'Upload Documents', type: 'default', className: 'upload-docs' },
    ],
    applications: [
      { key: '1', id: 'APP12345', loanType: 'Working Capital Loan', amount: '$50,000', status: 'In Review', lastUpdated: '2024-07-26' },
      { key: '2', id: 'APP67890', loanType: 'Equipment Financing', amount: '$20,000', status: 'Approved', lastUpdated: '2024-07-20' },
      { key: '3', id: 'APP11223', loanType: 'Business Expansion Loan', amount: '$100,000', status: 'Pending Documents', lastUpdated: '2024-07-15' },
    ],
    activities: [
      { icon: <span className="icon">📄</span>, description: 'Loan Application Submitted', date: '2024-07-25' },
      { icon: <span className="icon">📎</span>, description: 'Documents Uploaded', date: '2024-07-26' },
      { icon: <span className="icon">⏳</span>, description: 'Application In Review', date: '2024-07-27' },
    ],
  };

  return (
    <Layout>
      <Header className="header">Dashboard</Header>
      <Content className="content">
        <Welcome name={mockData.name} />
        <QuickActions actions={mockData.quickActions} />
        <h2>Application Overview</h2>
        <ApplicationOverview applications={mockData.applications} />
        <h2>Recent Activity</h2>
        <RecentActivity activities={mockData.activities} />
      </Content>
    </Layout>
  );
};

export default Dashboard;