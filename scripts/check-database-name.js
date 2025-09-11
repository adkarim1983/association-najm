import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkDatabaseName() {
  try {
    console.log('🔍 Checking current database configuration...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    console.log('📡 Current MONGODB_URI (masked):');
    const maskedUri = process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    console.log(maskedUri);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Get current database name
    const currentDbName = mongoose.connection.db.databaseName;
    console.log(`📊 Current database name: "${currentDbName}"`);
    
    if (currentDbName === 'test') {
      console.log('⚠️  You are connected to the "test" database');
      console.log('💡 To connect to "associationNajm" database, update your MONGODB_URI in .env.local');
      console.log('');
      console.log('Your connection string should end with: /associationNajm?retryWrites=true&w=majority');
      console.log('Instead of: /test?retryWrites=true&w=majority');
      console.log('Or if no database is specified, it defaults to "test"');
    } else if (currentDbName === 'associationNajm') {
      console.log('✅ Correctly connected to "associationNajm" database');
    } else {
      console.log(`ℹ️  Connected to "${currentDbName}" database`);
    }
    
    // List collections in current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📋 Collections in "${currentDbName}" database:`);
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  - ${col.name}: ${count} documents`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

checkDatabaseName();
