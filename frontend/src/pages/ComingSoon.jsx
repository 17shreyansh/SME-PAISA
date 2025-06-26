import React from 'react';
import { Layout, Typography } from 'antd';
import './ComingSoon.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ComingSoon = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content className="coming-soon-container">
        <Title level={1} className="coming-soon-title">Coming Soon</Title>
        <Paragraph className="coming-soon-message">
          The page you are looking for is not available yet. Please check back later or contact support if you need assistance.
        </Paragraph>
      </Content>
    </Layout>
  );
};

export default ComingSoon;