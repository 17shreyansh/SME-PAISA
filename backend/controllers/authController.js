const User = require('../models/User');
const Client = require('../models/Client');
const Associate = require('../models/Associate');
const { generateToken, generateRefreshToken, setCookieOptions, setRefreshCookieOptions } = require('../config/jwt');
const crypto = require('crypto');

// Register user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, ...additionalData } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone number'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });

    // Create role-specific profile
    if (role.includes('client')) {
      await Client.create({
        userId: user._id,
        businessName: additionalData.businessName || '',
        businessType: additionalData.businessType || 'proprietorship',
        industry: additionalData.industry || '',
        businessAddress: additionalData.businessAddress || {}
      });
    }

    if (role.includes('associate')) {
      await Associate.create({
        userId: user._id,
        associateType: additionalData.associateType || 'freelancer',
        uniqueReferralCode: 'REF' + crypto.randomBytes(4).toString('hex').toUpperCase()
      });
    }

    // Generate email verification token
    const emailToken = user.generateEmailVerificationToken();
    await user.save();

    // Generate JWT tokens
    const token = generateToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Set cookies
    res.cookie('token', token, setCookieOptions);
    res.cookie('refreshToken', refreshToken, setRefreshCookieOptions);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
        kycStatus: user.kycStatus
      },
      emailVerificationToken: emailToken // In production, send this via email
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts. Please try again later.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check account status
    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Account is suspended. Please contact administrator.'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Generate JWT tokens
    const token = generateToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Set cookies
    res.cookie('token', token, setCookieOptions);
    res.cookie('refreshToken', refreshToken, setRefreshCookieOptions);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
        kycStatus: user.kycStatus,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Logout user
const logout = (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = req.user;
    let profile = { user };

    // Get role-specific profile data
    if (user.role.includes('client')) {
      const clientProfile = await Client.findOne({ userId: user._id });
      profile.clientProfile = clientProfile;
    }

    if (user.role.includes('associate')) {
      const associateProfile = await Associate.findOne({ userId: user._id });
      profile.associateProfile = associateProfile;
    }

    res.json({
      success: true,
      profile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Get user with password
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing password'
    });
  }
};

// Verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    user.status = 'active';
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  verifyEmail
};