// Test MongoDB connection with detailed diagnostics
require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns').promises;

const testConnection = async () => {
  try {
    console.log('🔍 Diagnosing MongoDB Connection...\n');
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env file');
      return;
    }
    
    const uri = process.env.MONGODB_URI;
    console.log('📋 Connection String (masked):', uri.replace(/:[^:@]+@/, ':****@'));
    
    // Extract hostname
    const hostnameMatch = uri.match(/@([^/]+)/);
    if (hostnameMatch) {
      const hostname = hostnameMatch[1];
      console.log('🌐 Hostname:', hostname);
      
      // Try DNS lookup
      try {
        console.log('🔍 Testing DNS resolution...');
        const srvHost = `_mongodb._tcp.${hostname}`;
        console.log('   Looking up:', srvHost);
        // Note: Node.js doesn't have built-in SRV lookup, but we can test regular DNS
        const addresses = await dns.resolve4(hostname.split('.')[0] + '.mongodb.net').catch(() => null);
        if (addresses) {
          console.log('   ✅ DNS resolution works');
        }
      } catch (dnsError) {
        console.log('   ⚠️  DNS issue detected');
      }
    }
    
    console.log('\n🔌 Attempting connection...');
    console.log('   (This may take 10-15 seconds)\n');
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
    });
    
    console.log('✅ SUCCESS! Connected to MongoDB!');
    console.log('✅ Host:', mongoose.connection.host);
    console.log('✅ Database:', mongoose.connection.name);
    console.log('✅ Ready State:', mongoose.connection.readyState);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection Failed!\n');
    console.error('Error:', error.message);
    console.error('Error Code:', error.code || 'N/A');
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.error('\n🔧 Possible Causes:');
      console.error('   1. Network Access changes still propagating (wait 2-3 more minutes)');
      console.error('   2. DNS resolution issue (try different network/VPN)');
      console.error('   3. Firewall blocking connection');
      console.error('   4. Cluster might be paused or stopped');
      console.error('\n📝 Try:');
      console.error('   - Wait 2-3 more minutes and try again');
      console.error('   - Check if cluster is running (green dot)');
      console.error('   - Try from different network');
      console.error('   - Verify password in Database Access matches .env');
    } else if (error.message.includes('authentication')) {
      console.error('\n🔧 Authentication Error:');
      console.error('   → Check username and password');
      console.error('   → Verify password encoding (@ → %40)');
      console.error('   → Check Database Access user exists');
    }
    
    process.exit(1);
  }
};

testConnection();
