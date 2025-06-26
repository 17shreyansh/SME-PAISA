import React, { useState } from 'react';
import { Layout, Card, Input } from 'antd';
import HeaderCoordinator from '../components/HeaderCoordinator.jsx';
import TasksTable from '../components/TasksTable.jsx';
import CasesTabs from '../components/CasesTabs.jsx';
import './Cases.css';

const { Content } = Layout;
const { Search } = Input;

const Cases = () => {
  const [activeTab, setActiveTab] = useState('all');
  const mockCaseData = [
    { key: '1', caseId: '#12543', clientName: 'Vertex Innovations', status: 'Pending Documents', lastUpdated: '2025-06-25' },
    { key: '2', caseId: '#67890', clientName: 'Nexa Solutions', status: 'In Review', lastUpdated: '2025-06-24' },
    { key: '3', caseId: '#11223', clientName: 'Pinnacle Corp', status: 'Approved', lastUpdated: '2025-06-23' },
  ];

  const filteredData = mockCaseData.filter((caseItem) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending' && caseItem.status === 'Pending Documents') return true;
    if (activeTab === 'review' && caseItem.status === 'In Review') return true;
    if (activeTab === 'approved' && caseItem.status === 'Approved') return true;
    return false;
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="cases-container">
        <HeaderCoordinator title="Cases" />
        <Card className="cases-card">
          <Search
            placeholder="Search cases..."
            style={{ margin: '16px 0', width: '100%' }}
            onSearch={(value) => console.log('Search:', value)}
          />
          <CasesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <TasksTable data={filteredData} />
        </Card>
      </Content>
    </Layout>
  );
};

export default Cases;