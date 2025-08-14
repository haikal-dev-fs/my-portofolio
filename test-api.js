// Test Drizzle connection APIs
const testDrizzle = async () => {
  try {
    console.log('Testing Drizzle connection...');
    
    // Test profile API
    console.log('Testing profile API...');
    const profileResponse = await fetch('http://localhost:3001/api/profile');
    const profileResult = await profileResponse.json();
    console.log('Profile API Response:', profileResult);
    
    // Test projects API
    console.log('Testing projects API...');
    const projectsResponse = await fetch('http://localhost:3001/api/projects');
    const projectsResult = await projectsResponse.json();
    console.log('Projects API Response:', projectsResult);
    
    // Test contact API (direct postgres)
    console.log('Testing contact API (direct postgres)...');
    const contactResponse = await fetch('http://localhost:3001/api/contact');
    const contactResult = await contactResponse.json();
    console.log('Contact API Response:', contactResult);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testDrizzle();
