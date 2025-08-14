// Test production contact form with detailed error reporting
const testProductionWithDetails = async () => {
  try {
    console.log('Testing production contact form with detailed error reporting...');
    
    // Wait for deployment
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    console.log('Submitting contact form...');
    const response = await fetch('https://my-portofolio-haikal.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Debug Test User',
        email: 'debug@test.com',
        subject: 'Debug Test Message',
        message: 'This message is for debugging production errors'
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const result = await response.json();
    console.log('Full Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('✅ Success! Message submitted successfully');
    } else {
      console.log('❌ Failed with details:');
      console.log('Message:', result.message);
      console.log('Error:', result.error);
      console.log('Details:', result.details);
    }
  } catch (error) {
    console.error('❌ Network/Parse Error:', error);
  }
};

testProductionWithDetails();
