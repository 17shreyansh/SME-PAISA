import React from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import Header from '../../components/HeaderCoordinator.jsx';
import TasksTable from '../../components/TasksTable.jsx';
import ClientInteractions from '../../components/ClientInteractions.jsx';
import DocumentPendency from '../../components/DocumentPendency.jsx';
import CaseProgressNotes from '../../components/CaseProgressNotes.jsx';
import { mockData } from './MookDataCoordinator.js';
import '../../App.css';
import './CoordinatorDashboard.css';

const { Content } = Layout;
const { Title } = Typography;

const CoordinatorDashboard = () => {
  const { userName, tasksData, clientInteractionsData, documentPendencyData, progressNotesData } = mockData;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="dashboard-container">
        <Header title="Coordinator Dashboard" user={userName} />

        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card className="section-card">
              <Title level={3} className="section-title">My Tasks</Title>
              <TasksTable data={tasksData} />
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card className="section-card">
              <Title level={4} className="section-title">Client Interactions</Title>
              <ClientInteractions data={clientInteractionsData} />
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card className="section-card">
              <Title level={4} className="section-title">Document Pendency</Title>
              <DocumentPendency data={documentPendencyData} />
            </Card>
          </Col>

          <Col span={24}>
            <Card className="section-card">
              <Title level={4} className="section-title">Case Progress Notes</Title>
              <CaseProgressNotes data={progressNotesData} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CoordinatorDashboard;
