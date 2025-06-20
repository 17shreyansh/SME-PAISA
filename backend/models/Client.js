const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },

  // Business Information
  businessName: { 
    type: String, 
    required: [true, 'Business name is required'],
    trim: true,
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  businessType: {
    type: String,
    enum: ['proprietorship', 'partnership', 'private_limited', 'public_limited', 'llp'],
    required: [true, 'Business type is required']
  },
  industry: { 
    type: String, 
    required: [true, 'Industry is required'],
    trim: true
  },
  yearOfEstablishment: {
    type: Number,
    min: [1900, 'Year of establishment cannot be before 1900'],
    max: [new Date().getFullYear(), 'Year of establishment cannot be in the future']
  },

  // Financial Information
  annualTurnover: {
    type: Number,
    min: [0, 'Annual turnover cannot be negative']
  },
  monthlyRevenue: {
    type: Number,
    min: [0, 'Monthly revenue cannot be negative']
  },
  existingLoanAmount: { 
    type: Number, 
    default: 0,
    min: [0, 'Existing loan amount cannot be negative']
  },
  cibilScore: {
    type: Number,
    min: [300, 'CIBIL score cannot be less than 300'],
    max: [900, 'CIBIL score cannot be more than 900']
  },

  // GST & Registration
  gstNumber: {
    type: String,
    match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, 'Invalid GST number format']
  },
  gstVerified: { type: Boolean, default: false },
  cinNumber: {
    type: String,
    match: [/^[LUF]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/, 'Invalid CIN number format']
  },
  udyamNumber: String,

  // Business Address
  businessAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { 
      type: String, 
      required: true,
      match: [/^\d{6}$/, 'Pincode must be 6 digits']
    },
    country: { type: String, default: 'India' }
  },

  // Associate Reference
  referredBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Associate'
  },
  referralCode: String,

  // Application Status
  applicationStatus: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'disbursed'],
    default: 'draft'
  },

  // Loan Requirements
  loanRequirement: {
    amount: Number,
    purpose: String,
    tenure: Number, // in months
    loanType: {
      type: String,
      enum: ['working_capital', 'term_loan', 'cgtmse', 'corporate_finance']
    }
  },

  // Documents Status
  documentsStatus: {
    businessRegistration: { type: Boolean, default: false },
    financialStatements: { type: Boolean, default: false },
    bankStatements: { type: Boolean, default: false },
    gstReturns: { type: Boolean, default: false },
    projectReport: { type: Boolean, default: false }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
clientSchema.index({ userId: 1 });
clientSchema.index({ referredBy: 1 });
clientSchema.index({ applicationStatus: 1 });
clientSchema.index({ 'businessAddress.city': 1 });
clientSchema.index({ 'businessAddress.state': 1 });

// Update timestamp on save
clientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Client', clientSchema);