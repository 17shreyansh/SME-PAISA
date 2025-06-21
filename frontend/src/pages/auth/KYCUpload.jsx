import React, { useState } from 'react';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KYCUpload = () => {
  // State for KYC form data
  const [formData, setFormData] = useState({
    aadharNumber: '',
    panNumber: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    chequeImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file && !['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
      setError('Please upload JPEG, PNG, WebP, or PDF files only.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }
    setFormData({ ...formData, [name]: file });
    setError('');
  };

  // Validate KYC form
  const validateForm = () => {
    if (!formData.aadharNumber || !formData.panNumber || !formData.accountNumber || !formData.ifscCode) {
      setError('Aadhar number, PAN number, account number, and IFSC code are required.');
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      setError('Aadhar number must be 12 digits.');
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      setError('Invalid PAN number format.');
      return false;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      setError('Invalid IFSC code format.');
      return false;
    }
    if (!formData.aadharFront || !formData.aadharBack || !formData.panCard || !formData.chequeImage) {
      setError('All document uploads are required.');
      return false;
    }
    return true;
  };

  // Handle KYC form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('aadharNumber', formData.aadharNumber);
    formDataToSend.append('panNumber', formData.panNumber);
    formDataToSend.append('accountNumber', formData.accountNumber);
    formDataToSend.append('ifscCode', formData.ifscCode);
    formDataToSend.append('bankName', formData.bankName);
    formDataToSend.append('branchName', formData.branchName);
    formDataToSend.append('aadharFront', formData.aadharFront);
    formDataToSend.append('aadharBack', formData.aadharBack);
    formDataToSend.append('panCard', formData.panCard);
    formDataToSend.append('chequeImage', formData.chequeImage);

    try {
      const response = await axios.post('http://localhost:8080/api/documents/upload', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccess('KYC documents uploaded successfully. Verification in progress.');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'KYC upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="text-center mb-5">
          <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-file-earmark-text-fill text-success" style={{ fontSize: '24px' }}></i>
          </div>
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">KYC Verification</h4>
          <p className="text-muted">Upload your KYC documents for verification</p>
        </div>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="card border-2 border-dashed border-secondary p-3 mb-4">
            <h5 className="card-title">Aadhar Card</h5>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label text-start">Front Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="aadharFront"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="col-6">
                <label className="form-label text-start">Back Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="aadharBack"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="aadharNumber" className="form-label text-start">Aadhar Number</label>
              <input
                type="text"
                className="form-control"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                placeholder="Enter 12-digit Aadhar number"
                required
              />
            </div>
          </div>
          <div className="card border-2 border-dashed border-secondary p-3 mb-4">
            <h5 className="card-title">PAN Card</h5>
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label text-start">PAN Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="panCard"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="panNumber" className="form-label text-start">PAN Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  required
                />
              </div>
            </div>
          </div>
          <div className="card border-2 border-dashed border-secondary p-3 mb-4">
            <h5 className="card-title">Bank Details</h5>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label htmlFor="accountNumber" className="form-label text-start">Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Account number"
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="ifscCode" className="form-label text-start">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="IFSC code"
                  required
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label htmlFor="bankName" className="form-label text-start">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Bank name"
                />
              </div>
              <div className="col-6">
                <label htmlFor="branchName" className="form-label text-start">Branch Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="branchName"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="Branch name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-start">Cancelled Cheque</label>
              <input
                type="file"
                className="form-control"
                name="chequeImage"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="alert alert-warning mb-4" role="alert">
            <h5 className="alert-heading">Important Note</h5>
            <p className="mb-0">All documents will be verified by our team. You will receive an email confirmation once your account is approved.</p>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit KYC'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCUpload;