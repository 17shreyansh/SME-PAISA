import React from 'react';
import { Table } from 'antd';

const DataTable = ({ data = [], columns = [] }) => {
  const defaultColumns = [
    { title: 'Loan ID', dataIndex: 'loanId', key: 'loanId' },
    { title: 'Applicant', dataIndex: 'applicant', key: 'applicant' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (text) => `$${text}` },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return <Table columns={columns.length > 0 ? columns : defaultColumns} dataSource={data} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default DataTable;