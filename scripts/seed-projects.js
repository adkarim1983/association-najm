import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sampleProjects = [
  {
    name: "Centre de Formation Professionnelle",
    category: "Éducation",
    location: "Casablanca",
    coordinates: {
      lat: 33.5731,
      lng: -7.5898
    },
    contact: {
      phone: "+212 522 123 456",
      email: "contact@cfp-casa.ma",
      website: "https://cfp-casa.ma"
    },
    address: "123 Boulevard Mohammed V, Casablanca",
    hours: "Lundi-Vendredi: 8h00-18h00",
    description: "Centre de formation professionnelle offrant des programmes de qualité dans divers domaines techniques et professionnels.",
    founder_info: "Fondé par Mme Fatima Zahra, experte en éducation avec 15 ans d'expérience dans le développement de programmes de formation.",
    presentation: "Notre centre propose des formations certifiantes dans les métiers du numérique, de l'artisanat et des services. Nous accompagnons les jeunes vers l'insertion professionnelle.",
    support: "Soutenu par le Ministère de l'Éducation Nationale et l'OFPPT. Partenariat avec l'Union Européenne pour le financement.",
    products: "Formations en informatique, électricité, plomberie, coiffure, cuisine, et gestion d'entreprise. Certificats reconnus par l'État.",
    partners: "OFPPT, Ministère de l'Éducation, Union Européenne, Chambre de Commerce de Casablanca",
    status: "active",
    featured: true,
    tags: ["formation", "jeunesse", "emploi", "certification"]
  },
  {
    name: "Coopérative Agricole Atlas",
    category: "Agriculture",
    location: "Marrakech",
    coordinates: {
      lat: 31.6295,
      lng: -7.9811
    },
    contact: {
      phone: "+212 524 987 654",
      email: "info@coop-atlas.ma"
    },
    address: "Route de l'Ourika, Km 15, Marrakech",
    hours: "Tous les jours: 6h00-19h00",
    description: "Coopérative agricole spécialisée dans la production biologique d'huile d'argan et de produits du terroir.",
    founder_info: "Créée par un groupe de femmes rurales dirigé par Lalla Aicha, militante pour les droits des femmes rurales depuis 20 ans.",
    presentation: "Notre coopérative regroupe 150 femmes productrices d'huile d'argan bio. Nous valorisons le savoir-faire traditionnel tout en adoptant des techniques modernes.",
    support: "Soutenue par l'Agence de Développement Social et l'Initiative Nationale pour le Développement Humain (INDH).",
    products: "Huile d'argan cosmétique et alimentaire, savons naturels, amandes d'argan, miel de montagne, plantes aromatiques séchées.",
    partners: "INDH, Agence de Développement Social, Fondation Mohammed V, coopératives européennes",
    status: "active",
    featured: true,
    tags: ["agriculture", "bio", "argan", "femmes", "rural"]
  },
  {
    name: "Association Solidarité Numérique",
    category: "Technologie",
    location: "Rabat",
    coordinates: {
      lat: 34.0209,
      lng: -6.8416
    },
    contact: {
      phone: "+212 537 456 789",
      email: "contact@solidarite-numerique.ma",
      website: "https://solidarite-numerique.ma"
    },
    address: "Avenue Allal Ben Abdellah, Agdal, Rabat",
    hours: "Lundi-Samedi: 9h00-17h00",
    description: "Association dédiée à la réduction de la fracture numérique et à l'inclusion digitale des populations vulnérables.",
    founder_info: "Fondée par Youssef Benali, ingénieur informatique et entrepreneur social, passionné par l'impact social du numérique.",
    presentation: "Nous œuvrons pour démocratiser l'accès au numérique à travers des formations, des équipements reconditionnés et un accompagnement personnalisé.",
    support: "Partenariat avec le Ministère de la Transition Numérique et plusieurs entreprises tech marocaines.",
    products: "Formations informatiques gratuites, ordinateurs reconditionnés, ateliers de sensibilisation, support technique communautaire.",
    partners: "Ministère de la Transition Numérique, Maroc Telecom, Inwi, Orange Maroc, associations locales",
    status: "active",
    featured: false,
    tags: ["numérique", "inclusion", "formation", "technologie", "social"]
  },
  {
    name: "Centre Culturel Amazigh",
    category: "Culture",
    location: "Agadir",
    coordinates: {
      lat: 30.4278,
      lng: -9.5981
    },
    contact: {
      phone: "+212 528 321 654",
      email: "info@centre-amazigh.ma"
    },
    address: "Quartier Talborjt, Avenue Hassan II, Agadir",
    hours: "Mardi-Dimanche: 10h00-20h00",
    description: "Centre dédié à la préservation et à la promotion de la culture amazighe à travers l'art, la musique et l'artisanat.",
    founder_info: "Dirigé par Moha Ouali, artiste et chercheur en patrimoine amazigh, reconnu pour ses travaux sur la culture berbère.",
    presentation: "Notre centre propose des cours de langue tamazight, des ateliers d'artisanat traditionnel et organise des événements culturels.",
    support: "Soutenu par l'Institut Royal de la Culture Amazighe (IRCAM) et le Ministère de la Culture.",
    products: "Cours de tamazight, ateliers de tissage et poterie, spectacles de musique traditionnelle, expositions d'art amazigh.",
    partners: "IRCAM, Ministère de la Culture, Université Ibn Zohr, associations culturelles régionales",
    status: "active",
    featured: false,
    tags: ["culture", "amazigh", "patrimoine", "artisanat", "langue"]
  },
  {
    name: "Clinique Mobile de Santé Rurale",
    category: "Santé",
    location: "Fès",
    coordinates: {
      lat: 34.0181,
      lng: -5.0078
    },
    contact: {
      phone: "+212 535 654 321",
      email: "contact@clinique-mobile.ma"
    },
    address: "Quartier Zouagha, Route de Meknès, Fès",
    hours: "Urgences 24h/24, Consultations: 8h00-16h00",
    description: "Service de santé mobile desservant les zones rurales isolées avec des soins médicaux de base et de prévention.",
    founder_info: "Initiative du Dr. Khadija Alami, médecin généraliste engagée dans la santé communautaire depuis 12 ans.",
    presentation: "Notre clinique mobile se déplace dans les douars isolés pour offrir des consultations, vaccinations et sensibilisation sanitaire.",
    support: "Financée par le Ministère de la Santé et des ONG internationales de santé.",
    products: "Consultations médicales, vaccinations, dépistages, éducation sanitaire, distribution de médicaments essentiels.",
    partners: "Ministère de la Santé, Médecins Sans Frontières, Fondation Lalla Salma, délégations provinciales de santé",
    status: "active",
    featured: true,
    tags: ["santé", "rural", "mobile", "prévention", "communautaire"]
  }
];

async function seedProjects() {
  try {
    console.log('🌱 Starting database seeding...');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');
    
    // Insert sample projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Successfully inserted ${insertedProjects.length} sample projects`);
    
    // Display inserted projects
    console.log('\n📋 Inserted projects:');
    insertedProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.name} (${project.category}) - ${project.location}`);
    });
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

seedProjects();
