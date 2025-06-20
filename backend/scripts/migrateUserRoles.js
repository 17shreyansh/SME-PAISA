// Migration script to update existing users to new role structure
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { getUserTypeFromRole } = require('../utils/roleUtils');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for migration');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const migrateUsers = async () => {
  try {
    console.log('Starting user role migration...');
    
    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate`);
    
    let migratedCount = 0;
    
    for (const user of users) {
      let needsUpdate = false;
      const updates = {};
      
      // Handle role array to single role conversion
      if (Array.isArray(user.role)) {
        // Take the first role if it's an array
        updates.role = user.role[0];
        needsUpdate = true;
      }
      
      // Set userType if missing
      if (!user.userType && user.role) {
        const role = updates.role || user.role;
        updates.userType = getUserTypeFromRole(role);
        needsUpdate = true;
      }
      
      // Handle old role mappings
      const roleMapping = {
        'admin': 'super_admin',
        'staff': 'coordinator', // Default staff to coordinator
        'verifier': 'verifier',
        'coordinator': 'coordinator'
      };
      
      const currentRole = updates.role || user.role;
      if (roleMapping[currentRole]) {
        updates.role = roleMapping[currentRole];
        updates.userType = getUserTypeFromRole(updates.role);
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await User.findByIdAndUpdate(user._id, updates);
        migratedCount++;
        console.log(`Migrated user ${user.email}: ${JSON.stringify(updates)}`);
      }
    }
    
    console.log(`Migration completed. ${migratedCount} users updated.`);
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run migration
const runMigration = async () => {
  await connectDB();
  await migrateUsers();
};

// Only run if called directly
if (require.main === module) {
  runMigration();
}

module.exports = { migrateUsers };