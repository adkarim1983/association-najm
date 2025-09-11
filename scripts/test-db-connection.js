import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Check database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📊 Database name: ${dbName}`);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Available collections:');
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Count projects
    const projectCount = await Project.countDocuments();
    console.log(`📈 Total projects in database: ${projectCount}`);
    
    if (projectCount === 0) {
      console.log('⚠️  No projects found in database');
      console.log('💡 This could mean:');
      console.log('   1. Data needs to be migrated from old database');
      console.log('   2. Collection name is different');
      console.log('   3. Database is empty and needs seeding');
      
      // Check if there are any documents in collections that might be projects
      for (const col of collections) {
        const count = await mongoose.connection.db.collection(col.name).countDocuments();
        console.log(`   Collection "${col.name}": ${count} documents`);
      }
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

testConnection();
