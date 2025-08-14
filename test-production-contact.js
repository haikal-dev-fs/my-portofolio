// Test production contact form submission
const testProductionContactForm = async () => {
  try {
    console.log('Testing production contact form submission...');
    
    const response = await fetch('https://my-portofolio-haikal.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Production Test User',
        email: 'test@production.com',
        subject: 'Production Test Message',
        message: 'This is a test message submitted to production environment'
      }),
    });

    const result = await response.json();
    console.log('Production Contact Form Response:', result);

    if (result.success) {
      console.log('✅ Production contact form working!');
      
      // Test retrieving messages again
      console.log('Testing message retrieval...');
      const getResponse = await fetch('https://my-portofolio-haikal.vercel.app/api/contact');
      const messages = await getResponse.json();
      console.log('Messages count:', messages.data?.length || 0);
      console.log('Latest message:', messages.data?.[0]?.subject);
    } else {
      console.log('❌ Production contact form failed:', result.message);
      console.log('Error details:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testProductionContactForm();
