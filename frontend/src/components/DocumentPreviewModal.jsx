import React, { useState } from 'react';
import { Modal, Button } from 'antd';

// Component for previewing documents in a modal
const DocumentPreviewModal = ({ document }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div>
      <Button onClick={showModal}>Preview</Button>
      <Modal
        title="Document Preview"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="download" onClick={() => window.open(document.url, '_blank')}>
            Download
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {document.type.startsWith('image') ? (
          <img src={document.url} alt={document.type} style={{ maxWidth: '100%' }} />
        ) : (
          <iframe src={document.url} style={{ width: '100%', height: '400px' }} />
        )}
      </Modal>
    </div>
  );
};

export default DocumentPreviewModal;