const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // Basic Info
  firstName: { 
    type: String, 
    required: [true, 'First name is required'], 
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'], 
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'], 
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },

  // User Role & Status
  role: {
    type: [String],
    enum: ['client', 'associate', 'coordinator', 'verifier', 'admin'],
    required: [true, 'User role is required']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
    default: 'pending_verification'
  },

  // Verification & Security
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpiry: Date,
  phoneVerificationOTP: String,
  otpExpiry: Date,
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  passwordResetToken: String,
  passwordResetExpiry: Date,

  // Profile & Documents
  profileImage: {
    filename: String,
    path: String,
    uploadDate: Date
  },
  documents: {
    aadhar: {
      number: { 
        type: String,
        match: [/^\d{12}$/, 'Aadhar number must be 12 digits']
      },
      frontImage: {
        filename: String,
        path: String,
        uploadDate: Date
      },
      backImage: {
        filename: String,
        path: String,
        uploadDate: Date
      },
      verified: { type: Boolean, default: false },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verificationDate: Date,
      rejectionReason: String
    },
    pan: {
      number: { 
        type: String,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format']
      },
      image: {
        filename: String,
        path: String,
        uploadDate: Date
      },
      verified: { type: Boolean, default: false },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verificationDate: Date,
      rejectionReason: String
    },
    bankDetails: {
      accountNumber: String,
      ifscCode: { 
        type: String,
        match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format']
      },
      bankName: String,
      branchName: String,
      chequeImage: {
        filename: String,
        path: String,
        uploadDate: Date
      },
      verified: { type: Boolean, default: false },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      verificationDate: Date,
      rejectionReason: String
    }
  },

  // Address
  address: {
    street: String,
    city: String,
    state: String,
    pincode: { 
      type: String,
      match: [/^\d{6}$/, 'Pincode must be 6 digits']
    },
    country: { type: String, default: 'India' }
  },

  // KYC Status
  kycStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'rejected'],
    default: 'pending'
  },
  kycCompletedDate: Date,

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { loginAttempts: 1, lockUntil: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Method to generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordResetExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return token;
};

module.exports = mongoose.model('User', userSchema);