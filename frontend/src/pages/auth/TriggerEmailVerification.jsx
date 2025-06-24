import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TriggerEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendVerificationEmail = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      console.log('Sending verification email request...');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-verification-email`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Verification email response:', response.data);

      if (response.data.success) {
        setMessage('Verification email sent successfully! Please check your inbox and spam folder.');
      } else {
        setError(response.data.message || 'Failed to send verification email. Please try again.');
      }
    } catch (err) {
      console.error('Send verification email error:', err);
      if (err.response?.status === 401) {
        setError('Please login first to send verification email.');
      } else {
        setError(err.response?.data?.message || 'Failed to send verification email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">Email Verification</h4>
          <p className="text-muted mt-2">Resend verification email to complete your registration</p>
        </div>
        
        {message && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle me-2"></i>
            {message}
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}
        
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleSendVerificationEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-envelope me-2"></i>
                Send Verification Email
              </>
            )}
          </button>
          
          <div className="row g-2 mt-2">
            <div className="col">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-light rounded">
          <h6 className="mb-2">Having trouble?</h6>
          <ul className="small text-muted mb-0">
            <li>Check your spam/junk folder</li>
            <li>Make sure you're logged in</li>
            <li>Wait a few minutes before requesting again</li>
            <li>Contact support if the issue persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TriggerEmailVerification;
