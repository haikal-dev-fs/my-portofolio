// Test authentication flow
async function testAuth() {
  try {
    console.log('Testing authentication flow...');
    
    // 1. Test with adminkal (correct password)
    const testResponse = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'adminkal' })
    });
    
    const testResult = await testResponse.json();
    console.log('Test auth result:', testResult);
    
    if (testResult.success) {
      console.log('✅ Authentication successful with adminkal!');
      return;
    }
    
    // 2. Login with env password
    const adminPassword = process.env.ADMIN_PASSWORD || 'your_password_here';
    const loginResponse = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ password: adminPassword })
    });
    
    const loginResult = await loginResponse.json();
    console.log('Env auth result:', loginResult);
    
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
