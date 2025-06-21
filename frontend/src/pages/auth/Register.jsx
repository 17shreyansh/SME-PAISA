import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    businessName: '',
    businessType: '',
    industry: '',
    yearOfEstablishment: '',
    annualTurnover: '',
    gstNumber: '',
    businessAddress: { street: '', city: '', state: '', pincode: '' },
    associateType: '',
    experience: '',
    qualification: '',
    previousOrganization: '',
    currentOccupation: '',
    aadhar: { number: '', frontImage: '', backImage: '' },
    pan: { number: '', image: '' },
    bankDetails: { accountNumber: '', ifscCode: '', bankName: '', branchName: '', chequeImage: '' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('businessAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        businessAddress: { ...prev.businessAddress, [field]: value }
      }));
    } else if (name.startsWith('aadhar.') || name.startsWith('pan.') || name.startsWith('bankDetails.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep === 0 && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration completed:', formData);
    alert('Registration completed! Please check your email for verification.');
    window.location.href = '/login';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="form-label text-start ">First Name</label>
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
                placeholder="Enter your phone"
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
                placeholder="Create password"
                required
                minLength="6"
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
                <label className="btn btn-outline-primary w-50 text-center" htmlFor="client">Client (Looking for funding)</label>
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="associate"
                  value="associate"
                  checked={formData.role === 'associate'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary w-50 text-center" htmlFor="associate">Associate (Business partner)</label>
              </div>
            </div>
          </>
        );
      case 1:
        return formData.role === 'client' ? (
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
                <label htmlFor="yearOfEstablishment" className="form-label text-start">Year of Establishment</label>
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
              <label className="form-label text-start">Business Address</label>
              <input
                type="text"
                className="form-control mb-2"
                name="businessAddress.street"
                value={formData.businessAddress.street}
                onChange={handleChange}
                placeholder="Enter street address"
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
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control mt-2"
                name="businessAddress.pincode"
                value={formData.businessAddress.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
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
              <label htmlFor="previousOrganization" className="form-label text-start">Previous Organization</label>
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
        );
      case 2:
        return (
          <>
            <div className="card border-2 border-dashed border-secondary p-3 mb-4">
              <h5 className="card-title">Aadhar Card</h5>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label text-start">Front Image</label>
                  <div className="input-group">
                    <input type="file" className="form-control" accept="image/*" />
                    <button className="btn btn-outline-secondary" type="button">Upload</button>
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label text-start">Back Image</label>
                  <div className="input-group">
                    <input type="file" className="form-control" accept="image/*" />
                    <button className="btn btn-outline-secondary" type="button">Upload</button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="aadhar.number" className="form-label text-start">Aadhar Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="aadhar.number"
                  name="aadhar.number"
                  value={formData.aadhar.number}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                />
              </div>
            </div>
            <div className="card border-2 border-dashed border-secondary p-3 mb-4">
              <h5 className="card-title">PAN Card</h5>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label text-start">PAN Image</label>
                  <div className="input-group">
                    <input type="file" className="form-control" accept="image/*" />
                    <button className="btn btn-outline-secondary" type="button">Upload</button>
                  </div>
                </div>
                <div className="col-6">
                  <label htmlFor="pan.number" className="form-label text-start">PAN Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pan.number"
                    name="pan.number"
                    value={formData.pan.number}
                    onChange={handleChange}
                    placeholder="Enter PAN number"
                  />
                </div>
              </div>
            </div>
            <div className="card border-2 border-dashed border-secondary p-3 mb-4">
              <h5 className="card-title">Bank Details</h5>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label htmlFor="bankDetails.accountNumber" className="form-label text-start">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankDetails.accountNumber"
                    name="bankDetails.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleChange}
                    placeholder="Account number"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="bankDetails.ifscCode" className="form-label text-start">IFSC Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankDetails.ifscCode"
                    name="bankDetails.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleChange}
                    placeholder="IFSC code"
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label htmlFor="bankDetails.bankName" className="form-label text-start">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankDetails.bankName"
                    name="bankDetails.bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleChange}
                    placeholder="Bank name"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="bankDetails.branchName" className="form-label text-start">Branch Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bankDetails.branchName"
                    name="bankDetails.branchName"
                    value={formData.bankDetails.branchName}
                    onChange={handleChange}
                    placeholder="Branch name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-start">Cancelled Cheque</label>
                <div className="input-group">
                  <input type="file" className="form-control" accept="image/*" />
                  <button className="btn btn-outline-secondary" type="button">Upload</button>
                </div>
              </div>
            </div>
            <div className="alert alert-warning mb-4" role="alert">
              <h5 className="alert-heading">Important Note</h5>
              <p className="mb-0">All documents will be verified by our team. You will receive an email confirmation once your account is approved.</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="text-center mb-5">
          <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-person-fill text-success" style={{ fontSize: '24px' }}></i>
          </div>
          <h2 className="text-orange mb-1">SME PAISA</h2>
          <h4 className="mb-0">Create Account</h4>
          <p className="text-muted">
            {currentStep === 0 && 'Step 1: Basic Information'}
            {currentStep === 1 && (formData.role === 'client' ? 'Step 2: Business Information' : 'Step 2: Professional Information')}
            {currentStep === 2 && 'Step 3: KYC Verification'}
          </p>
        </div>
        <form onSubmit={currentStep === 2 ? handleSubmit : handleNext}>
          {renderStep()}
          <div className="d-flex gap-3 mt-4">
            {currentStep > 0 && (
              <button type="button" className="btn btn-outline-secondary w-50" onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
            )}
            {currentStep < 2 ? (
              <button type="submit" className="btn btn-success w-50">Next Step</button>
            ) : (
              <button type="submit" className="btn btn-purple w-50">Submit KYC</button>
            )}
          </div>
        </form>
        <p className="text-center mt-4 text-muted">
          Already have an account? <a href="/login" className="text-orange text-decoration-none">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;