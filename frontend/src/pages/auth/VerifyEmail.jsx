import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Register.css';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/verify-email/${token}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setSuccess('Email verified successfully! Redirecting to KYC upload...');
          setTimeout(() => navigate('/kyc-upload'), 2000);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Email verification failed.');
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">Email Verification</h4>
        </div>
        {loading && <div className="alert alert-info">Verifying email...</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyEmail;