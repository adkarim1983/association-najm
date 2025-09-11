import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function updatePlanetFoodProject() {
  try {
    console.log('🔄 Updating Planet Food project details...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Find Planet Food project by exact ID
    const project = await Project.findById('6890811f0ea7e45b675e0227');
    
    if (!project) {
      console.log('❌ Planet Food project not found');
      return;
    }
    
    console.log(`📋 Found project: ${project.name} (ID: ${project._id})`);
    
    const updatedDetails = {
      informations_promotrice: "El Hana Wafae, 35 ans, fondatrice de l'entreprise Delicesl Hanae spécialisée dans l'organisation d'événements culinaires de toutes sortes. Je possède une expérience de plus de dix ans dans ce domaine. Mon choix de ce projet découle de l'expertise que j'ai accumulée au fil des années, et de mon désir de proposer des services modernes et innovants afin d'attirer une nouvelle clientèle. Mon projet consiste à offrir des prestations culinaires pour toutes sortes d'occasions et d'événements, en mettant en avant de nouvelles techniques dans ce domaine. Mon objectif est de contribuer à la stabilité économique et de créer de nouvelles opportunités d'emploi, directes et indirectes, pour les jeunes de la région.",
      
      presentation_projet: "Le choix du projet \"Delicesl Hanae\" est né de la grande expérience que j'ai acquise dans le domaine de l'organisation d'événements et de l'art culinaire durant plus de dix ans. Cela m'a poussée à offrir des services nouveaux et innovants, adaptés à l'évolution du marché et aux besoins des clients qui recherchent des expériences gastronomiques uniques lors de toutes leurs occasions. J'ai également voulu contribuer à l'amélioration de la situation économique de ma région à travers ce projet, en créant de nouveaux emplois directs et indirects et en assurant la stabilité économique de ma famille et de la communauté. Au fil de mon parcours, j'ai acquis diverses compétences dans l'organisation d'événements, en apprenant à fournir des services de qualité en matière de gastronomie et de gestion de réceptions. Ces expériences ont constitué la base de l'idée de \"Delicesl Hanae\", où j'ai voulu exploiter ce savoir pour proposer des prestations modernes dépassant le cadre traditionnel de la restauration événementielle. L'objectif principal du projet est de préparer des plats savoureux et raffinés tout en intégrant des techniques culinaires contemporaines, et d'assurer une organisation complète des événements, allant de la préparation des mets jusqu'à la logistique (décoration, coordination, etc.). Mon ambition est d'offrir un service global alliant qualité et originalité, afin de transformer chaque occasion ordinaire en un moment exceptionnel grâce à une gastronomie et une organisation créatives.",
      
      soutien_recu: "J'ai bénéficié d'un appui financier de 100 000 dirhams dans le cadre de l'Initiative Nationale pour le Développement Humain (INDH), ce qui a eu un impact majeur dans le financement et la consolidation de mon projet \"Delicesl Hanae\". Ce soutien n'a pas été uniquement matériel, mais aussi moral et technique, grâce à l'accompagnement continu assuré par la plateforme Irchad, qui m'a offert une formation complète de trois mois. Cette formation a marqué un tournant dans mon parcours : elle m'a permis de développer mes compétences en gestion d'entreprise et d'acquérir une meilleure compréhension des stratégies de croissance et d'expansion. Elle a renforcé ma confiance dans ma capacité à atteindre mes objectifs. Grâce à cette expérience, j'ai appris à mieux gérer les ressources et à structurer efficacement les opérations de mon projet, ce qui m'a aidée à établir des plans d'action solides pour assurer une croissance durable. Ce soutien m'a aussi permis de me concentrer davantage sur l'innovation culinaire et la création de services modernes et distinctifs, me donnant ainsi un avantage concurrentiel sur le marché et la possibilité d'attirer de nouveaux clients en quête d'expériences gastronomiques uniques. Je considère ce soutien de l'INDH et de la plateforme Irchad comme une étape cruciale dans le développement de mon projet, car il m'a apporté les outils nécessaires pour assurer sa durabilité et sa réussite dans le domaine culinaire et l'organisation d'événements.",
      
      produits_services_offerts: "Le projet \"Delicesl Hanae\" propose une gamme de services et produits novateurs dans le domaine de la gastronomie et de l'événementiel, visant à offrir une expérience unique à ses clients. Parmi ses prestations : Organisation complète d'événements (mariages, anniversaires, conférences, etc.) avec une attention particulière portée à la décoration et aux détails qui créent une ambiance unique. Cuisine interactive : les invités peuvent participer à la préparation des plats. Menus personnalisés répondant à des besoins spécifiques (options végétariennes, sans gluten, etc.). Techniques innovantes de présentation des mets, rendant le service culinaire aussi visuel qu'agréable. Service de chef privé pour des occasions personnelles. Conseil en organisation d'événements pour particuliers et entreprises. Produits gastronomiques haut de gamme : pâtisseries exclusives, sauces, paniers gourmands, etc. À travers ces services et produits, \"Delicesl Hanae\" aspire à incarner innovation et qualité dans chaque détail, offrant à ses clients une expérience gastronomique exceptionnelle alliant raffinement et créativité.",
      
      partenaires_detailles: "Mes principaux partenaires sont : L'Initiative Nationale pour le Développement Humain (INDH) qui a financé mon projet à hauteur de 100 000 dirhams ; La plateforme Irchad, qui m'a offert une formation de trois mois et un suivi régulier ; L'Association Najm, qui m'a soutenue moralement et m'a accompagnée tout au long de la planification et de l'exécution du projet."
    };
    
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      updatedDetails,
      { new: true, runValidators: true }
    );
    
    if (updatedProject) {
      console.log('✅ Planet Food project updated successfully!');
      console.log('📋 Updated project:', updatedProject.name);
      console.log('📄 New details added:');
      console.log('- informations_promotrice: ✅');
      console.log('- presentation_projet: ✅');
      console.log('- soutien_recu: ✅');
      console.log('- produits_services_offerts: ✅');
      console.log('- partenaires_detailles: ✅');
    } else {
      console.log('❌ Failed to update project');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

updatePlanetFoodProject();
