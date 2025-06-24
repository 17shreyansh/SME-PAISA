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
      if (!token) {
        setError('Invalid verification link. No token provided.');
        setLoading(false);
        return;
      }

      try {
        console.log('Verifying email with token:', token);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`, {
          withCredentials: true,
        });
        
        console.log('Verification response:', response.data);
        
        if (response.data.success) {
          setSuccess(response.data.message || 'Email verified successfully! Redirecting to KYC upload...');
          setTimeout(() => navigate('/kyc-upload'), 3000);
        } else {
          setError(response.data.message || 'Email verification failed.');
        }
      } catch (err) {
        console.error('Verification error:', err);
        const errorMessage = err.response?.data?.message || 'Email verification failed. Please try again or contact support.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">Email Verification</h4>
        </div>
        
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="alert alert-info">Verifying your email address...</div>
          </div>
        )}
        
        {success && (
          <div>
            <div className="alert alert-success">
              <i className="fas fa-check-circle me-2"></i>
              {success}
            </div>
            <div className="text-center">
              <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
              <small className="text-muted">Redirecting to KYC upload...</small>
            </div>
          </div>
        )}
        
        {error && (
          <div>
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
            <div className="text-center mt-3">
              <button 
                className="btn btn-primary me-2" 
                onClick={() => navigate('/trigger-email-verification')}
              >
                Resend Verification Email
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;