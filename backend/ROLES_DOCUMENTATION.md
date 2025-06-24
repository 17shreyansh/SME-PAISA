# SME PAISA Platform - User Roles Documentation

## Overview
The SME PAISA Platform has been updated to support a comprehensive role-based access control system with two main user categories: External Users and Internal Users.

## User Categories

### External Users
External users are customers and partners who use the platform from outside the organization.

#### 1. Clients (MSMEs / Business Owners)
- **Role**: `client`
- **User `Type**: `exter`nal`
- **Description**: Small and Medium Enterprises or Business Owners seeking financial services
- **Capabilities**: 
  - Apply for loans
  - Upload documents
  - Track application status
  - Manage business profile

#### 2. Associates
- **Role**: `associate`
- **User Type**: `external`
- **Description**: External partners who help generate leads and facilitate business
- **Associate Types**:
  - **Freelancer** (`freelancer`): Independent professionals
  - **DSA** (`dsa`): Direct Selling Agents
  - **Consultant** (`consultant`): Business consultants
  - **Bank RM** (`bank_rm`): Bank Relationship Managers

### Internal Users
Internal users are employees and administrators of the SME PAISA organization.

#### Admin
- **Role**: `super_admin`
- **User Type**: `internal`
- **Description**: System administrators with full access
- **Capabilities**:
  - Manage all users
  - Create staff accounts
  - System configuration
  - Access all features

#### Staff Roles
All staff have `userType: 'internal'` and specific role-based permissions:

1. **Coordinators** (`coordinator`)
   - Coordinate between different teams
   - Manage associate approvals
   - Oversee workflow processes

2. **Verifiers** (`verifier`)
   - Verify KYC documents
   - Validate user information
   - Approve/reject verification requests

3. **Operations & Documentation Staff** (`operations_staff`, `documentation_staff`)
   - Handle operational tasks
   - Manage documentation processes
   - Process applications

4. **Credit Team Staff** (`credit_team_staff`)
   - Assess credit applications
   - Perform credit analysis
   - Make lending decisions

5. **Compliance & Governance Staff** (`compliance_staff`, `governance_staff`)
   - Ensure regulatory compliance
   - Monitor governance policies
   - Risk management

6. **HR & Training Staff** (`hr_staff`, `training_staff`)
   - Manage human resources
   - Conduct training programs
   - Staff development

7. **Finance & Payouts Staff** (`finance_staff`, `payouts_staff`)
   - Handle financial operations
   - Process payouts to associates
   - Financial reporting

8. **Internal Sales / Relationship Managers** (`internal_sales_rm`)
   - Manage client relationships
   - Internal sales operations
   - Customer support

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (external users)
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Admin Operations
- `POST /api/admin/create-staff` - Create internal staff accounts
- `GET /api/admin/users` - Get all users with filters
- `PUT /api/admin/users/:userId/status` - Update user status
- `GET /api/admin/stats` - Get system statistics

### Staff Operations
- `GET /api/staff/kyc/pending` - Get pending KYC verifications
- `PUT /api/staff/kyc/:userId/status` - Update KYC status
- `GET /api/staff/associates/pending` - Get pending associate approvals
- `PUT /api/staff/associates/:associateId/status` - Update associate status
- `GET /api/staff/dashboard` - Get role-specific dashboard data

### Associate & Commission Management System (Module 3)

#### Admin APIs

- `GET /api/admin/associates/clients` — List all associates, their clients, and activity (client count, KYC completed count)
- `GET /api/admin/associates/:associateId/commission` — Calculate and view commission for an associate (e.g., Rs. 1000 per client with completed KYC)

##### Example Response for `/api/admin/associates/clients`
```json
{
  "success": true,
  "associates": [
    {
      "associate": { "userId": { "firstName": "...", ... }, ... },
      "clients": [ { "userId": { "firstName": "...", "kycStatus": "completed" }, ... } ],
      "clientCount": 5,
      "kycCompleted": 3
    }
  ]
}
```

##### Example Response for `/api/admin/associates/:associateId/commission`
```json
{
  "success": true,
  "commission": 3000,
  "completedClients": 3
}
```

- Commission logic can be made dynamic as per business rules.
- All endpoints require admin authentication.

## Database Schema Updates

### User Model Changes
```javascript
{
  userType: {
    type: String,
    enum: ['external', 'internal'],
    required: true
  },
  role: {
    type: String,
    enum: [
      // External Users
      'client', 'associate',
      // Internal Users - Admin
      'super_admin',
      // Internal Users - Staff
      'coordinator', 'verifier', 'operations_staff', 'documentation_staff',
      'credit_team_staff', 'compliance_staff', 'governance_staff',
      'hr_staff', 'training_staff', 'finance_staff', 'payouts_staff',
      'internal_sales_rm'
    ],
    required: true
  },
  associateType: {
    type: String,
    enum: ['freelancer', 'dsa', 'consultant', 'bank_rm'],
    required: function() { return this.role === 'associate'; }
  }
}
```

### Associate Model Changes
- Removed `associateType` field (moved to User model)
- Maintained all other associate-specific fields

## Authorization Middleware

### Available Middleware Functions
- `protect` - Require authentication
- `authorize(...roles)` - Authorize specific roles
- `authorizeUserType(...userTypes)` - Authorize by user type
- `authorizeAdmin()` - Admin-only access
- `authorizeStaff()` - Staff-only access
- `authorizeInternal()` - Internal users only
- `requireKYC` - Require completed KYC
- `requireVerification` - Require email verification

### Usage Examples
```javascript
// Admin only
router.use(protect, authorizeAdmin());

// Staff only
router.use(protect, authorizeStaff());

// Specific roles
router.use(protect, authorize('verifier', 'coordinator'));

// Internal users only
router.use(protect, authorizeInternal());
```

## Migration

To migrate existing data to the new role structure:

```bash
cd backend
node scripts/migrateUserRoles.js
```

This script will:
- Convert role arrays to single role strings
- Set appropriate userType based on role
- Map old role names to new structure
- Update existing user records

## Role Utilities

The `utils/roleUtils.js` file provides helper functions:
- `validateRole(role)` - Validate role names
- `validateAssociateType(type)` - Validate associate types
- `getUserTypeFromRole(role)` - Get user type from role
- `getRoleDisplayName(role)` - Get human-readable role names
- `isExternalUser(role)`, `isInternalUser(role)` - Role type checks

## Security Considerations

1. **Role Validation**: All role assignments are validated against predefined enums
2. **Authorization Layers**: Multiple middleware layers ensure proper access control
3. **User Type Segregation**: Clear separation between external and internal users
4. **Audit Trail**: All role changes and access attempts are logged
5. **Principle of Least Privilege**: Users only get minimum required permissions

## Testing

Test the new role structure by:
1. Creating users with different roles
2. Verifying authorization middleware works correctly
3. Testing role-specific API endpoints
4. Validating user type segregation
5. Checking migration script functionality