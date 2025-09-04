import mongoose from 'mongoose';
import Project from './models/Project.js';
import connectDB from './mongoose.js';

// Sample project data based on the legacy association project
const sampleProjects = [
  {
    name: "PLANET FOOD",
    category: "Restauration",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "123 Rue de la Food, Casablanca",
    description: "Le meilleur de la street food dans un cadre convivial.",
    founder_info: "Hanan Aghriwi, fondatrice du projet Planet Food, est une jeune femme de 28 ans titulaire d'un diplôme en art culinaire. Elle possède plus de 5 ans d'expérience dans ce domaine.",
    presentation: "Planet Food est un projet innovant dans le domaine de la restauration rapide. Il vise à proposer des repas légers et rapides à préparer, alliant excellente qualité et prix abordables.",
    support: "L'Initiative Nationale pour le Développement Humain (INDH) de la préfecture Moulay Rachid est le principal soutien du projet Planet Food.",
    products: "Planet Food se spécialise dans la restauration rapide et propose une variété de repas légers, notamment des pizzas, tacos, coussamia, sandwichs et jus.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm pour l'inclusion économique des jeunes",
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
    founder_info: "L'équipe d'Alphacom est composée de jeunes professionnels passionnés par le marketing digital et les nouvelles technologies.",
    presentation: "Alphacom est une agence spécialisée dans le marketing digital qui vise à accompagner les entreprises dans leur transformation numérique.",
    support: "Le projet Alphacom bénéficie du soutien de l'Initiative Nationale pour le Développement Humain (INDH) et de la Plateforme des Jeunes Irchad.",
    products: "Alphacom propose une gamme complète de services digitaux : création et développement de sites web, gestion des réseaux sociaux, campagnes publicitaires.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm pour l'inclusion économique des jeunes",
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
    founder_info: "L'équipe de Pixel Prod est constituée de designers graphiques créatifs et passionnés, spécialisés dans la communication visuelle.",
    presentation: "Pixel Prod est un studio de design graphique qui propose des services de création visuelle pour tous types de supports.",
    support: "Le studio bénéficie du soutien de l'INDH pour l'acquisition d'équipements professionnels et de logiciels de design.",
    products: "Pixel Prod propose la création de logos et identités visuelles, la conception de supports print, le design web et digital.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: true
  },
  {
    name: "AZ Event 733",
    category: "Événementiel",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "987 Place de la Fête, Casablanca",
    description: "Organisation d'événements sur mesure pour professionnels et particuliers.",
    founder_info: "L'équipe d'AZ Event 733 est composée d'organisateurs d'événements expérimentés, passionnés par la création d'expériences mémorables.",
    presentation: "AZ Event 733 est une agence événementielle complète qui propose des services d'organisation d'événements sur mesure.",
    support: "L'agence bénéficie du soutien de l'INDH et de la Plateforme des Jeunes pour le développement de son réseau de fournisseurs.",
    products: "AZ Event 733 propose l'organisation de mariages sur mesure, événements corporate créatifs, fêtes d'anniversaire thématiques.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: false
  },
  {
    name: "ERREGYBY EVENT",
    category: "Événementiel",
    location: "Casablanca",
    coordinates: { lat: 33.5731, lng: -7.5898 },
    address: "789 Boulevard des Célébrations, Casablanca",
    description: "Organisation d'événements d'entreprise et de lancements de produits.",
    founder_info: "Rachid, fondateur d'ERREGYBY EVENT, est un entrepreneur de 32 ans spécialisé dans l'événementiel corporate.",
    presentation: "ERREGYBY EVENT est une agence spécialisée dans l'organisation d'événements corporate et de lancements de produits.",
    support: "L'agence bénéficie du soutien financier de l'INDH pour l'acquisition d'équipements audiovisuels et de matériel événementiel.",
    products: "ERREGYBY EVENT propose l'organisation de lancements de produits, séminaires d'entreprise, conférences, team building.",
    partners: "INDH, Plateforme des jeunes Irchad, Association Najm",
    status: "active",
    featured: false
  }
];

export async function seedProjects() {
  try {
    await connectDB();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');
    
    // Insert sample projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} sample projects`);
    
    return createdProjects;
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    throw error;
  }
}

// Run seeding if called directly
if (process.argv[1] && process.argv[1].includes('seed-projects.js')) {
  seedProjects()
    .then(() => {
      console.log('🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}
