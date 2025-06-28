import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Tabs,
  Spin,
  Modal,
  Row,
  Col,
  Progress,
  Button,
  Space,
  Image,
  Table,
  Select,
  Upload,
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import UserList from '../components/UserList.jsx';
import StatusTag from '../components/StatusTag.jsx';
import HeaderCoordinator from '../components/HeaderCoordinator.jsx';
import './KYCVerifyPortal.css';

const { Content } = Layout;
const { Option } = Select;

const KYCVerifyPortal = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Client');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('PAN');

  useEffect(() => {
    setLoading(true);
    fetch('/src/data/users.json')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => toast.error('Failed to load user data'))
      .finally(() => setLoading(false));
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDocAction = (doc, action) => {
    if (action === 'approve') toast.success(`Approved ${doc.type} for ${selectedUser.name}`);
    else if (action === 'reject') toast.error(`Rejected ${doc.type} for ${selectedUser.name}`);
    else if (action === 'download' || action === 'view') window.open(doc.url, '_blank');
  };

  const tabItems = [
    { key: 'Client', label: 'Client' },
    { key: 'Associate', label: 'Associate' },
  ];

  const checklistColumns = [
    { title: 'Document Name', dataIndex: 'type', key: 'type' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <StatusTag status={record.status} reason={record.reason} />,
    },
  ];

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      toast.success(`Uploaded ${selectedDocType}`);
    } else if (info.file.status === 'error') {
      toast.error(`${info.file.name} upload failed.`);
    }
  };

  if (loading) return <Spin size="large" className="loading-spinner" />;

  return (
    <Layout className="kyc-portal-layout">
      <Content className="kyc-portal-content">
        <Card className="kyc-card">
          <HeaderCoordinator title="KYC Verify Portal" />
          <Tabs
            className="black-tabs"
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems.map(tab => ({ key: tab.key, label: tab.label }))}
          />
          <UserList
            users={users.filter(u => u.type === activeTab)}
            onSelect={handleUserSelect}
          />
        </Card>

        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={1000}
          className="user-modal"
        >
          {selectedUser && (
            <div className="user-details-modal">
              <Card className="profile-card" title={selectedUser.name}>
                <Row gutter={16}>
                  <Col span={12}>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Brand:</strong> {selectedUser.brandName}</p>
                  </Col>
                  <Col span={12}>
                    <Progress
                      percent={Math.round((selectedUser.documents?.length / 4) * 100) || 0}
                      status="active"
                      strokeColor="#1a3c5e"
                    />
                  </Col>
                </Row>
              </Card>

              <Card title="Documents" className="documents-card">
                <Row gutter={[16, 16]}>
                  {(activeTab === 'Client'
                    ? ['PAN', 'Aadhaar', 'Bank Statement', 'Address Proof']
                    : ['PAN', 'GST Certificate', 'Business License', 'Bank Statement']
                  ).map((docType) => {
                    const doc = selectedUser.documents?.find((d) => d.type === docType);
                    return (
                      <Col span={12} key={docType}>
                        <Card
                          title={docType}
                          className="document-card"
                          cover={doc?.url ? <Image alt={docType} src={doc.url} style={{ height: 200, objectFit: 'cover' }} /> : <div style={{ height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Preview</div>}
                          extra={doc ? <StatusTag status={doc.status} reason={doc.reason} /> : <span className="missing-doc">Missing</span>}
                        >
                          {doc && (
                            <Space>
                              <Button onClick={() => handleDocAction(doc, 'approve')}>Approve</Button>
                              <Button danger onClick={() => handleDocAction(doc, 'reject')}>Reject</Button>
                              <Button onClick={() => handleDocAction(doc, 'download')}>Download</Button>
                              <Button type="link" onClick={() => handleDocAction(doc, 'view')}>View</Button>
                            </Space>
                          )}
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card>

              <Card title="Document Checklist">
                <Table
                  dataSource={selectedUser.documents || []}
                  columns={checklistColumns}
                  rowKey="type"
                  pagination={false}
                />
              </Card>

              <Card title="Upload New Document">
                <Row gutter={16}>
                  <Col span={12}>
                    <Select
                      value={selectedDocType}
                      onChange={setSelectedDocType}
                      style={{ width: '100%' }}
                    >
                      {['PAN', 'Aadhaar', 'Bank Statement', 'Address Proof', 'GST Certificate', 'Business License'].map(type => (
                        <Option key={type} value={type}>{type}</Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Upload
                      name="file"
                      showUploadList={false}
                      customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 1000)}
                      onChange={handleUpload}
                    >
                      <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                        Upload
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              </Card>

              <Card title="Audit Log">
                <ul>
                  <li>Viewed profile</li>
                  <li>Uploaded PAN</li>
                  <li>Rejected Aadhaar</li>
                </ul>
              </Card>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default KYCVerifyPortal;