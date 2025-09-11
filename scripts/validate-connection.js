import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

function validateConnectionString() {
  console.log('🔍 Validating MongoDB connection string...');
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    return;
  }
  
  const uri = process.env.MONGODB_URI;
  console.log('📡 Connection string format check:');
  
  // Mask sensitive parts for display
  const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  console.log(`URI: ${maskedUri}`);
  
  // Check basic format
  if (!uri.startsWith('mongodb+srv://') && !uri.startsWith('mongodb://')) {
    console.error('❌ URI should start with mongodb+srv:// or mongodb://');
    return;
  }
  
  // Check for database name
  const dbMatch = uri.match(/\/([^/?]+)(\?|$)/);
  if (dbMatch) {
    const dbName = dbMatch[1];
    console.log(`📊 Database specified: "${dbName}"`);
    
    if (dbName === 'associationNajm') {
      console.log('✅ Correct database name specified');
    } else if (dbName === 'test') {
      console.log('⚠️  Still using "test" database');
      console.log('💡 Change "test" to "associationNajm" in your connection string');
    } else {
      console.log(`ℹ️  Using "${dbName}" database`);
    }
  } else {
    console.log('⚠️  No database specified - will default to "test"');
    console.log('💡 Add "/associationNajm" before the query parameters');
  }
  
  // Check for common issues
  if (uri.includes('cluster.mongodb.net') && !uri.includes('retryWrites=true')) {
    console.log('💡 Consider adding "?retryWrites=true&w=majority" to your connection string');
  }
  
  console.log('\n📝 Correct format should be:');
  console.log('mongodb+srv://username:password@cluster.mongodb.net/associationNajm?retryWrites=true&w=majority');
}

validateConnectionString();
