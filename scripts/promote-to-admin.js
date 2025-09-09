const { MongoClient } = require('mongodb');

async function promoteToAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('association-najm');
    const users = db.collection('users');
    
    // Update user role to admin
    const result = await users.updateOne(
      { email: 'admin@association-najm.org' },
      { $set: { role: 'admin' } }
    );
    
    if (result.matchedCount > 0) {
      console.log('✅ User promoted to admin successfully!');
      console.log('🌐 You can now access: http://localhost:3000/admin');
    } else {
      console.log('❌ User not found. Please register first at: http://localhost:3000/register');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

promoteToAdmin();
