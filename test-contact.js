// Test contact API
const testContactAPI = async () => {
  try {
    console.log('Testing contact API...');
    
    const response = await fetch('http://localhost:3003/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from script'
      }),
    });

    const result = await response.json();
    console.log('POST Response:', result);

    if (result.success) {
      console.log('✅ Contact form submission successful!');
      
      // Test GET endpoint
      console.log('Testing GET messages...');
      const getResponse = await fetch('http://localhost:3003/api/contact');
      const messages = await getResponse.json();
      console.log('GET Response:', messages);
      
      if (messages.success) {
        console.log('✅ GET messages successful!');
        console.log(`Found ${messages.data.length} messages`);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testContactAPI();
