import React, { useState } from 'react';
import { Table, Input, Button, Dropdown, Menu, Card } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './UserList.css';

const { Search } = Input;

const StatusTag = ({ status, reason }) => {
  const getClassName = () => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'missing': return 'status-missing';
      default: return 'status-pending';
    }
  };

  return (
    <span className={`status-tag ${getClassName()}`}>
      {status} {reason && `(Reason: ${reason})`}
    </span>
  );
};

const UserList = ({ users, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFilterChange = ({ key }) => {
    setFilterStatus(key);
  };

  const statusMenu = (
    <Menu onClick={handleFilterChange}>
      {['All', 'Pending', 'Approved', 'Rejected', 'Missing'].map((status) => (
        <Menu.Item key={status}>{status}</Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <StatusTag status={text} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button className="btn-black" onClick={() => onSelect(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Card className="user-list-card">
      <div className="search-filter-container">
        <Search
          placeholder="Search by name, ID, or email"
          allowClear
          enterButton={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Dropdown overlay={statusMenu} placement="bottomLeft">
          <Button icon={<FilterOutlined />}>
            Filter: {filterStatus}
          </Button>
        </Dropdown>
      </div>

      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="user-table"
      />
    </Card>
  );
};

export default UserList;
