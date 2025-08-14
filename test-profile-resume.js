// Test profile resume URL
const testProfile = async () => {
  try {
    console.log('Testing profile API for resumeUrl...');
    
    const response = await fetch('http://localhost:3002/api/profile');
    const result = await response.json();
    
    console.log('Profile Response:');
    console.log('Success:', result.success);
    console.log('Name:', result.data?.name);
    console.log('Resume URL:', result.data?.resumeUrl);
    console.log('Avatar URL:', result.data?.avatarUrl);
    
    if (result.data?.resumeUrl) {
      console.log('✅ Resume URL exists:', result.data.resumeUrl);
    } else {
      console.log('❌ No resume URL found in profile');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testProfile();
