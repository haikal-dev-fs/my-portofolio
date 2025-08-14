// Test production API after deployment
const testProductionAPI = async () => {
  try {
    console.log('Testing production APIs after deployment...');
    
    // Test setup endpoint first to ensure table creation
    console.log('1. Testing setup endpoint...');
    const setupResponse = await fetch('https://my-portofolio-haikal.vercel.app/api/setup', {
      method: 'POST'
    });
    const setupResult = await setupResponse.json();
    console.log('Setup result:', setupResult);
    
    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test contact GET endpoint
    console.log('2. Testing contact GET endpoint...');
    const contactResponse = await fetch('https://my-portofolio-haikal.vercel.app/api/contact');
    const contactResult = await contactResponse.json();
    console.log('Contact GET result:', contactResult);
    
    if (contactResult.success) {
      console.log('✅ Contact API working in production!');
      console.log(`Found ${contactResult.data?.length || 0} messages`);
    } else {
      console.log('❌ Contact API still failing:', contactResult.message);
      console.log('Error details:', contactResult.error);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Wait a bit for deployment, then test
setTimeout(testProductionAPI, 5000);
