const { MongoClient } = require('mongodb');

// Projets fictifs à supprimer
const fakeProjectNames = [
  "Centre de Formation Casablanca",
  "Projet Entrepreneuriat Rabat", 
  "Centre Social Marrakech",
  "Programme Jeunesse Fès"
];

async function cleanFakeProjects() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('association-najm');
    const projects = db.collection('projects');
    
    // Supprimer les projets fictifs
    const result = await projects.deleteMany({
      name: { $in: fakeProjectNames }
    });
    
    console.log(`✅ ${result.deletedCount} projets fictifs supprimés!`);
    
    if (result.deletedCount > 0) {
      console.log('Projets supprimés:');
      fakeProjectNames.forEach(name => {
        console.log(`- ${name}`);
      });
    } else {
      console.log('Aucun projet fictif trouvé dans la base de données.');
    }
    
    // Afficher les projets restants
    const remainingProjects = await projects.find({}).toArray();
    console.log(`\n📊 ${remainingProjects.length} projets restants dans la base de données:`);
    remainingProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} - ${project.location || 'Localisation non définie'}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await client.close();
  }
}

cleanFakeProjects();
