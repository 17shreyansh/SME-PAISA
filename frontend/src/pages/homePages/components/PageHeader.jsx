import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

const Header = ({ title = 'Dashboard', user = 'User' }) => {
  return (
    <Row justify="space-between" align="middle" style={{ padding: '16px 0', borderBottom: '1px solid #000' }}>
      <Col>
        <Title level={3} style={{ margin: 0, color: '#000' }}>{title}</Title>
      </Col>
      <Col>
        <span style={{ fontSize: '16px', color: '#000' }}>Welcome, {user}</span>
      </Col>
    </Row>
  );
};

export default Header;