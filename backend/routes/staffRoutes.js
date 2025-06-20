const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Client = require('../models/Client');
const Associate = require('../models/Associate');
const { protect, authorizeStaff, authorizeInternal } = require('../middlewares/auth');

// All routes require staff authentication
router.use(protect);
router.use(authorizeInternal());

// Get pending KYC verifications (for verifiers)
const getPendingKYC = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      kycStatus: { $in: ['pending', 'in_progress'] }
    }).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      pendingKYC: pendingUsers
    });
  } catch (error) {
    console.error('Get pending KYC error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending KYC'
    });
  }
};

// Update KYC status (for verifiers)
const updateKYCStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['in_progress', 'completed', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid KYC status'
      });
    }

    const updateData = {
      kycStatus: status,
      kycVerifiedBy: req.user.id,
      kycVerificationDate: new Date()
    };

    if (status === 'completed') {
      updateData.kycCompletedDate = new Date();
    }

    if (status === 'rejected' && rejectionReason) {
      updateData.kycRejectionReason = rejectionReason;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true })
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `KYC status updated to ${status}`,
      user
    });
  } catch (error) {
    console.error('Update KYC status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating KYC status'
    });
  }
};

// Get pending associate approvals (for coordinators)
const getPendingAssociates = async (req, res) => {
  try {
    const pendingAssociates = await Associate.find({
      approvalStatus: 'pending'
    }).populate('userId', 'firstName lastName email phone associateType');

    res.json({
      success: true,
      pendingAssociates
    });
  } catch (error) {
    console.error('Get pending associates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending associates'
    });
  }
};

// Update associate approval status (for coordinators)
const updateAssociateStatus = async (req, res) => {
  try {
    const { associateId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected', 'under_review'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid approval status'
      });
    }

    const updateData = {
      approvalStatus: status,
      approvedBy: req.user.id,
      approvalDate: new Date()
    };

    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const associate = await Associate.findByIdAndUpdate(associateId, updateData, { new: true })
      .populate('userId', 'firstName lastName email phone associateType');

    if (!associate) {
      return res.status(404).json({
        success: false,
        message: 'Associate not found'
      });
    }

    res.json({
      success: true,
      message: `Associate status updated to ${status}`,
      associate
    });
  } catch (error) {
    console.error('Update associate status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating associate status'
    });
  }
};

// Get staff dashboard data
const getStaffDashboard = async (req, res) => {
  try {
    const userRole = req.user.role;
    let dashboardData = {};

    // Common data for all staff
    const commonStats = await Promise.all([
      User.countDocuments({ userType: 'external', status: 'active' }),
      User.countDocuments({ kycStatus: 'pending' }),
      Associate.countDocuments({ approvalStatus: 'pending' })
    ]);

    dashboardData.totalActiveUsers = commonStats[0];
    dashboardData.pendingKYC = commonStats[1];
    dashboardData.pendingAssociateApprovals = commonStats[2];

    // Role-specific data
    switch (userRole) {
      case 'verifier':
        const pendingVerifications = await User.find({
          kycStatus: { $in: ['pending', 'in_progress'] }
        }).select('firstName lastName email kycStatus createdAt').limit(10);
        dashboardData.pendingVerifications = pendingVerifications;
        break;

      case 'coordinator':
        const pendingAssociates = await Associate.find({
          approvalStatus: 'pending'
        }).populate('userId', 'firstName lastName email associateType').limit(10);
        dashboardData.pendingAssociates = pendingAssociates;
        break;

      case 'credit_team_staff':
        // Add credit-specific data
        dashboardData.pendingCreditApplications = 0; // Placeholder
        break;

      case 'finance_staff':
      case 'payouts_staff':
        // Add finance-specific data
        dashboardData.pendingPayouts = 0; // Placeholder
        break;
    }

    res.json({
      success: true,
      dashboard: dashboardData
    });
  } catch (error) {
    console.error('Get staff dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
};

// Routes
router.get('/kyc/pending', getPendingKYC);
router.put('/kyc/:userId/status', updateKYCStatus);
router.get('/associates/pending', getPendingAssociates);
router.put('/associates/:associateId/status', updateAssociateStatus);
router.get('/dashboard', getStaffDashboard);

module.exports = router;