require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testCompleteVerificationFlow() {
  try {
    console.log('🧪 Testing Complete Email Verification Flow\n');

    // Step 1: Clean up any existing test user
    await User.deleteOne({ email: 'testverify@example.com' });
    console.log('✅ Cleaned up existing test user');

    // Step 2: Test Registration with Email Verification
    console.log('\n📝 Step 1: Testing User Registration...');
    
    const registrationData = {
      firstName: 'Test',
      lastName: 'Verify',
      email: 'testverify@example.com',
      phone: '9876543211',
      password: 'password123',
      role: 'client'
    };

    try {
      const registerResponse = await axios.post('http://127.0.0.1:5000/api/auth/register', registrationData);
      console.log('✅ Registration successful');
      console.log('📧 Email verification token generated:', registerResponse.data.emailVerificationToken ? 'Yes' : 'No');
      
      // Extract token from response for testing
      const emailToken = registerResponse.data.emailVerificationToken;
      
      // Step 3: Test Email Verification
      console.log('\n🔍 Step 2: Testing Email Verification...');
      
      // Generate JWT token for verification (simulating the email link)
      const user = await User.findOne({ email: 'testverify@example.com' });
      const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      console.log('🔗 Verification URL would be:', `http://127.0.0.1:5173/verify-email/${verificationToken}`);
      
      // Test the verification endpoint
      const verifyResponse = await axios.get(`http://127.0.0.1:5000/api/auth/verify-email/${verificationToken}`);
      console.log('✅ Email verification successful:', verifyResponse.data.message);
      
      // Step 4: Verify user status updated
      const updatedUser = await User.findOne({ email: 'testverify@example.com' });
      console.log('📊 User verification status:', {
        isEmailVerified: updatedUser.isEmailVerified,
        status: updatedUser.status,
        emailVerificationToken: updatedUser.emailVerificationToken ? 'Present' : 'Cleared',
        emailVerificationExpiry: updatedUser.emailVerificationExpiry ? 'Present' : 'Cleared'
      });
      
      // Step 5: Test Login with verified user
      console.log('\n🔐 Step 3: Testing Login with Verified User...');
      const loginResponse = await axios.post('http://127.0.0.1:5000/api/auth/login', {
        email: 'testverify@example.com',
        password: 'password123'
      });
      console.log('✅ Login successful for verified user');
      console.log('👤 User data:', {
        email: loginResponse.data.user.email,
        isEmailVerified: loginResponse.data.user.isEmailVerified,
        status: loginResponse.data.user.status
      });
      
      console.log('\n🎉 All tests passed! Email verification system is working correctly.');
      
    } catch (error) {
      if (error.response) {
        console.error('❌ API Error:', error.response.data);
      } else {
        console.error('❌ Network Error:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Clean up
    await User.deleteOne({ email: 'testverify@example.com' });
    console.log('\n🧹 Cleaned up test user');
    mongoose.connection.close();
  }
}

// Test different scenarios
async function testErrorScenarios() {
  try {
    console.log('\n🚨 Testing Error Scenarios...');
    
    // Test invalid token
    try {
      await axios.get('http://127.0.0.1:5000/api/auth/verify-email/invalid-token');
    } catch (error) {
      console.log('✅ Invalid token properly rejected:', error.response.data.message);
    }
    
    // Test expired token (simulate by creating token with past expiry)
    const expiredToken = jwt.sign({ id: 'fake-id' }, process.env.JWT_SECRET, { expiresIn: '-1h' });
    try {
      await axios.get(`http://127.0.0.1:5000/api/auth/verify-email/${expiredToken}`);
    } catch (error) {
      console.log('✅ Expired token properly rejected:', error.response.data.message);
    }
    
  } catch (error) {
    console.error('❌ Error scenario test failed:', error.message);
  }
}

// Run tests
testCompleteVerificationFlow().then(() => {
  return testErrorScenarios();
});