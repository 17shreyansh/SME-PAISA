const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Upload KYC documents
const uploadKYCDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { aadharNumber, panNumber, accountNumber, ifscCode, bankName, branchName } = req.body;
    
    // Determine who is uploading (client or associate)
    let targetUserId = req.user.id;
    let uploader = { user: req.user.id, role: req.user.role };
    if (req.user.role === 'associate' && req.body.clientId) {
      targetUserId = req.body.clientId;
    }

    const user = await User.findById(targetUserId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updateData = {};

    // Handle Aadhar documents
    if (req.files.aadharFront || req.files.aadharBack || aadharNumber) {
      updateData['documents.aadhar'] = {
        ...user.documents.aadhar,
        number: aadharNumber || user.documents.aadhar.number
      };

      if (req.files.aadharFront) {
        updateData['documents.aadhar.frontImage'] = {
          filename: req.files.aadharFront[0].filename,
          path: req.files.aadharFront[0].path,
          uploadDate: new Date(),
          uploadedBy: uploader
        };
      }
      if (req.files.aadharBack) {
        updateData['documents.aadhar.backImage'] = {
          filename: req.files.aadharBack[0].filename,
          path: req.files.aadharBack[0].path,
          uploadDate: new Date(),
          uploadedBy: uploader
        };
      }
    }

    // Handle PAN document
    if (req.files.panCard || panNumber) {
      updateData['documents.pan'] = {
        ...user.documents.pan,
        number: panNumber || user.documents.pan.number
      };

      if (req.files.panCard) {
        updateData['documents.pan.image'] = {
          filename: req.files.panCard[0].filename,
          path: req.files.panCard[0].path,
          uploadDate: new Date(),
          uploadedBy: uploader
        };
      }
    }

    // Handle Bank documents
    if (req.files.chequeImage || accountNumber || ifscCode || bankName || branchName) {
      updateData['documents.bankDetails'] = {
        ...user.documents.bankDetails,
        accountNumber: accountNumber || user.documents.bankDetails.accountNumber,
        ifscCode: ifscCode || user.documents.bankDetails.ifscCode,
        bankName: bankName || user.documents.bankDetails.bankName,
        branchName: branchName || user.documents.bankDetails.branchName
      };

      if (req.files.chequeImage) {
        updateData['documents.bankDetails.chequeImage'] = {
          filename: req.files.chequeImage[0].filename,
          path: req.files.chequeImage[0].path,
          uploadDate: new Date(),
          uploadedBy: uploader
        };
      }
    }

    // Handle GST Returns (12 months)
    if (req.files.gstReturns) {
      updateData['documents.gstReturns'] = req.files.gstReturns.map((file, idx) => ({
        month: req.body[`gstMonth${idx}`] || '',
        file: {
          filename: file.filename,
          path: file.path,
          uploadDate: new Date(),
          uploadedBy: uploader
        }
      }));
    }

    // Handle Bank Statements (12 months)
    if (req.files.bankStatements) {
      updateData['documents.bankStatements'] = req.files.bankStatements.map((file, idx) => ({
        month: req.body[`bankMonth${idx}`] || '',
        file: {
          filename: file.filename,
          path: file.path,
          uploadDate: new Date(),
          uploadedBy: uploader
        }
      }));
    }

    // Handle Balance Sheets
    if (req.files.balanceSheetCurrent) {
      updateData['documents.balanceSheets.currentYear'] = {
        filename: req.files.balanceSheetCurrent[0].filename,
        path: req.files.balanceSheetCurrent[0].path,
        uploadDate: new Date(),
        uploadedBy: uploader
      };
    }
    if (req.files.balanceSheetLast) {
      updateData['documents.balanceSheets.lastYear'] = {
        filename: req.files.balanceSheetLast[0].filename,
        path: req.files.balanceSheetLast[0].path,
        uploadDate: new Date(),
        uploadedBy: uploader
      };
    }

    // Update KYC status
    updateData.kycStatus = 'in_progress';

    await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({
      success: true,
      message: 'Documents uploaded successfully. KYC verification is in progress.',
      uploadedFiles: Object.keys(req.files || {})
    });

  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document upload'
    });
  }
};

// Get user documents (for verification)
const getUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('firstName lastName email documents kycStatus');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        kycStatus: user.kycStatus,
        documents: user.documents
      }
    });

  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching documents'
    });
  }
};

// Verify or reject documents (for verifiers)
const verifyDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    const { documentType, action, rejectionReason } = req.body; // documentType: 'aadhar', 'pan', 'bankDetails'
    const verifierId = req.user.id;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "approve" or "reject"'
      });
    }

    if (action === 'reject' && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updateData = {};
    
    if (action === 'approve') {
      updateData[`documents.${documentType}.verified`] = true;
      updateData[`documents.${documentType}.verifiedBy`] = verifierId;
      updateData[`documents.${documentType}.verificationDate`] = new Date();
      updateData[`documents.${documentType}.rejectionReason`] = undefined;
    } else {
      updateData[`documents.${documentType}.verified`] = false;
      updateData[`documents.${documentType}.rejectionReason`] = rejectionReason;
    }

    await User.findByIdAndUpdate(userId, updateData);

    // Check if all documents are verified to update KYC status
    const updatedUser = await User.findById(userId);
    const { aadhar, pan, bankDetails } = updatedUser.documents;
    
    if (aadhar.verified && pan.verified && bankDetails.verified) {
      await User.findByIdAndUpdate(userId, {
        kycStatus: 'completed',
        kycCompletedDate: new Date()
      });
    }

    res.json({
      success: true,
      message: `Document ${action}d successfully`,
      documentType,
      action
    });

  } catch (error) {
    console.error('Document verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document verification'
    });
  }
};

// Get pending documents for verification
const getPendingDocuments = async (req, res) => {
  try {
    const users = await User.find({
      kycStatus: 'in_progress',
      $or: [
        { 'documents.aadhar.verified': false, 'documents.aadhar.frontImage.filename': { $exists: true } },
        { 'documents.pan.verified': false, 'documents.pan.image.filename': { $exists: true } },
        { 'documents.bankDetails.verified': false, 'documents.bankDetails.chequeImage.filename': { $exists: true } }
      ]
    }).select('firstName lastName email documents kycStatus createdAt');

    const pendingDocuments = users.map(user => ({
      userId: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      kycStatus: user.kycStatus,
      submittedDate: user.createdAt,
      pendingDocuments: {
        aadhar: !user.documents.aadhar.verified && user.documents.aadhar.frontImage?.filename,
        pan: !user.documents.pan.verified && user.documents.pan.image?.filename,
        bankDetails: !user.documents.bankDetails.verified && user.documents.bankDetails.chequeImage?.filename
      }
    }));

    res.json({
      success: true,
      count: pendingDocuments.length,
      pendingDocuments
    });

  } catch (error) {
    console.error('Get pending documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending documents'
    });
  }
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const updateData = {
      profileImage: {
        filename: req.file.filename,
        path: req.file.path,
        uploadDate: new Date()
      }
    };

    await User.findByIdAndUpdate(userId, updateData);

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      filename: req.file.filename
    });

  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile image upload'
    });
  }
};

module.exports = {
  uploadKYCDocuments,
  getUserDocuments,
  verifyDocuments,
  getPendingDocuments,
  uploadProfileImage
};