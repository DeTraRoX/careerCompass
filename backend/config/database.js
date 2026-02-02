const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/career_guidance';
    
    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.error('\n🔧 Troubleshooting Steps:');
      console.error('1. Check Network Access in MongoDB Atlas');
      console.error('2. Make sure IP is whitelisted (0.0.0.0/0 for all)');
      console.error('3. Verify connection string format');
      console.error('4. Check if password needs URL encoding (@ → %40)');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
