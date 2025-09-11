import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function checkPlanetFoodProject() {
  try {
    console.log('🔍 Checking Planet Food project in MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Search for Planet Food project
    const projects = await Project.find({ name: { $regex: /PLANET/i } });
    
    console.log(`\n📊 Found ${projects.length} project(s) with "PLANET" in name:`);
    
    projects.forEach(project => {
      console.log(`\n📋 Project: ${project.name}`);
      console.log(`   ID: ${project._id}`);
      console.log(`   Category: ${project.category}`);
      console.log(`   Location: ${project.location}`);
      console.log(`   Status: ${project.status}`);
      
      // Check if new fields exist
      console.log('\n🔍 New fields status:');
      console.log(`   informations_promotrice: ${project.informations_promotrice ? '✅ EXISTS' : '❌ MISSING'}`);
      console.log(`   presentation_projet: ${project.presentation_projet ? '✅ EXISTS' : '❌ MISSING'}`);
      console.log(`   soutien_recu: ${project.soutien_recu ? '✅ EXISTS' : '❌ MISSING'}`);
      console.log(`   produits_services_offerts: ${project.produits_services_offerts ? '✅ EXISTS' : '❌ MISSING'}`);
      console.log(`   partenaires_detailles: ${project.partenaires_detailles ? '✅ EXISTS' : '❌ MISSING'}`);
    });
    
    // Also check all projects to see what exists
    const allProjects = await Project.find({}).limit(5);
    console.log(`\n📊 Total projects in database: ${await Project.countDocuments()}`);
    console.log('\n📋 First 5 projects:');
    allProjects.forEach(project => {
      console.log(`   - ${project.name} (ID: ${project._id})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

checkPlanetFoodProject();
