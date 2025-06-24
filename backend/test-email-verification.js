require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testEmailVerification() {
  try {
    console.log('Testing email verification flow...\n');

    // Find a test user (you can replace with a specific email)
    const testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      console.log('No test user found. Creating one...');
      const newUser = await User.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '9876543210',
        password: 'password123',
        role: 'client',
        userType: 'external'
      });
      console.log('Test user created:', newUser.email);
      return;
    }

    console.log('Found test user:', testUser.email);
    console.log('Email verified:', testUser.isEmailVerified);

    // Generate verification token
    const token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    testUser.emailVerificationToken = hashedToken;
    testUser.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await testUser.save();

    console.log('\nGenerated verification token:', token);
    console.log('Hashed token stored in DB:', hashedToken);
    console.log('Token expires at:', new Date(testUser.emailVerificationExpiry));

    // Test verification URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:5173';
    const verificationUrl = `${frontendUrl}/verify-email/${token}`;
    console.log('\nVerification URL:', verificationUrl);

    // Simulate verification process
    console.log('\nSimulating verification...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const verifyHashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    console.log('Decoded user ID:', decoded.id);
    console.log('Hash matches:', hashedToken === verifyHashedToken);

    const userToVerify = await User.findOne({
      _id: decoded.id,
      emailVerificationToken: verifyHashedToken,
      emailVerificationExpiry: { $gt: Date.now() }
    });

    if (userToVerify) {
      console.log('✅ Verification would succeed!');
      console.log('User found for verification:', userToVerify.email);
    } else {
      console.log('❌ Verification would fail - user not found or token expired');
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

testEmailVerification();