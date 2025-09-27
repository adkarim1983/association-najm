import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/lib/db/models/Project.js';

dotenv.config({ path: '.env.local' });

// Utilisation du modèle Project existant

// Traductions complètes pour tous les projets
const projectTranslations = {
  // Traductions pour les projets de restauration
  "Snack Hay El Rajae": {
    name_en: "Hay El Rajae Snack",
    name_ar: "سناك حي الرجاء",
    description_en: "Traditional snack offering local specialties in a family setting.",
    description_ar: "سناك تقليدي يقدم الأطباق المحلية في إطار عائلي."
  },

  "Kitchen Chaimaa": {
    name_en: "Chaimaa's Kitchen",
    name_ar: "مطبخ شيماء",
    description_en: "Traditional kitchen serving authentic homemade dishes with fresh local ingredients.",
    description_ar: "مطبخ تقليدي يقدم أطباق منزلية أصيلة بمكونات محلية طازجة."
  },

  "Om Ali Food": {
    name_en: "Om Ali Restaurant",
    name_ar: "مطعم أم علي",
    description_en: "Family restaurant specializing in traditional Moroccan cuisine and comfort food.",
    description_ar: "مطعم عائلي متخصص في المأكولات المغربية التقليدية والطعام المريح."
  },

  "Snack Yacout": {
    name_en: "Yacout Snack",
    name_ar: "سناك ياقوت",
    description_en: "Quick service restaurant offering fresh sandwiches and local street food.",
    description_ar: "مطعم خدمة سريعة يقدم السندويشات الطازجة وطعام الشارع المحلي."
  },

  "PLANET FOOD": {
    name_en: "Planet Food",
    name_ar: "كوكب الطعام",
    description_en: "International cuisine restaurant with diverse menu from around the world.",
    description_ar: "مطعم المأكولات العالمية مع قائمة متنوعة من جميع أنحاء العالم."
  },

  "Dar Miya": {
    name_en: "Dar Miya House",
    name_ar: "دار ميا",
    description_en: "Traditional Moroccan restaurant serving authentic dishes in a heritage setting.",
    description_ar: "مطعم مغربي تقليدي يقدم أطباق أصيلة في إطار تراثي."
  },

  "La Table d'Émotion": {
    name_en: "The Emotion Table",
    name_ar: "طاولة المشاعر",
    description_en: "Fine dining restaurant creating emotional culinary experiences through innovative cuisine.",
    description_ar: "مطعم راقي يخلق تجارب طهي عاطفية من خلال المأكولات المبتكرة."
  },

  "Mamon Foods": {
    name_en: "Mamon Foods",
    name_ar: "أطعمة مامون",
    description_en: "Food service company providing quality catering and meal preparation services.",
    description_ar: "شركة خدمات الطعام تقدم خدمات تقديم الطعام وإعداد الوجبات عالية الجودة."
  },

  // Traductions pour les projets événementiels
  "Doja Event": {
    name_en: "Doja Event Organization",
    name_ar: "تنظيم فعاليات دوجا",
    description_en: "Professional event organization company providing comprehensive event management services.",
    description_ar: "شركة تنظيم فعاليات مهنية تقدم خدمات إدارة الفعاليات الشاملة."
  },

  "Pretty Events": {
    name_en: "Pretty Events",
    name_ar: "الفعاليات الجميلة",
    description_en: "Event planning company specializing in elegant weddings and special celebrations.",
    description_ar: "شركة تخطيط الفعاليات متخصصة في حفلات الزفاف الأنيقة والاحتفالات الخاصة."
  },

  "Go Event Digilab": {
    name_en: "GO EVENT DIGILAB",
    name_ar: "معمل الفعاليات الرقمية GO",
    description_en: "Digital event laboratory combining technology and creativity for innovative events.",
    description_ar: "معمل فعاليات رقمي يجمع بين التكنولوجيا والإبداع للفعاليات المبتكرة."
  },

  "AZ Event 733": {
    name_en: "AZ Event 733",
    name_ar: "فعاليات AZ 733",
    description_en: "Event management company providing complete solutions for corporate and social events.",
    description_ar: "شركة إدارة الفعاليات تقدم حلول شاملة للفعاليات المؤسسية والاجتماعية."
  },

  "Erregyby Event": {
    name_en: "Erregyby Event",
    name_ar: "فعاليات الرجيبي",
    description_en: "Event organization specialized in sports and recreational activities for all ages.",
    description_ar: "تنظيم فعاليات متخصص في الأنشطة الرياضية والترفيهية لجميع الأعمار."
  },

  "Baha Happye Park test": {
    name_en: "Baha Happy Park",
    name_ar: "حديقة بهاء السعيدة",
    description_en: "Entertainment park providing family-friendly activities and recreational facilities.",
    description_ar: "حديقة ترفيهية تقدم أنشطة عائلية ومرافق ترفيهية."
  },

  // Traductions pour les projets audio-visuels
  "Taha Prod": {
    name_en: "Taha Production",
    name_ar: "إنتاج طه",
    description_en: "Audio-visual production company offering professional video and media services.",
    description_ar: "شركة إنتاج سمعي بصري تقدم خدمات الفيديو والإعلام المهنية."
  },

  "Foratino": {
    name_en: "Foratino Studio",
    name_ar: "استوديو فوراتينو",
    description_en: "Creative studio providing innovative audio-visual solutions and content creation.",
    description_ar: "استوديو إبداعي يقدم حلول سمعية بصرية مبتكرة وإنشاء المحتوى."
  },

  "Mohcin Najmi Production": {
    name_en: "Mohcin Najmi Production",
    name_ar: "إنتاج محسن نجمي",
    description_en: "Professional production house specializing in documentaries and commercial videos.",
    description_ar: "دار إنتاج مهنية متخصصة في الأفلام الوثائقية ومقاطع الفيديو التجارية."
  },

  "Pixel Prod": {
    name_en: "Pixel Production",
    name_ar: "إنتاج بيكسل",
    description_en: "Digital production company creating high-quality visual content and multimedia solutions.",
    description_ar: "شركة إنتاج رقمي تنشئ محتوى بصري عالي الجودة وحلول الوسائط المتعددة."
  },

  "Wafae El Hana 12": {
    name_en: "Wafae El Hana Center",
    name_ar: "مركز وفاء الهناء 12",
    description_en: "Community center providing social and cultural services for local development.",
    description_ar: "مركز مجتمعي يقدم خدمات اجتماعية وثقافية للتنمية المحلية."
  },

  // Traductions pour les projets de marketing digital
  "Alphacom": {
    name_en: "Alphacom Digital Agency",
    name_ar: "وكالة ألفاكوم الرقمية",
    description_en: "Digital marketing agency specializing in online communication and brand promotion.",
    description_ar: "وكالة تسويق رقمي متخصصة في التواصل عبر الإنترنت وترويج العلامات التجارية."
  }
};

