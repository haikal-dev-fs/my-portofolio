// Test date format from production API
const testDateFormat = async () => {
  try {
    console.log('Testing date format from production API...');
    
    const response = await fetch('https://my-portofolio-haikal.vercel.app/api/contact');
    const result = await response.json();
    
    if (result.success && result.data?.length > 0) {
      console.log('Sample message data:');
      const message = result.data[0];
      
      console.log('Raw created_at:', message.created_at);
      console.log('Type of created_at:', typeof message.created_at);
      console.log('Created_at value:', JSON.stringify(message.created_at));
      
      // Test different date parsing methods
      console.log('\nTesting date parsing:');
      
      try {
        const date1 = new Date(message.created_at);
        console.log('new Date(created_at):', date1);
        console.log('Is valid date:', !isNaN(date1.getTime()));
        
        if (!isNaN(date1.getTime())) {
          console.log('Formatted date:', date1.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }));
        }
      } catch (error) {
        console.log('Date parsing error:', error.message);
      }
      
      // Test ISO string
      try {
        const isoDate = new Date(message.created_at).toISOString();
        console.log('ISO string:', isoDate);
        console.log('From ISO:', new Date(isoDate).toLocaleString());
      } catch (error) {
        console.log('ISO conversion error:', error.message);
      }
      
    } else {
      console.log('No messages found or API failed');
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
};

testDateFormat();
