// Test production contact form
const testProductionContact = async () => {
  try {
    console.log('Testing production contact form...');
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Production Test User',
        email: 'production@example.com',
        subject: 'Production Test Subject',
        message: 'This is a test message from production environment'
      }),
    });

    const result = await response.json();
    console.log('Production Contact Response:', result);

    if (result.success) {
      console.log('✅ Production contact form working!');
      
      // Test GET messages in production
      console.log('Testing production GET messages...');
      const getResponse = await fetch('http://localhost:3000/api/contact');
      const messages = await getResponse.json();
      console.log('Production GET Response:', {
        success: messages.success,
        messageCount: messages.data?.length || 0,
        firstMessage: messages.data?.[0]?.subject
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testProductionContact();
