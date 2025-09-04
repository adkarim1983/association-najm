import mongoose from 'mongoose';
import Project from './src/lib/db/models/Project.js';

// Connect to MongoDB
async function testConnection() {
  try {
    await mongoose.connect('mongodb://localhost:27017/association_najm');
    console.log('✅ Connected to MongoDB');
    
    // Create a test project
    const testProject = new Project({
      name: "Test Project",
      category: "Test",
      location: "Casablanca",
      coordinates: { lat: 33.5731, lng: -7.5898 },
      address: "123 Test Street",
      description: "This is a test project",
      status: "active"
    });
    
    await testProject.save();
    console.log('✅ Test project created');
    
    // Fetch all projects
    const projects = await Project.find({});
    console.log(`📊 Found ${projects.length} projects in database`);
    
    projects.forEach(project => {
      console.log(`- ${project.name} (${project.category})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();
