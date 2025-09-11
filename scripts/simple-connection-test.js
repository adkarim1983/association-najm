import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function simpleConnectionTest() {
  try {
    console.log('🔄 Testing basic MongoDB connection...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found');
      return;
    }
    
    // Try to connect with a longer timeout
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };
    
    console.log('📡 Attempting connection...');
    await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📋 Collections found: ${collections.map(c => c.name).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 DNS resolution failed. Possible issues:');
      console.log('   - Check your internet connection');
      console.log('   - Verify the cluster hostname in your connection string');
      console.log('   - Ensure your IP is whitelisted in MongoDB Atlas');
    } else if (error.message.includes('authentication failed')) {
      console.log('💡 Authentication failed. Check your username/password');
    } else if (error.message.includes('timeout')) {
      console.log('💡 Connection timeout. Check network connectivity');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Disconnected');
    }
  }
}

simpleConnectionTest();
