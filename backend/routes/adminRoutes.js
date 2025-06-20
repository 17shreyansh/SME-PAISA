const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Associate = require('../models/Associate');
const { protect, authorizeAdmin } = require('../middlewares/auth');
const { validateUserRegistration } = require('../middlewares/validation');
const { getAllInternalRoles, getUserTypeFromRole } = require('../utils/roleUtils');
const crypto = require('crypto');

// All routes require admin authentication
router.use(protect);
router.use(authorizeAdmin());

// Create staff account
const createStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    // Validate that role is internal
    const internalRoles = getAllInternalRoles();

    if (!internalRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role for staff creation'
      });
    }

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

    // Create staff user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      userType: getUserTypeFromRole(role),
      role,
      status: 'active',
      isEmailVerified: true // Staff accounts are pre-verified
    });

    res.status(201).json({
      success: true,
      message: 'Staff account created successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Create staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating staff account'
    });
  }
};

// Get all users with filters
const getAllUsers = async (req, res) => {
  try {
    const { userType, role, status, kycStatus, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (userType) filter.userType = userType;
    if (role) filter.role = role;
    if (status) filter.status = status;
    if (kycStatus) filter.kycStatus = kycStatus;

    const users = await User.find(filter)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// Update user status
const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, reason } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        status,
        statusUpdateReason: reason,
        statusUpdatedBy: req.user.id,
        statusUpdatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: `User status updated to ${status}`,
      user
    });

  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user status'
    });
  }
};

// Get system statistics
const getSystemStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments({ role: 'client' }),
      User.countDocuments({ role: 'associate' }),
      User.countDocuments({ userType: 'external' }),
      User.countDocuments({ userType: 'internal' }),
      User.countDocuments({ kycStatus: 'pending' }),
      User.countDocuments({ kycStatus: 'in_progress' }),
      User.countDocuments({ kycStatus: 'completed' }),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'suspended' }),
      Associate.countDocuments({ approvalStatus: 'pending' })
    ]);

    res.json({
      success: true,
      stats: {
        totalClients: stats[0],
        totalAssociates: stats[1],
        totalExternalUsers: stats[2],
        totalInternalUsers: stats[3],
        pendingKYC: stats[4],
        inProgressKYC: stats[5],
        completedKYC: stats[6],
        activeUsers: stats[7],
        suspendedUsers: stats[8],
        pendingAssociateApprovals: stats[9]
      }
    });

  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching system statistics'
    });
  }
};

// Routes
router.post('/create-staff', validateUserRegistration, createStaff);
router.get('/users', getAllUsers);
router.put('/users/:userId/status', updateUserStatus);
router.get('/stats', getSystemStats);

module.exports = router;