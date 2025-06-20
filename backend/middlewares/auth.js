const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid. User not found.'
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Account is suspended. Contact administrator.'
      });
    }

    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Token is not valid.'
    });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
      });
    }

    const hasRole = roles.includes(req.user.role);
    
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

// Authorize by user type (external/internal)
const authorizeUserType = (...userTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
      });
    }

    const hasUserType = userTypes.includes(req.user.userType);
    
    if (!hasUserType) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required user types: ${userTypes.join(', ')}`
      });
    }

    next();
  };
};

// Authorize admin roles (super_admin)
const authorizeAdmin = () => {
  return authorize('super_admin');
};

// Authorize staff roles (all internal staff)
const authorizeStaff = () => {
  return authorize(
    'coordinator', 'verifier', 'operations_staff', 'documentation_staff',
    'credit_team_staff', 'compliance_staff', 'governance_staff',
    'hr_staff', 'training_staff', 'finance_staff', 'payouts_staff',
    'internal_sales_rm'
  );
};

// Authorize internal users (admin + staff)
const authorizeInternal = () => {
  return authorizeUserType('internal');
};

// Check if user has completed KYC
const requireKYC = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please login first.'
    });
  }

  if (req.user.kycStatus !== 'completed') {
    return res.status(403).json({
      success: false,
      message: 'KYC verification required. Please complete your KYC to access this feature.'
    });
  }

  next();
};

// Check if user is verified
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please login first.'
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Email verification required. Please verify your email to access this feature.'
    });
  }

  next();
};

module.exports = {
  protect,
  authorize,
  authorizeUserType,
  authorizeAdmin,
  authorizeStaff,
  authorizeInternal,
  requireKYC,
  requireVerification
};