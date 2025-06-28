import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Component for uploading documents with validation
const DocumentUploader = ({ user, role, onUpload }) => {
  const [fileList, setFileList] = useState([]);

  const documentTypes = {
    Client: ['PAN', 'Aadhaar', 'Bank Statement', 'Address Proof'],
    Associate: ['PAN', 'GST Certificate', 'Business License', 'Bank Statement'],
  };

  const handleUpload = ({ file, onSuccess, onError }) => {
    const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
    const isLt500KB = file.size / 1024 < 500;

    if (!isValidType) {
      onError('Only JPEG, PNG, and PDF files are allowed!');
    } else if (!isLt500KB) {
      onError('File must be smaller than 500KB!');
    } else {
      setFileList([...fileList, file]);
      onSuccess();
      onUpload(`Uploaded ${file.name} for ${user.name}`);
    }
  };

  return (
    <div className="document-uploader">
      <Upload
        customRequest={handleUpload}
        fileList={fileList}
        onRemove={(file) => setFileList(fileList.filter((f) => f.uid !== file.uid))}
      >
        <Button icon={<UploadOutlined />}>Upload Document</Button>
      </Upload>
      <select>
        {documentTypes[role].map((type) => <option key={type} value={type}>{type}</option>)}
      </select>
    </div>
  );
};

export default DocumentUploader;