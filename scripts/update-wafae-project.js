import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

async function updateWafaeProject() {
  try {
    console.log('🔄 Updating Wafae El Hana 12 project details...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const projectId = '6890811f0ea7e45b675e0230';
    
    const updatedDetails = {
      founder_info: `Je m'appelle Hanae Wafae, j'ai 35 ans et je suis fondatrice de l'entreprise Delicesl Hanae, spécialisée dans l'organisation d'événements et dans tous types de cuisine. Je possède une expérience de 10 ans dans ce domaine. Mon choix pour ce projet découle de l'expertise accumulée au fil des années, ainsi que de ma volonté d'offrir des services modernes et innovants, tout en attirant une nouvelle clientèle.
Mon projet consiste à proposer des prestations culinaires pour toutes les occasions et événements, en mettant en avant des techniques nouvelles dans ce domaine. Mon objectif est d'atteindre une stabilité économique et de créer de nouvelles opportunités d'emploi, directes et indirectes, au profit des jeunes de la région.`,
      
      presentation: `Mon choix de lancer "Delicesl Hanae" est le résultat de la grande expérience acquise dans l'organisation d'événements et l'art culinaire pendant dix ans. Cela m'a poussée à proposer des services nouveaux et innovants, adaptés aux évolutions du marché et répondant aux attentes des clients en quête d'expériences culinaires uniques lors de toutes sortes d'événements.
Je souhaite également contribuer à l'amélioration de la situation économique de la région grâce à ce projet, en créant de nouvelles opportunités d'emploi directes et indirectes, et en assurant la stabilité économique de ma famille et de la communauté locale.
Au fil de mes années de travail, j'ai acquis des compétences variées en organisation d'événements, en apprenant à offrir des services de qualité dans le domaine culinaire et la gestion des occasions spéciales. Ces expériences ont constitué la base de "Delicesl Hanae", avec l'ambition d'apporter une approche moderne et créative, dépassant le concept traditionnel du repas lors des événements.
L'objectif principal du projet est de proposer des plats savoureux, associés à des techniques modernes de cuisine, tout en organisant les événements de manière intégrée, allant de la préparation culinaire jusqu'aux aspects logistiques tels que la décoration et la coordination. Mon ambition est d'offrir un service complet, alliant qualité et originalité, pour transformer chaque événement en une expérience exceptionnelle.`,
      
      support: `J'ai bénéficié d'un soutien financier de l'Initiative Nationale pour le Développement Humain (INDH) d'un montant de 100 000 dirhams, ce qui a eu un impact majeur sur le financement et le lancement du projet "Delicesl Hanae".
Ce soutien n'a pas seulement été financier, mais aussi moral et technique, grâce à l'accompagnement assuré par la plateforme Irchad, qui m'a permis de suivre une formation complète de trois mois.
Cette formation a marqué un tournant dans mon parcours, m'aidant à développer mes compétences en gestion d'entreprise, à mieux comprendre les stratégies de croissance et à renforcer ma confiance dans ma capacité à atteindre mes objectifs.
Grâce à cette expérience, j'ai acquis des connaissances précieuses en gestion des ressources et en organisation des opérations, ce qui m'a permis d'élaborer des plans solides pour assurer une croissance durable du projet.
Ce soutien m'a aussi donné la possibilité de me concentrer sur l'innovation en cuisine et la création de services modernes et distinctifs, me permettant de me démarquer sur le marché et d'attirer une clientèle en quête d'expériences gastronomiques uniques.
Je considère ce soutien de l'INDH et de la plateforme Irchad comme une étape clé dans le développement de "Delicesl Hanae", puisqu'il m'a fourni les outils nécessaires pour assurer la durabilité et le développement continu de mon projet dans le secteur de la gastronomie et de l'événementiel.`,
      
      products: `Le projet "Delicesl Hanae" offre une large gamme de services et produits innovants dans le domaine culinaire et de l'organisation d'événements. L'objectif est de fournir une expérience unique aux clients à travers :
Organisation complète d'événements : mariages, anniversaires, conférences, etc., avec une attention particulière au décor et aux détails pour créer une ambiance exceptionnelle.
Expériences culinaires interactives : permettant aux invités de participer à la préparation des repas.
Menus personnalisés : adaptés à des besoins spécifiques (plats végétariens, sans gluten, etc.).
Techniques innovantes de présentation culinaire : transformant le service des plats en une expérience visuelle et sensorielle.
Service de chef privé pour des événements personnels.
Consultations en organisation d'événements destinées aux particuliers et aux entreprises.
Produits alimentaires haut de gamme : pâtisseries spéciales, sauces, ainsi que paniers-cadeaux gastronomiques.
Par ces services et produits, "Delicesl Hanae" vise à allier innovation et qualité pour offrir à ses clients une expérience culinaire exceptionnelle, où se mêlent raffinement et créativité.`,
      
      partners: `Je considère comme partenaires :
L'INDH (Initiative Nationale pour le Développement Humain), qui m'a apporté un soutien financier de 100 000 dirhams pour le lancement de mon projet.
La plateforme Irchad, qui m'a offert une formation de trois mois.
L'Association Najm, qui m'a accompagnée moralement et m'a soutenue dans la planification et l'exécution du projet.
Grâce à l'appui de ces partenaires, j'ai pu lancer mon projet sur des bases solides, avec une vision claire et durable pour atteindre mes objectifs et assurer la réussite de "Delicesl Hanae".`
    };
    
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedDetails,
      { new: true, runValidators: true }
    );
    
    if (updatedProject) {
      console.log('✅ Project updated successfully!');
      console.log('📋 Updated project:', updatedProject.name);
      console.log('📄 New details added:');
      console.log('- founder_info: ✅');
      console.log('- presentation: ✅');
      console.log('- support: ✅');
      console.log('- products: ✅');
      console.log('- partners: ✅');
    } else {
      console.log('❌ Project not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
}

updateWafaeProject();
