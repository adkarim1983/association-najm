import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function listProjects() {
  try {
    console.log('📋 Listing all projects in database...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const projects = await Project.find({}).lean();
    console.log(`\n📊 Total projects: ${projects.length}\n`);
    
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name}`);
      console.log(`   📍 ${project.location} | 🏷️ ${project.category}`);
      console.log(`   📅 Créé: ${new Date(project.createdAt).toLocaleDateString('fr-FR')}`);
      console.log(`   👁️ Vues: ${project.metadata?.views || 0} | ❤️ Likes: ${project.metadata?.likes || 0}`);
      console.log(`   🔗 ID: ${project._id}`);
      console.log('   ---');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

listProjects();
