const mongoose = require('mongoose');
const crypto = require('crypto');

const associateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },

  // Associate Details (type is now stored in User model)
  // associateType moved to User model for consistency
  uniqueReferralCode: { 
    type: String, 
    unique: true, 
    required: true
  },

  // Professional Information
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience cannot exceed 50 years']
  },
  qualification: {
    type: String,
    trim: true
  },
  previousOrganization: {
    type: String,
    trim: true
  },
  currentOccupation: {
    type: String,
    trim: true
  },

  // Performance Metrics
  totalLeads: { type: Number, default: 0 },
  convertedLeads: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  pendingPayouts: { type: Number, default: 0 },
  rating: { 
    type: Number, 
    default: 0, 
    min: [0, 'Rating cannot be less than 0'], 
    max: [5, 'Rating cannot be more than 5'] 
  },

  // Commission Structure
  commissionStructure: {
    workingCapital: { type: Number, default: 0.5 },
    termLoan: { type: Number, default: 0.75 },
    cgtmse: { type: Number, default: 1.0 },
    corporateFinance: { type: Number, default: 0.25 }
  },

  // Regional Assignment
  assignedRegions: [{
    type: String,
    trim: true
  }],
  assignedProducts: [{
    type: String,
    enum: ['working_capital', 'term_loan', 'cgtmse', 'corporate_finance']
  }],

  // Training & Certification
  trainingCompleted: [{
    name: String,
    completionDate: Date,
    certificateUrl: String
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    certificateUrl: String
  }],
  lastTrainingDate: Date,

  // Status & Approvals
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: Date,
  rejectionReason: String,

  // Agreement Details
  agreementSigned: { type: Boolean, default: false },
  agreementDate: Date,
  agreementDocument: {
    filename: String,
    path: String,
    uploadDate: Date
  },
  ndaAcceptedDate: Date,
  ndaExpiryDate: Date,

  // Bank Details for Payouts
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    branchName: String,
    accountHolderName: String
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
associateSchema.index({ userId: 1 });
associateSchema.index({ uniqueReferralCode: 1 });
associateSchema.index({ approvalStatus: 1 });
associateSchema.index({ assignedRegions: 1 });

// Pre-save middleware to generate referral code
associateSchema.pre('save', function(next) {
  if (!this.uniqueReferralCode) {
    this.uniqueReferralCode = 'REF' + crypto.randomBytes(4).toString('hex').toUpperCase();
  }
  this.updatedAt = Date.now();
  next();
});

// Virtual for conversion rate
associateSchema.virtual('conversionRate').get(function() {
  return this.totalLeads > 0 ? (this.convertedLeads / this.totalLeads * 100).toFixed(2) : 0;
});

module.exports = mongoose.model('Associate', associateSchema);