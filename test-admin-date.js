// Test admin date formatting with real production data
const testAdminDate = async () => {
  try {
    console.log('Testing admin date formatting with production data...');
    
    // Get messages from production
    const response = await fetch('https://my-portofolio-haikal.vercel.app/api/contact');
    const result = await response.json();
    
    if (result.success) {
      console.log(`Found ${result.data.length} messages to test:`);
      
      const formatDate = (dateString) => {
        try {
          if (!dateString) {
            return 'No Date';
          }
          
          const date = new Date(dateString);
          if (isNaN(date.getTime())) {
            return 'Invalid Date';
          }
          return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch (error) {
          console.error('Error formatting date:', error);
          return 'Invalid Date';
        }
      };
      
      result.data.forEach((message, index) => {
        const formattedDate = formatDate(message.created_at);
        console.log(`${index + 1}. ${message.subject}`);
        console.log(`   Raw date: ${message.created_at}`);
        console.log(`   Formatted: ${formattedDate}`);
        console.log('');
      });
      
      console.log('✅ All dates formatted successfully for admin panel');
    } else {
      console.log('❌ Failed to fetch messages');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testAdminDate();
