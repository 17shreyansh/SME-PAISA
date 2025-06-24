const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  verifyEmail,
  sendVerificationEmailEndpoint,
  getVerificationStatus
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordChange
} = require('../middlewares/validation');

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.get('/verify-email/:token', verifyEmail);

// Protected routes
router.use(protect); // All routes below require authentication

router.post('/logout', logout);
router.get('/profile', getProfile);
router.put('/change-password', validatePasswordChange, changePassword);
router.post('/send-verification-email', sendVerificationEmailEndpoint);
router.get('/verification-status', getVerificationStatus);

module.exports = router;