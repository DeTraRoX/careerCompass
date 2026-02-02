// Quick test script to verify MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI ? 'Set ✓' : 'Missing ✗');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env file');
      process.exit(1);
    }

    // Mask password in output
    const maskedURI = process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@');
    console.log('Masked URI:', maskedURI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ Connection successful!');
    console.log('✅ Host:', mongoose.connection.host);
    console.log('✅ Database:', mongoose.connection.name);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.error('\n🔧 This error means:');
      console.error('   → MongoDB Atlas is blocking your connection');
      console.error('   → Network Access is not configured');
      console.error('\n📝 Fix:');
      console.error('   1. Go to MongoDB Atlas → Network Access');
      console.error('   2. Click "Add IP Address"');
      console.error('   3. Click "Allow Access from Anywhere"');
      console.error('   4. Wait 1-2 minutes');
      console.error('   5. Try again');
    } else if (error.message.includes('authentication failed')) {
      console.error('\n🔧 This error means:');
      console.error('   → Username or password is incorrect');
      console.error('   → Password might need URL encoding');
      console.error('\n📝 Fix:');
      console.error('   → Check username and password in connection string');
      console.error('   → Encode special characters (@ → %40)');
    }
    
    process.exit(1);
  }
};

testConnection();
