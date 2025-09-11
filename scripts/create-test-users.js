import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/lib/db/models/User.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function createTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Test users to create
    const testUsers = [
      {
        username: 'admin',
        email: 'admin@najm.ma',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'Najm',
        role: 'admin',
        isEmailVerified: true
      },
      {
        username: 'moderator',
        email: 'moderator@najm.ma',
        password: 'mod123',
        firstName: 'Modérateur',
        lastName: 'Najm',
        role: 'moderator',
        isEmailVerified: true
      },
      {
        username: 'user',
        email: 'user@najm.ma',
        password: 'user123',
        firstName: 'Utilisateur',
        lastName: 'Test',
        role: 'user',
        isEmailVerified: true
      }
    ];

    console.log('Creating test users...');

    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [
            { email: userData.email },
            { username: userData.username }
          ]
        });

        if (existingUser) {
          console.log(`User ${userData.username} already exists, skipping...`);
          continue;
        }

        // Create new user
        const user = new User(userData);
        await user.save();
        
        console.log(`✅ Created user: ${userData.username} (${userData.role})`);
        console.log(`   Email: ${userData.email}`);
        console.log(`   Password: ${userData.password}`);
        console.log('');
      } catch (error) {
        console.error(`❌ Error creating user ${userData.username}:`, error.message);
      }
    }

    console.log('='.repeat(50));
    console.log('IDENTIFIANTS DE CONNEXION:');
    console.log('='.repeat(50));
    console.log('');
    console.log('👑 ADMINISTRATEUR:');
    console.log('   Email: admin@najm.ma');
    console.log('   Mot de passe: admin123');
    console.log('');
    console.log('🛡️ MODÉRATEUR:');
    console.log('   Email: moderator@najm.ma');
    console.log('   Mot de passe: mod123');
    console.log('');
    console.log('👤 UTILISATEUR:');
    console.log('   Email: user@najm.ma');
    console.log('   Mot de passe: user123');
    console.log('');
    console.log('='.repeat(50));
    console.log('Vous pouvez maintenant vous connecter sur /login');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createTestUsers();
