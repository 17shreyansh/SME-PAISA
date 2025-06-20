const express = require('express');
const router = express.Router();
const {
  uploadKYCDocuments,
  getUserDocuments,
  verifyDocuments,
  getPendingDocuments,
  uploadProfileImage
} = require('../controllers/documentController');
const { protect, authorize, requireVerification } = require('../middlewares/auth');
const { uploadDocuments, handleUploadError } = require('../middlewares/upload');
const { validateDocuments } = require('../middlewares/validation');

// All routes require authentication
router.use(protect);

// Document upload routes
router.post('/kyc', 
  requireVerification,
  uploadDocuments.kyc, 
  handleUploadError,
  validateDocuments,
  uploadKYCDocuments
);

router.post('/profile-image',
  uploadDocuments.profile,
  handleUploadError,
  uploadProfileImage
);

// Document verification routes (for verifiers and admins)
router.get('/pending', 
  authorize('verifier', 'admin'), 
  getPendingDocuments
);

router.get('/user/:userId', 
  authorize('verifier', 'admin'), 
  getUserDocuments
);

router.put('/verify/:userId',
  authorize('verifier', 'admin'),
  verifyDocuments
);

module.exports = router;