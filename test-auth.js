// Test authentication flow
async function testAuth() {
  try {
    console.log('Testing authentication flow...');
    
    // 1. Login first - Make sure to set ADMIN_PASSWORD in your .env.local
    const adminPassword = process.env.ADMIN_PASSWORD || 'your_password_here';
    const loginResponse = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: adminPassword })
    });
    
    const loginResult = await loginResponse.json();
    console.log('Login result:', loginResult);
    
    if (!loginResult.success) {
      console.error('Login failed:', loginResult.message);
      return;
    }
    
    // 2. Try to create a project
    const createResponse = await fetch('http://localhost:3001/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title: 'Test Project',
        description: 'Test description',
        longDescription: 'Test long description',
        technologies: ['React', 'Node.js'],
        category: 'web',
        featured: false,
        demoUrl: 'https://test.com',
        githubUrl: 'https://github.com/test/test'
      })
    });
    
    const createResult = await createResponse.json();
    console.log('Create project result:', createResult);
    
    if (createResult.success) {
      console.log('✅ Project created successfully!');
    } else {
      console.error('❌ Failed to create project:', createResult.message);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Run test
testAuth();
