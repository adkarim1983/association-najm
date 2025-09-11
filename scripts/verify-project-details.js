import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function verifyProjectDetails() {
  try {
    console.log('🔍 Verifying project details in database...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const project = await Project.findById('6890811f0ea7e45b675e0230');
    
    if (project) {
      console.log('\n📋 Project found:', project.name);
      console.log('\n📄 All project fields:');
      console.log('founder_info exists:', !!project.founder_info);
      console.log('presentation exists:', !!project.presentation);
      console.log('support exists:', !!project.support);
      console.log('products exists:', !!project.products);
      console.log('partners exists:', !!project.partners);
      
      if (project.founder_info) {
        console.log('\n📝 founder_info preview:', project.founder_info.substring(0, 100) + '...');
      }
      if (project.presentation) {
        console.log('\n📝 presentation preview:', project.presentation.substring(0, 100) + '...');
      }
      
      console.log('\n🔍 Full project object keys:', Object.keys(project.toObject()));
    } else {
      console.log('❌ Project not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

verifyProjectDetails();
