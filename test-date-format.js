// Test date formatting
const testDateFormatting = () => {
  console.log('Testing date formatting...');
  
  // Test different date formats
  const testDates = [
    '2025-08-14T10:14:11.974Z', // ISO format
    '2025-08-14 10:14:11', // SQL timestamp
    'invalid-date', // Invalid
    '', // Empty
    null, // Null
    undefined // Undefined
  ];
  
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
  
  testDates.forEach((testDate, index) => {
    const result = formatDate(testDate);
    console.log(`${index + 1}. Input: "${testDate}" → Output: "${result}"`);
  });
  
  console.log('✅ Date formatting test completed');
};

testDateFormatting();
