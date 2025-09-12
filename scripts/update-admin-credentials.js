const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const TARGET_EMAIL = 'admin@najm.ma';
const TARGET_PASSWORD = 'admin123';

// Minimal User schema for this maintenance script
// We avoid importing the app's ESM model to keep this script simple and runnable with Node.
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.models.__ScriptUser || mongoose.model('__ScriptUser', userSchema);

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ MONGODB_URI is not set in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Find the admin user by username first
    let admin = await User.findOne({ username: 'admin' });

    // If not found by username, try by known emails
    if (!admin) {
      admin = await User.findOne({ email: { $in: ['admin@association-najm.org', 'admin@najm.ma'] } });
    }

    const hashed = await bcrypt.hash(TARGET_PASSWORD, 12);

    if (admin) {
      // Update existing admin
      admin.email = TARGET_EMAIL;
      admin.password = hashed;
      admin.role = 'admin';
      admin.isActive = true;
      admin.isEmailVerified = true;
      admin.firstName = admin.firstName || 'Admin';
      admin.lastName = admin.lastName || 'Najm';
      admin.username = 'admin';
      admin.updatedAt = new Date();

      await admin.save();
      console.log('✅ Updated admin credentials successfully');
      console.log('   Email:', TARGET_EMAIL);
      console.log('   Password:', TARGET_PASSWORD);
    } else {
      // Create new admin if none exists
      await User.create({
        firstName: 'Admin',
        lastName: 'Najm',
        username: 'admin',
        email: TARGET_EMAIL,
        password: hashed,
        role: 'admin',
        isActive: true,
        isEmailVerified: true
      });
      console.log('✅ Created admin user with desired credentials');
      console.log('   Email:', TARGET_EMAIL);
      console.log('   Password:', TARGET_PASSWORD);
    }
  } catch (err) {
    if (err && err.code === 11000) {
      console.error('❌ Duplicate key error (email or username already in use).');
      console.error('   Tip: Ensure no other user uses the email', TARGET_EMAIL, 'then rerun.');
    } else {
      console.error('❌ Error:', err.message);
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

run();
