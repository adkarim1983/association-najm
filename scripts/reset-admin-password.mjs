import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/lib/db/models/User.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function resetAdminPassword() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI manquant dans .env.local');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');

    const email = 'admin@najm.ma';
    const newPassword = 'admin123';

    let admin = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      console.log('ℹ️  Admin non trouvé. Création du compte administrateur...');
      admin = new User({
        username: 'admin',
        email,
        password: newPassword,
        firstName: 'Admin',
        lastName: 'Najm',
        role: 'admin',
        isEmailVerified: true,
        isActive: true,
      });
      await admin.save();
      console.log('✅ Compte admin créé avec succès');
    } else {
      console.log('ℹ️  Admin trouvé. Réinitialisation du mot de passe...');
      admin.password = newPassword; // sera hashé par le hook pre('save')
      admin.isActive = true;
      admin.isEmailVerified = true;
      await admin.save();
      console.log('✅ Mot de passe admin réinitialisé');
    }

    console.log('---');
    console.log('Identifiants admin:');
    console.log('Email: admin@najm.ma');
    console.log('Mot de passe: admin123');

  } catch (err) {
    console.error('❌ Erreur:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
  }
}

resetAdminPassword();
