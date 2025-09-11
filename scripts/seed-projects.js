import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// ATTENTION: Ce script contenait des projets fictifs qui ont été supprimés.
// Utilisez plutôt le script 'seed-real-projects.js' pour peupler la base avec les vrais projets de l'Association Najm.

const sampleProjects = [
  // Projets fictifs supprimés - utilisez seed-real-projects.js à la place
];

async function seedProjects() {
  try {
    console.log('🌱 Starting database seeding...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');
    
    // Insert sample projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Successfully inserted ${insertedProjects.length} sample projects`);
    
    // Display inserted projects
    console.log('\n📋 Inserted projects:');
    insertedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} (${project.category}) - ${project.location}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

seedProjects();