async function addProjectTranslations() {
  try {
    console.log('🔗 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    console.log('📋 Récupération des projets existants...');
    const projects = await Project.find({});
    console.log(`📊 Trouvé ${projects.length} projets`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const project of projects) {
      const projectName = project.name;
      console.log(`\n🔄 Traitement du projet: "${projectName}"`);

      // Vérifier si les traductions existent déjà
      if (project.name_en || project.name_ar || project.description_en || project.description_ar) {
        console.log(`⏭️  Projet déjà traduit, passage au suivant...`);
        skippedCount++;
        continue;
      }

      // Chercher les traductions correspondantes
      const translations = projectTranslations[projectName];
      
      if (translations) {
        console.log(`🌍 Ajout des traductions pour "${projectName}"`);
        
        // Mettre à jour avec les traductions
        await Project.findByIdAndUpdate(project._id, {
          name_en: translations.name_en,
          name_ar: translations.name_ar,
          description_en: translations.description_en,
          description_ar: translations.description_ar,
          updatedAt: new Date()
        });

        console.log(`  ✅ FR: ${projectName}`);
        console.log(`  ✅ EN: ${translations.name_en}`);
        console.log(`  ✅ AR: ${translations.name_ar}`);
        updatedCount++;
      } else {
        console.log(`⚠️  Aucune traduction trouvée pour "${projectName}"`);
        console.log(`   Vous pouvez ajouter manuellement les traductions dans le script`);
        
        // Créer des traductions de base si aucune n'est trouvée
        await Project.findByIdAndUpdate(project._id, {
          name_en: projectName, // Utiliser le nom français comme fallback
          name_ar: projectName, // Utiliser le nom français comme fallback
          description_en: project.description || '',
          description_ar: project.description || '',
          updatedAt: new Date()
        });
        updatedCount++;
      }
    }

    console.log('\n🎉 Migration terminée!');
    console.log(`✅ Projets mis à jour: ${updatedCount}`);
    console.log(`⏭️  Projets ignorés (déjà traduits): ${skippedCount}`);
    console.log(`📊 Total traité: ${updatedCount + skippedCount}`);

    // Vérifier le résultat
    console.log('\n🔍 Vérification des traductions ajoutées...');
    const translatedProjects = await Project.find({
      $or: [
        { name_en: { $exists: true, $ne: null, $ne: '' } },
        { name_ar: { $exists: true, $ne: null, $ne: '' } }
      ]
    }).select('name name_en name_ar');

    console.log(`\n📋 Projets avec traductions (${translatedProjects.length}):`);
    translatedProjects.forEach(project => {
      console.log(`  • FR: ${project.name}`);
      if (project.name_en) console.log(`    EN: ${project.name_en}`);
      if (project.name_ar) console.log(`    AR: ${project.name_ar}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔐 Connexion MongoDB fermée');
  }
}

// Exécuter la migration
console.log('🚀 Démarrage de la migration des traductions de projets...');
addProjectTranslations()
  .then(() => {
    console.log('✅ Migration terminée avec succès!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Échec de la migration:', error);
    process.exit(1);
  });
