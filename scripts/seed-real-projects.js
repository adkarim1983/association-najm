import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';
import { allProjectsData } from '../src/data/allProjectsData.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function seedRealProjects() {
  try {
    console.log('🌱 Starting database seeding with real Association Najm projects...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing projects (including any fake ones)
    const deletedCount = await Project.deleteMany({});
    console.log(`🗑️  Cleared ${deletedCount.deletedCount} existing projects`);
    
    // Transform allProjectsData to match MongoDB schema
    const projectsToInsert = allProjectsData.map(project => ({
      name: project.name,
      category: project.category,
      location: project.location,
      coordinates: project.coordinates,
      contact: project.contact,
      address: project.address,
      hours: project.hours,
      description: project.description,
      founder_info: project.founder_info,
      presentation: project.presentation || project.presentation_projet,
      support: project.support || project.soutien_recu,
      products: project.products || project.produits_services_offerts,
      partners: project.partners || project.partenaires_detailles,
      image: project.image,
      status: project.status || 'active',
      featured: project.featured || false,
      tags: project.tags || [],
      // Additional fields from allProjectsData
      informations_promotrice: project.informations_promotrice,
      presentation_projet: project.presentation_projet,
      soutien_recu: project.soutien_recu,
      produits_services_offerts: project.produits_services_offerts,
      partenaires_detailles: project.partenaires_detailles,
      metadata: project.metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert real projects
    const insertedProjects = await Project.insertMany(projectsToInsert);
    console.log(`✅ Successfully inserted ${insertedProjects.length} real Association Najm projects`);
    
    // Display inserted projects by category
    console.log('\n📋 Inserted projects by category:');
    const categories = {};
    insertedProjects.forEach(project => {
      if (!categories[project.category]) {
        categories[project.category] = [];
      }
      categories[project.category].push(project.name);
    });
    
    Object.entries(categories).forEach(([category, projects]) => {
      console.log(`\n📂 ${category.toUpperCase()}:`);
      projects.forEach((name, index) => {
        console.log(`   ${index + 1}. ${name}`);
      });
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🌐 Your real projects are now available at http://localhost:3000/projects');
    
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

seedRealProjects();
