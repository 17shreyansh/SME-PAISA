const User = require('../models/User');
const Client = require('../models/Client');
const Associate = require('../models/Associate');
const { generateToken, generateRefreshToken, setCookieOptions, setRefreshCookieOptions } = require('../config/jwt');
const { getUserTypeFromRole } = require('../utils/roleUtils');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: process.env.SMTP_SECURE === 'true',
});

// Register user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, associateType, ...additionalData } = req.body;

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

    // Determine user type based on role
    const userType = getUserTypeFromRole(role);

    // Create user
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      userType
    };

    // Add associateType if role is associate
    if (role === 'associate') {
      userData.associateType = associateType || 'freelancer';
    }

    const user = await User.create(userData);

    // Create role-specific profile
    if (role === 'client') {
      await Client.create({
        userId: user._id,
        businessName: additionalData.businessName || '',
        businessType: additionalData.businessType || 'proprietorship',
        industry: additionalData.industry || '',
        businessAddress: additionalData.businessAddress || {}
      });
    }

    if (role === 'associate') {
      await Associate.create({
        userId: user._id,
        uniqueReferralCode: 'REF' + crypto.randomBytes(4).toString('hex').toUpperCase()
      });
    }

    // Generate email verification token using JWT
    const emailToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const hashedToken = crypto.createHash('sha256').update(emailToken).digest('hex');
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    console.log('Generated email verification token for user:', user.email);
    console.log('Token expires at:', new Date(user.emailVerificationExpiry));

    // Generate JWT tokens
    const token = generateToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Set cookies
    res.cookie('token', token, setCookieOptions);
    res.cookie('refreshToken', refreshToken, setRefreshCookieOptions);

    // Send verification email
    await sendVerificationEmail(user, emailToken);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
        associateType: user.associateType,
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
        userType: user.userType,
        role: user.role,
        associateType: user.associateType,
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
    if (user.role === 'client') {
      const clientProfile = await Client.findOne({ userId: user._id });
      profile.clientProfile = clientProfile;
    }

    if (user.role === 'associate') {
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

// Send verification email
const sendVerificationEmail = async (user, token = null) => {
  // If no token provided, generate a new one
  if (!token) {
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationUrl = `${frontendUrl}/verify-email/${token}`;
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: 'Verify Your Email - SME PAISA',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6b35;">Welcome to SME PAISA!</h2>
        <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p style="color: #666; font-size: 12px;">This link will expire in 24 hours.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully to:', user.email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

// Verify email endpoint
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Verify JWT token first
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification link' 
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log('Verifying token for user ID:', decoded.id);
    console.log('Looking for hashed token:', hashedToken);

    const user = await User.findOne({ 
      _id: decoded.id,
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() }
    });
    
    if (!user) {
      console.error('No user found or token expired for:', decoded.id);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification link' 
      });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email is already verified' 
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    user.status = 'active'; // Update status to active after email verification
    await user.save();

    console.log('Email verified successfully for user:', user.email);
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully! You can now proceed with KYC.' 
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during email verification' 
    });
  }
};

// Send verification email endpoint
const sendVerificationEmailEndpoint = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    console.log('Sending verification email to:', user.email);
    await sendVerificationEmail(user);

    res.status(200).json({ 
      success: true, 
      message: 'Verification email sent successfully. Please check your inbox and spam folder.' 
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send verification email. Please try again later.' 
    });
  }
};

// Get verification status
const getVerificationStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('isEmailVerified emailVerificationExpiry');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      isEmailVerified: user.isEmailVerified,
      hasActiveToken: user.emailVerificationExpiry && user.emailVerificationExpiry > Date.now(),
      tokenExpiry: user.emailVerificationExpiry
    });
  } catch (error) {
    console.error('Error getting verification status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  sendVerificationEmail,
  verifyEmail,
  sendVerificationEmailEndpoint,
  getVerificationStatus
};