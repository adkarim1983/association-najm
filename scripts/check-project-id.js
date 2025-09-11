import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function checkProjectId() {
  try {
    console.log('🔍 Checking project ID 6890811f0ea7e45b675e0236...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const project = await Project.findById('6890811f0ea7e45b675e0236');
    
    if (project) {
      console.log('\n📋 Project found:');
      console.log('ID:', project._id);
      console.log('Name:', project.name);
      console.log('Category:', project.category);
      console.log('Location:', project.location);
      console.log('Description exists:', !!project.description);
      console.log('Image exists:', !!project.image);
      console.log('Coordinates:', project.coordinates);
    } else {
      console.log('❌ Project not found with ID: 6890811f0ea7e45b675e0236');
      
      // Check all projects to find similar ones
      console.log('\n🔍 Searching for projects with similar name "Wafae El Hana"...');
      const similarProjects = await Project.find({ name: { $regex: /Wafae/i } });
      
      if (similarProjects.length > 0) {
        console.log('\n📋 Found similar projects:');
        similarProjects.forEach(p => {
          console.log(`- ${p.name} (ID: ${p._id})`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

checkProjectId();
