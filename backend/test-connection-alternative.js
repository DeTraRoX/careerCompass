// Test with alternative connection methods
require('dotenv').config();
const mongoose = require('mongoose');

const testAlternatives = async () => {
  const baseURI = 'mongodb+srv://ayush:Ayush123@cluster0.93zng3t.mongodb.net/career_guidance';
  
  const alternatives = [
    {
      name: 'With appName',
      uri: `${baseURI}?appName=Cluster0`
    },
    {
      name: 'Standard format',
      uri: `${baseURI}?retryWrites=true&w=majority`
    },
    {
      name: 'Minimal format',
      uri: baseURI
    },
    {
      name: 'With directTimeoutMS',
      uri: `${baseURI}?retryWrites=true&w=majority&directConnection=false`
    }
  ];

  console.log('🧪 Testing different connection string formats...\n');

  for (const alt of alternatives) {
    try {
      console.log(`Testing: ${alt.name}...`);
      await mongoose.connect(alt.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      
      console.log(`✅ SUCCESS with: ${alt.name}`);
      console.log(`✅ Use this in your .env:`);
      console.log(`MONGODB_URI=${alt.uri}\n`);
      
      await mongoose.connection.close();
      process.exit(0);
    } catch (error) {
      console.log(`❌ Failed: ${alt.name}`);
      await mongoose.disconnect().catch(() => {});
    }
  }

  console.log('\n❌ All connection formats failed.');
  console.log('\n🔧 This suggests:');
  console.log('   1. Network Access changes still propagating (wait 5-10 minutes)');
  console.log('   2. DNS/Network issue on your machine');
  console.log('   3. Firewall blocking MongoDB connections');
  console.log('   4. Cluster might be paused');
  console.log('\n📝 Next Steps:');
  console.log('   - Wait 5-10 minutes and try again');
  console.log('   - Check cluster status in Atlas (should be green/active)');
  console.log('   - Try from different network (mobile hotspot)');
  console.log('   - Check Windows Firewall settings');
  
  process.exit(1);
};

testAlternatives();
