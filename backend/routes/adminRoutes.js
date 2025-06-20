const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Associate = require('../models/Associate');
const { protect, authorize } = require('../middlewares/auth');
const { validateUserRegistration } = require('../middlewares/validation');
const crypto = require('crypto');

// All routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

// Create staff account
const createStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, staffType, permissions } = req.body;

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
      role,
      status: 'active',
      isEmailVerified: true, // Staff accounts are pre-verified
      staffType,
      permissions: permissions || []
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
        role: user.role,
        status: user.status,
        staffType: user.staffType
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
    const { role, status, kycStatus, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (role) filter.role = { $in: [role] };
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
      User.countDocuments({ role: { $in: ['client'] } }),
      User.countDocuments({ role: { $in: ['associate'] } }),
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
        pendingKYC: stats[2],
        inProgressKYC: stats[3],
        completedKYC: stats[4],
        activeUsers: stats[5],
        suspendedUsers: stats[6],
        pendingAssociateApprovals: stats[7]
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