// Simple test to verify the projects API route
import { GET } from './src/app/api/projects/route.js';

async function testProjectsAPI() {
  try {
    console.log('🧪 Testing Projects API Route...');
    
    // Create a mock request object
    const mockRequest = {
      nextUrl: {
        searchParams: new URLSearchParams()
      }
    };
    
    // Call the GET handler directly
    const response = await GET(mockRequest);
    const data = await response.json();
    
    console.log('✅ API Response Status:', response.status);
    console.log('📊 Response Data:', JSON.stringify(data, null, 2));
    
    if (data.projects) {
      console.log(`📋 Found ${data.projects.length} projects`);
    }
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testProjectsAPI();
