import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State for form data, steps, and UI feedback
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    address: { street: '', city: '', state: '', pincode: '' },
    businessName: '',
    businessType: '',
    industry: '',
    yearOfEstablishment: '',
    annualTurnover: '',
    gstNumber: '',
    businessAddress: { street: '', city: '', state: '', pincode: '' },
    referralCode: '',
    associateType: '',
    experience: '',
    qualification: '',
    previousOrganization: '',
    currentOccupation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.') || name.startsWith('businessAddress.')) {
      const [section, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  // Validate step 0 (basic information)
  const validateStep0 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('All fields are required.');
      return false;
    }
    if (!/^[a-zA-Z\s]{2,50}$/.test(formData.firstName)) {
      setError('First name must be 2–50 characters, letters and spaces only.');
      return false;
    }
    if (!/^[a-zA-Z\s]{2,50}$/.test(formData.lastName)) {
      setError('Last name must be 2–50 characters, letters and spaces only.');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError('Phone must be a valid 10-digit Indian number.');
      return false;
    }
    if (
      formData.password.length < 8 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)
    ) {
      setError('Password must be 8+ characters with uppercase, lowercase, number, and special character.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  // Validate step 1 (address and role-specific details)
  const validateStep1 = () => {
    if (!formData.address.street || !formData.address.city || !formData.address.state || !formData.address.pincode) {
      setError('All address fields are required.');
      return false;
    }
    if (!/^\d{6}$/.test(formData.address.pincode)) {
      setError('Pincode must be 6 digits.');
      return false;
    }
    if (formData.role === 'client') {
      if (!formData.businessName || !formData.businessType || !formData.industry) {
        setError('Business name, type, and industry are required.');
        return false;
      }
      if (
        !formData.businessAddress.street ||
        !formData.businessAddress.city ||
        !formData.businessAddress.state ||
        !formData.businessAddress.pincode
      ) {
        setError('All business address fields are required.');
        return false;
      }
      if (!/^\d{6}$/.test(formData.businessAddress.pincode)) {
        setError('Business pincode must be 6 digits.');
        return false;
      }
      if (formData.gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
        setError('Invalid GST number format.');
        return false;
      }
    } else if (formData.role === 'associate' && !formData.associateType) {
      setError('Associate type is required.');
      return false;
    }
    return true;
  };

  // Handle navigation to next step
  const handleNext = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (currentStep === 0 && !validateStep0()) return;
    if (currentStep === 1 && !validateStep1()) return;

    if (currentStep < 1) setCurrentStep(currentStep + 1);
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      address: formData.address, // Added address to payload
    };

    if (formData.role === 'client') {
      payload.businessName = formData.businessName;
      payload.businessType = formData.businessType;
      payload.industry = formData.industry;
      payload.businessAddress = formData.businessAddress;
      payload.yearOfEstablishment = formData.yearOfEstablishment;
      payload.annualTurnover = formData.annualTurnover;
      if (formData.gstNumber) payload.gstNumber = formData.gstNumber;
      if (formData.referralCode) payload.referralCode = formData.referralCode;
    } else if (formData.role === 'associate') {
      payload.associateType = formData.associateType;
      if (formData.experience) payload.experience = formData.experience;
      if (formData.qualification) payload.qualification = formData.qualification;
      if (formData.previousOrganization) payload.previousOrganization = formData.previousOrganization;
      if (formData.currentOccupation) payload.currentOccupation = formData.currentOccupation;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, payload, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccess('Registration successful! Please verify your email.');
        setTimeout(() => navigate('/verify-email'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render form fields based on step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="form-label text-start">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="form-label text-start">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
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
              <label htmlFor="phone" className="form-label text-start">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone (10 digits)"
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
                placeholder="Create password (8+ chars, mixed case, number, special)"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label text-start">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-start">Select Role</label>
              <div className="btn-group w-100" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="client"
                  value="client"
                  checked={formData.role === 'client'}
                  onChange={handleChange}
                  required
                />
                <label className="btn btn-outline-primary w-50 text-center" htmlFor="client">
                  Client (Looking for funding)
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="associate"
                  value="associate"
                  checked={formData.role === 'associate'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary w-50 text-center" htmlFor="associate">
                  Associate (Business partner)
                </label>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mb-4">
              <label className="form-label text-start">Personal Address</label>
              <input
                type="text"
                className="form-control mb-2"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />
              <div className="row g-2">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control mt-2"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                placeholder="Enter pincode (6 digits)"
                required
              />
            </div>
            {formData.role === 'client' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="businessName" className="form-label text-start">Business Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    required
                  />
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label htmlFor="businessType" className="form-label text-start">Business Type</label>
                    <select
                      className="form-select"
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="proprietorship">Proprietorship</option>
                      <option value="partnership">Partnership</option>
                      <option value="private_limited">Private Limited</option>
                      <option value="public_limited">Public Limited</option>
                      <option value="llp">LLP</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="industry" className="form-label text-start">Industry</label>
                    <input
                      type="text"
                      className="form-control"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g., Manufacturing, IT, Retail"
                      required
                    />
                  </div>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label htmlFor="yearOfEstablishment" className="form-label text-start">
                      Year of Establishment
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="yearOfEstablishment"
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment}
                      onChange={handleChange}
                      placeholder="e.g., 2020"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="annualTurnover" className="form-label text-start">Annual Turnover (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="annualTurnover"
                      name="annualTurnover"
                      value={formData.annualTurnover}
                      onChange={handleChange}
                      placeholder="Enter annual turnover"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="gstNumber" className="form-label text-start">GST Number (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gstNumber"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter GST number if available"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="referralCode" className="form-label text-start">Referral Code (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referralCode"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Enter referral code if any"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-start">Business Address</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    name="businessAddress.street"
                    value={formData.businessAddress.street}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    required
                  />
                  <div className="row g-2">
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        name="businessAddress.city"
                        value={formData.businessAddress.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control"
                        name="businessAddress.state"
                        value={formData.businessAddress.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="businessAddress.pincode"
                    value={formData.businessAddress.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode (6 digits)"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="associateType" className="form-label text-start">Associate Type</label>
                  <select
                    className="form-select"
                    id="associateType"
                    name="associateType"
                    value={formData.associateType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select associate type</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="dsa">DSA</option>
                    <option value="consultant">Consultant</option>
                    <option value="bank_rm">Bank RM</option>
                    <option value="retired_banker">Retired Banker</option>
                  </select>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label htmlFor="experience" className="form-label text-start">Experience (Years)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Years of experience"
                      min="0"
                      max="50"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="qualification" className="form-label text-start">Qualification</label>
                    <input
                      type="text"
                      className="form-control"
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g., MBA, CA, CFA"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="previousOrganization" className="form-label text-start">
                    Previous Organization
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="previousOrganization"
                    name="previousOrganization"
                    value={formData.previousOrganization}
                    onChange={handleChange}
                    placeholder="Previous company/organization"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="currentOccupation" className="form-label text-start">Current Occupation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentOccupation"
                    name="currentOccupation"
                    value={formData.currentOccupation}
                    onChange={handleChange}
                    placeholder="Current job/business"
                  />
                </div>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '800px', width: '100%' }}>
        {/* Header with step indicator */}
        <div className="text-center mb-5">
          <div
            className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '60px', height: '60px' }}
          >
            <i className="bi bi-person-fill text-success" style={{ fontSize: '24px' }}></i>
          </div>
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">Create Account</h4>
          <p className="text-muted">
            {currentStep === 0 && 'Step 1: Basic Information'}
            {currentStep === 1 &&
              (formData.role === 'client' ? 'Step 2: Business Information' : 'Step 2: Professional Information')}
          </p>
        </div>
        {/* Success/error messages */}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* Registration form */}
        <form onSubmit={currentStep === 1 ? handleSubmit : handleNext}>
          {renderStep()}
          <div className="d-flex gap-3 mt-4">
            {currentStep > 0 && (
              <button
                type="button"
                className="btn btn-outline-secondary w-50"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            <button type="submit" className="btn btn-success w-50" disabled={loading}>
              {loading ? 'Processing...' : currentStep === 1 ? 'Register' : 'Next Step'}
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-muted">
          Already have an account?{' '}
          <a href="/login" className="text-orange text-decoration-none">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;