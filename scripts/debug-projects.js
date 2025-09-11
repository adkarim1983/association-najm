import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function debugProjects() {
  try {
    console.log('🔍 Debugging projects data...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Get all projects from database
    const projects = await Project.find({}).lean();
    console.log(`📊 Found ${projects.length} projects in database`);
    
    if (projects.length > 0) {
      console.log('\n📋 Projects in database:');
      projects.forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project._id}`);
        console.log(`   Name: ${project.name}`);
        console.log(`   Category: ${project.category}`);
        console.log(`   Location: ${project.location}`);
        console.log(`   Status: ${project.status}`);
        console.log(`   Created: ${project.createdAt}`);
        console.log('   ---');
      });
    }
    
    // Test the API endpoint directly
    console.log('\n🌐 Testing API endpoint...');
    const response = await fetch('http://localhost:3000/api/projects');
    if (response.ok) {
      const apiData = await response.json();
      console.log(`📡 API returned ${apiData.projects?.length || 0} projects`);
      
      if (apiData.projects && apiData.projects.length > 0) {
        console.log('\n📋 Projects from API:');
        apiData.projects.forEach((project, index) => {
          console.log(`${index + 1}. ID: ${project._id}`);
          console.log(`   Name: ${project.name}`);
          console.log(`   Category: ${project.category}`);
          console.log(`   Location: ${project.location}`);
          console.log(`   Status: ${project.status}`);
          console.log('   ---');
        });
        
        // Compare database vs API
        console.log('\n🔍 Comparing database vs API data...');
        const dbIds = projects.map(p => p._id.toString()).sort();
        const apiIds = apiData.projects.map(p => p._id).sort();
        
        console.log('Database IDs:', dbIds);
        console.log('API IDs:', apiIds);
        
        const idsMatch = JSON.stringify(dbIds) === JSON.stringify(apiIds);
        console.log(`IDs match: ${idsMatch ? '✅' : '❌'}`);
        
        if (!idsMatch) {
          console.log('⚠️  Database and API are returning different projects!');
          console.log('This suggests there might be:');
          console.log('1. Multiple database connections');
          console.log('2. Caching issues');
          console.log('3. Different environment variables');
        }
      }
    } else {
      console.error('❌ API request failed:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

debugProjects();
