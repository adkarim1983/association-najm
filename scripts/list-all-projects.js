import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function listAllProjects() {
  try {
    console.log('📋 Listing all projects in MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const projects = await Project.find({});
    
    console.log(`\n📊 Total projects found: ${projects.length}`);
    
    if (projects.length === 0) {
      console.log('❌ No projects found in database!');
      console.log('💡 The database might be empty or using different collection name.');
    } else {
      console.log('\n📋 All projects:');
      projects.forEach((project, index) => {
        console.log(`\n${index + 1}. ${project.name}`);
        console.log(`   ID: ${project._id}`);
        console.log(`   Category: ${project.category}`);
        console.log(`   Location: ${project.location}`);
        console.log(`   Status: ${project.status}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

listAllProjects();
