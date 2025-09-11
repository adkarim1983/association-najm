const { MongoClient } = require('mongodb');

// ATTENTION: Ce script contenait des projets fictifs qui ont été supprimés.
// Utilisez plutôt le script 'seed-real-projects.js' pour peupler la base avec les vrais projets.

const sampleProjects = [
  // Projets fictifs supprimés - utilisez seed-real-projects.js à la place
];

async function seedProjectsWithCoordinates() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('association-najm');
    const projects = db.collection('projects');
    
    // Clear existing projects (optional)
    const clearExisting = false; // Set to true if you want to clear existing projects
    if (clearExisting) {
      await projects.deleteMany({});
      console.log('Cleared existing projects');
    }
    
    // Insert sample projects
    const result = await projects.insertMany(sampleProjects);
    
    console.log(`✅ ${result.insertedCount} projets créés avec succès!`);
    console.log('🗺️ Tous les projets ont des coordonnées géographiques');
    console.log('🌐 Allez sur http://localhost:3000/projects et cliquez sur "Vue Carte"');
    
    // Show inserted projects
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} - ${project.location} (${project.coordinates.lat}, ${project.coordinates.lng})`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await client.close();
  }
}

seedProjectsWithCoordinates();
