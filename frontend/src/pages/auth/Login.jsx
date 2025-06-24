import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  // State for form data, loading, and error messages
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send login request with credentials included for cookies
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true, // Include cookies
      });

      if (response.data.success) {
        // Redirect based on role and verification status
        const { role, isEmailVerified } = response.data.user;
        if (!isEmailVerified) {
          navigate('/verify-email');
        } else if (role === 'client') {
          navigate('/client-dashboard');
        } else if (role === 'associate') {
          navigate('/associate-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4 login-card-custom">
        {/* Header section */}
        <div className="text-center mb-5">
          <div className="d-flex align-items-center justify-content-center mx-auto mb-3 login-icon-circle">
            <i className="bi bi-envelope-fill text-black"></i>
          </div>
          <h2 className="text-black mb-1">SME PAISA</h2>
          <h4 className="mb-0">Welcome Back</h4>
          <p className="text-muted">Sign in to your account to continue</p>
        </div>
        {/* Error message display */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-start">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-start">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-black text-decoration-none">Forgot password?</Link>
          </div>
          <button type="submit" className="btn btn-black w-100 py-2" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <p className="text-center mt-4 text-muted">
            Don't have an account? <Link to="/register" className="text-black text-decoration-none">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;