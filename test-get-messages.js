// Test GET messages API
const testGetMessages = async () => {
  try {
    console.log('Testing GET messages API...');
    
    const response = await fetch('http://localhost:3003/api/contact');
    const result = await response.json();
    
    console.log('GET Response:', result);
    
    if (result.success) {
      console.log('✅ GET messages successful!');
      console.log(`Found ${result.data.length} messages`);
      
      result.data.forEach((msg, index) => {
        console.log(`Message ${index + 1}:`, {
          id: msg.id,
          name: msg.name,
          subject: msg.subject,
          created_at: msg.created_at
        });
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testGetMessages();
