const fs = require('fs');
const path = require('path');

// Test script to check upload directory permissions and structure
async function testUploadSetup() {
  console.log('🧪 Testing upload configuration...\n');
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  console.log('📁 Upload directory:', uploadDir);
  
  try {
    // Check if directory exists
    const dirExists = fs.existsSync(uploadDir);
    console.log('✅ Directory exists:', dirExists);
    
    if (!dirExists) {
      console.log('📝 Creating upload directory...');
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('✅ Upload directory created');
    }
    
    // Test write permissions
    const testFile = path.join(uploadDir, 'test-write.txt');
    fs.writeFileSync(testFile, 'test');
    console.log('✅ Write permissions: OK');
    
    // Clean up test file
    fs.unlinkSync(testFile);
    console.log('✅ Test file cleaned up');
    
    // Check directory contents
    const files = fs.readdirSync(uploadDir);
    console.log('📂 Directory contents:', files.length, 'files');
    
    console.log('\n🎉 Upload setup is working correctly!');
    
  } catch (error) {
    console.error('❌ Upload setup error:', error.message);
    console.error('Full error:', error);
  }
}

testUploadSetup();
