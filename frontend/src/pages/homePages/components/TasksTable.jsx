import React from 'react';
import { Table, Typography, Button } from 'antd';
import StatusBadge from './StatusBadge.jsx'; // Import StatusBadge

const { Text } = Typography;

const TasksTable = ({ data = [] }) => {
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusBadge status={status} />, // Now defined
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text) => <Text style={{ color: '#8c8c8c' }}>{text}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link" className="view-button">View</Button>,
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} size="middle" />;
};

export default TasksTable;