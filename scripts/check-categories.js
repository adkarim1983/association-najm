import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkCategories() {
  try {
    console.log('🔍 Checking project categories in database...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Get unique categories
    const categories = await Project.distinct('category');
    console.log('\n📊 Categories found in database:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. "${cat}"`);
    });
    
    // Count projects per category
    console.log('\n📈 Project count per category:');
    for (const category of categories) {
      const count = await Project.countDocuments({ category });
      console.log(`${category}: ${count} projets`);
    }
    
    // Get unique locations
    const locations = await Project.distinct('location');
    console.log('\n📍 Locations found in database:');
    locations.forEach((loc, index) => {
      console.log(`${index + 1}. "${loc}"`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

checkCategories();
