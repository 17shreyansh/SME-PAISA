import React from 'react';
import { Layout, Card, Typography } from 'antd';
import Header from '../../components/HeaderCoordinator.jsx';
import TasksTable from '../../components/TasksTable.jsx';
import ClientInteractions from '../../components/ClientInteractions.jsx';
import DocumentPendency from '../../components/DocumentPendency.jsx';
import CaseProgressNotes from '../../components/CaseProgressNotes.jsx';
import { mockData } from './MookDataCoordinator.js'; // Import mock data
import '../../App.css';
import './CoordinatorDashboard.css';

const { Content } = Layout;
const { Title } = Typography; // Destructure Title from Typography

const CoordinatorDashboard = () => {
  const { userName, tasksData, clientInteractionsData, documentPendencyData, progressNotesData } = mockData;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="dashboard-container">
        <Header title="Coordinator Dashboard" user={userName} />
        <Card className="section-card">
          <Title level={2} className="section-title">My Tasks</Title>
          <TasksTable data={tasksData} />
        </Card>
        <Card className="section-card">
          <Title level={2} className="section-title">Client Interactions</Title>
          <ClientInteractions data={clientInteractionsData} />
        </Card>
        <Card className="section-card">
          <Title level={2} className="section-title">Document Pendency</Title>
          <DocumentPendency data={documentPendencyData} />
        </Card>
        <Card className="section-card">
          <Title level={2} className="section-title">Case Progress Notes</Title>
          <CaseProgressNotes data={progressNotesData} />
        </Card>
      </Content>
    </Layout>
  );
};

export default CoordinatorDashboard;