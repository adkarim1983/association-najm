import mongoose from 'mongoose';
import Project from './src/lib/db/models/Project.js';
import connectDB from './src/lib/db/mongoose.js';

// Sample project data
const sampleProjects = [
  {
    name: "PLANET FOOD",
    category: "Restauration",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "123 Rue de la Food, Casablanca",
    description: "Le meilleur de la street food dans un cadre convivial.",
    founder_info: "Hanan Aghriwi, fondatrice du projet Planet Food, est une jeune femme de 28 ans titulaire d'un diplôme en art culinaire.",
    presentation: "Planet Food est un projet innovant dans le domaine de la restauration rapide.",
    support: "L'Initiative Nationale pour le Développement Humain (INDH) de la préfecture Moulay Rachid.",
    products: "Pizzas, tacos, coussamia, sandwichs et jus naturels.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: true
  },
  {
    name: "Alphacom",
    category: "Marketing Digital",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "456 Avenue du Digital, Casablanca",
    description: "Agence de marketing digital pour booster votre présence en ligne.",
    founder_info: "Équipe de jeunes professionnels passionnés par le marketing digital.",
    presentation: "Alphacom accompagne les entreprises dans leur transformation numérique.",
    support: "Soutien de l'INDH et de la Plateforme des Jeunes Irchad.",
    products: "Sites web, réseaux sociaux, campagnes publicitaires, SEO.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: false
  },
  {
    name: "Pixel Prod",
    category: "Design",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "321 Rue du Design, Casablanca",
    description: "Studio de design graphique et production visuelle.",
    founder_info: "Designers graphiques créatifs spécialisés dans la communication visuelle.",
    presentation: "Studio de design proposant des services de création visuelle complets.",
    support: "Soutien de l'INDH pour équipements professionnels et logiciels.",
    products: "Logos, identités visuelles, supports print, design web.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: true
  }
];

async function seedData() {
  try {
    await connectDB();
    console.log('🔗 Connected to database');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');
    
    // Insert sample projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} sample projects`);
    
    // List created projects
    createdProjects.forEach(project => {
      console.log(`- ${project.name} (${project.category})`);
    });
    
    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedData();
