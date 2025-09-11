import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function findWafaeProject() {
  try {
    console.log('🔍 Searching for Wafae El Hana 12 project...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const project = await Project.findOne({ name: { $regex: /Wafae El Hana 12/i } });
    
    if (project) {
      console.log('\n📋 Project found:');
      console.log('ID:', project._id);
      console.log('Name:', project.name);
      console.log('Category:', project.category);
      console.log('Location:', project.location);
      console.log('\n📄 Current details structure:');
      if (project.details) {
        console.log('Details keys:', Object.keys(project.details));
        console.log('Details content:', JSON.stringify(project.details, null, 2));
      } else {
        console.log('No details field found');
      }
    } else {
      console.log('❌ Project not found');
      
      // Search for similar names
      const similarProjects = await Project.find({ name: { $regex: /Wafae/i } });
      if (similarProjects.length > 0) {
        console.log('\n🔍 Similar projects found:');
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

findWafaeProject();
