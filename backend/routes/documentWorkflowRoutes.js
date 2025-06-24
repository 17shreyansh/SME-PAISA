const express = require('express');
const router = express.Router();
const {
  uploadDocument,
  getDocuments,
  verifyDocument
} = require('../controllers/documentWorkflowController');
const { protect, authorize } = require('../middlewares/auth');
const { uploadDocuments, handleUploadError } = require('../middlewares/upload');

router.use(protect);

// Upload document (client/associate)
router.post('/', uploadDocuments.single, handleUploadError, uploadDocument);

// Get documents (by client or application)
router.get('/', getDocuments);

// Verifier updates document status
router.put('/:id/verify', authorize('verifier', 'admin'), verifyDocument);

module.exports = router;
