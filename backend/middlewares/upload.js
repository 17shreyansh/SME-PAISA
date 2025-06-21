const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Secure file storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    
    // Determine upload path based on file type and user
    if (file.fieldname.includes('aadhar')) {
      uploadPath = path.join(__dirname, '../uploads/documents/aadhar');
    } else if (file.fieldname.includes('pan')) {
      uploadPath = path.join(__dirname, '../uploads/documents/pan');
    } else if (file.fieldname.includes('cheque') || file.fieldname.includes('bank')) {
      uploadPath = path.join(__dirname, '../uploads/documents/bank');
    } else if (file.fieldname.includes('profile')) {
      uploadPath = path.join(__dirname, '../uploads/profiles');
    } else {
      uploadPath = path.join(__dirname, '../uploads/documents/others');
    }
    
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate secure filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${req.user.id}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  }
});

// File filter for security
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = {
    'image/jpeg': true,
    'image/jpg': true,
    'image/png': true,
    'image/webp': true,
    'application/pdf': true
  };

  // Check file type
  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and PDF files are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files per request
  },
  fileFilter: fileFilter
});

// Middleware for different document types
const uploadDocuments = {
  // KYC documents
  kyc: upload.fields([
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'chequeImage', maxCount: 1 },
    { name: 'gstReturns', maxCount: 12 },
    { name: 'bankStatements', maxCount: 12 },
    { name: 'balanceSheetCurrent', maxCount: 1 },
    { name: 'balanceSheetLast', maxCount: 1 }
  ]),
  
  // Profile image
  profile: upload.single('profileImage'),
  
  // Single document
  single: upload.single('document'),
  
  // Multiple documents
  multiple: upload.array('documents', 5)
};

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size allowed is 5MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 10 files allowed.'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field.'
      });
    }
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  return res.status(500).json({
    success: false,
    message: 'File upload error occurred.'
  });
};

module.exports = {
  uploadDocuments,
  handleUploadError
};