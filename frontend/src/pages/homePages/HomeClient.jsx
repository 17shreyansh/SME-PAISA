import React from 'react';
import { Layout, Row, Col } from 'antd';
import Header from '../components/pageHeader.jsx';
import MetricCard from '../components/MetricCard.jsx';
import DataTable from '../components/dataTableD1.jsx';
import '../../../App.css';

const { Content } = Layout;

const Dashboard = () => {
  const metrics = [
    { title: 'Total Loans', value: '1,234', icon: '💰' },
    { title: 'Active Users', value: '567', icon: '👥' },
    { title: 'Pending Applications', value: '89', icon: '📝' },
  ];

  const tableData = [
    { id: 1, loanId: 'LN001', applicant: 'John Doe', amount: 5000, status: 'Approved' },
    { id: 2, loanId: 'LN002', applicant: 'Jane Smith', amount: 7500, status: 'Pending' },
    { id: 3, loanId: 'LN003', applicant: 'Bob Johnson', amount: 3000, status: 'Rejected' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '0 16px', padding: 24, background: '#fff' }}>
        <Header title="Dashboard" user="Ankit Poonia" />
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {metrics.length > 0 ? (
            metrics.map((metric, index) => (
              <Col span={8} key={index}>
                <MetricCard title={metric.title} value={metric.value} icon={metric.icon} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <p>No metrics available</p>
            </Col>
          )}
        </Row>
        <div style={{ marginTop: 24 }}>
          <DataTable data={tableData} />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;