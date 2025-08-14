// Reset database table
const resetDatabase = async () => {
  try {
    console.log('Resetting messages table...');
    
    const response = await fetch('http://localhost:3003/api/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    console.log('Setup Response:', result);
    
    if (result.success) {
      console.log('✅ Database reset successful!');
      
      // Test contact form again
      console.log('Testing contact form...');
      const contactResponse = await fetch('http://localhost:3003/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User 2',
          email: 'test2@example.com',
          subject: 'Test Subject 2',
          message: 'This is another test message'
        }),
      });

      const contactResult = await contactResponse.json();
      console.log('Contact Response:', contactResult);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

resetDatabase();
