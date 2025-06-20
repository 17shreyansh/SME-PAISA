// Role definitions and utilities for SME PAISA Platform

const ROLES = {
  // External Users
  EXTERNAL: {
    CLIENT: 'client',
    ASSOCIATE: 'associate'
  },
  
  // Internal Users - Admin
  ADMIN: {
    SUPER_ADMIN: 'super_admin'
  },
  
  // Internal Users - Staff
  STAFF: {
    COORDINATOR: 'coordinator',
    VERIFIER: 'verifier',
    OPERATIONS_STAFF: 'operations_staff',
    DOCUMENTATION_STAFF: 'documentation_staff',
    CREDIT_TEAM_STAFF: 'credit_team_staff',
    COMPLIANCE_STAFF: 'compliance_staff',
    GOVERNANCE_STAFF: 'governance_staff',
    HR_STAFF: 'hr_staff',
    TRAINING_STAFF: 'training_staff',
    FINANCE_STAFF: 'finance_staff',
    PAYOUTS_STAFF: 'payouts_staff',
    INTERNAL_SALES_RM: 'internal_sales_rm'
  }
};

const ASSOCIATE_TYPES = {
  FREELANCER: 'freelancer',
  DSA: 'dsa',
  CONSULTANT: 'consultant',
  BANK_RM: 'bank_rm'
};

const USER_TYPES = {
  EXTERNAL: 'external',
  INTERNAL: 'internal'
};

// Helper functions
const isExternalUser = (role) => {
  return Object.values(ROLES.EXTERNAL).includes(role);
};

const isInternalUser = (role) => {
  return Object.values(ROLES.ADMIN).includes(role) || 
         Object.values(ROLES.STAFF).includes(role);
};

const isAdmin = (role) => {
  return Object.values(ROLES.ADMIN).includes(role);
};

const isStaff = (role) => {
  return Object.values(ROLES.STAFF).includes(role);
};

const getAllExternalRoles = () => {
  return Object.values(ROLES.EXTERNAL);
};

const getAllInternalRoles = () => {
  return [...Object.values(ROLES.ADMIN), ...Object.values(ROLES.STAFF)];
};

const getAllStaffRoles = () => {
  return Object.values(ROLES.STAFF);
};

const getAllAdminRoles = () => {
  return Object.values(ROLES.ADMIN);
};

const getRoleDisplayName = (role) => {
  const roleMap = {
    // External
    'client': 'Client (MSME/Business Owner)',
    'associate': 'Associate',
    
    // Admin
    'super_admin': 'Super Admin',
    
    // Staff
    'coordinator': 'Coordinator',
    'verifier': 'Verifier',
    'operations_staff': 'Operations Staff',
    'documentation_staff': 'Documentation Staff',
    'credit_team_staff': 'Credit Team Staff',
    'compliance_staff': 'Compliance Staff',
    'governance_staff': 'Governance Staff',
    'hr_staff': 'HR Staff',
    'training_staff': 'Training Staff',
    'finance_staff': 'Finance Staff',
    'payouts_staff': 'Payouts Staff',
    'internal_sales_rm': 'Internal Sales/Relationship Manager'
  };
  
  return roleMap[role] || role;
};

const getAssociateTypeDisplayName = (type) => {
  const typeMap = {
    'freelancer': 'Freelancer',
    'dsa': 'DSA (Direct Selling Agent)',
    'consultant': 'Consultant',
    'bank_rm': 'Bank RM (Relationship Manager)'
  };
  
  return typeMap[type] || type;
};

const validateRole = (role) => {
  const allRoles = [...getAllExternalRoles(), ...getAllInternalRoles()];
  return allRoles.includes(role);
};

const validateAssociateType = (type) => {
  return Object.values(ASSOCIATE_TYPES).includes(type);
};

const getUserTypeFromRole = (role) => {
  if (isExternalUser(role)) return USER_TYPES.EXTERNAL;
  if (isInternalUser(role)) return USER_TYPES.INTERNAL;
  return null;
};

module.exports = {
  ROLES,
  ASSOCIATE_TYPES,
  USER_TYPES,
  isExternalUser,
  isInternalUser,
  isAdmin,
  isStaff,
  getAllExternalRoles,
  getAllInternalRoles,
  getAllStaffRoles,
  getAllAdminRoles,
  getRoleDisplayName,
  getAssociateTypeDisplayName,
  validateRole,
  validateAssociateType,
  getUserTypeFromRole
};