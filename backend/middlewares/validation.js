const { body, validationResult } = require('express-validator');
const { validateRole, validateAssociateType } = require('../utils/roleUtils');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian phone number'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .custom((role) => {
      return validateRole(role);
    })
    .withMessage('Invalid role specified'),
  
  body('associateType')
    .optional()
    .custom((type, { req }) => {
      if (req.body.role === 'associate' && !type) {
        throw new Error('Associate type is required for associate role');
      }
      if (type && !validateAssociateType(type)) {
        throw new Error('Invalid associate type');
      }
      return true;
    }),
  
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Password change validation
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Client profile validation
const validateClientProfile = [
  body('businessName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  
  body('businessType')
    .isIn(['proprietorship', 'partnership', 'private_limited', 'public_limited', 'llp'])
    .withMessage('Invalid business type'),
  
  body('industry')
    .trim()
    .notEmpty()
    .withMessage('Industry is required'),
  
  body('businessAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Business street address is required'),
  
  body('businessAddress.city')
    .trim()
    .notEmpty()
    .withMessage('Business city is required'),
  
  body('businessAddress.state')
    .trim()
    .notEmpty()
    .withMessage('Business state is required'),
  
  body('businessAddress.pincode')
    .matches(/^\d{6}$/)
    .withMessage('Pincode must be 6 digits'),
  
  body('gstNumber')
    .optional()
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/)
    .withMessage('Invalid GST number format'),
  
  handleValidationErrors
];

// Associate profile validation
const validateAssociateProfile = [
  body('associateType')
    .custom((type) => {
      return validateAssociateType(type);
    })
    .withMessage('Invalid associate type'),
  
  body('experience')
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  
  body('qualification')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Qualification cannot exceed 100 characters'),
  
  handleValidationErrors
];

// Document validation
const validateDocuments = [
  body('aadharNumber')
    .optional()
    .matches(/^\d{12}$/)
    .withMessage('Aadhar number must be 12 digits'),
  
  body('panNumber')
    .optional()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage('Invalid PAN format'),
  
  body('ifscCode')
    .optional()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage('Invalid IFSC code format'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordChange,
  validateClientProfile,
  validateAssociateProfile,
  validateDocuments,
  handleValidationErrors
};