import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const DocumentPendency = ({ data = [] }) => {
  const columns = [
    {
      title: 'Case ID',
      dataIndex: 'caseId',
      key: 'caseId',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      render: (text) => <Text style={{ color: '#8c8c8c' }}>{text}</Text>,
    },
    {
      title: 'Document Type',
      dataIndex: 'documentType',
      key: 'documentType',
      render: (text) => <Text style={{ color: '#8c8c8c' }}>{text}</Text>,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text) => <Text style={{ color: '#8c8c8c' }}>{text}</Text>,
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} size="middle" />;
};

export default DocumentPendency;