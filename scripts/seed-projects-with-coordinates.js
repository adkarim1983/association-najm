const { MongoClient } = require('mongodb');

const sampleProjects = [
  {
    name: "Centre de Formation Casablanca",
    description: "Centre de formation professionnelle pour les jeunes",
    category: "education",
    location: "Casablanca",
    address: "Avenue Mohammed V, Casablanca",
    coordinates: {
      lat: 33.5731,
      lng: -7.5898
    },
    status: "active",
    featured: true,
    contact: {
      phone: "+212 522 123 456",
      email: "casablanca@association-najm.org"
    },
    createdAt: new Date()
  },
  {
    name: "Projet Entrepreneuriat Rabat",
    description: "Programme d'accompagnement des entrepreneurs",
    category: "entrepreneuriat",
    location: "Rabat",
    address: "Quartier Agdal, Rabat",
    coordinates: {
      lat: 34.0209,
      lng: -6.8417
    },
    status: "active",
    featured: false,
    contact: {
      phone: "+212 537 123 456",
      email: "rabat@association-najm.org"
    },
    createdAt: new Date()
  },
  {
    name: "Centre Social Marrakech",
    description: "Centre d'aide sociale et d'accompagnement",
    category: "social",
    location: "Marrakech",
    address: "Medina, Marrakech",
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    status: "active",
    featured: true,
    contact: {
      phone: "+212 524 123 456",
      email: "marrakech@association-najm.org"
    },
    createdAt: new Date()
  },
  {
    name: "Programme Jeunesse Fès",
    description: "Activités et formations pour les jeunes",
    category: "jeunesse",
    location: "Fès",
    address: "Ville Nouvelle, Fès",
    coordinates: {
      lat: 34.0181,
      lng: -5.0078
    },
    status: "active",
    featured: false,
    contact: {
      phone: "+212 535 123 456",
      email: "fes@association-najm.org"
    },
    createdAt: new Date()
  }
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
