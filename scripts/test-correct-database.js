import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testCorrectDatabase() {
  try {
    console.log('🔄 Testing connection to associationNajm database...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Verify database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📊 Connected to database: "${dbName}"`);
    
    if (dbName === 'associationNajm') {
      console.log('✅ Correctly connected to associationNajm database!');
    } else {
      console.log(`⚠️  Still connected to "${dbName}" database`);
      console.log('💡 Make sure your MONGODB_URI ends with /associationNajm');
      return;
    }
    
    // Check projects in the correct database
    const projectCount = await Project.countDocuments();
    console.log(`📈 Projects in associationNajm database: ${projectCount}`);
    
    if (projectCount > 0) {
      const projects = await Project.find({}).limit(5).lean();
      console.log('\n📋 Sample projects:');
      projects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name} (${project.category}) - ${project.location}`);
      });
    } else {
      console.log('📝 No projects found in associationNajm database');
      console.log('💡 Your real projects should be here now');
    }
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

testCorrectDatabase();
