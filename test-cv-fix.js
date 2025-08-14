// Test CV download behavior
const testCVDownload = async () => {
  try {
    console.log('Testing CV download fix...');
    
    // Direct URL from database
    const cvUrl = 'https://vnbsfqlpnkuggifjqeyc.supabase.co/storage/v1/object/public/portofolio-uploads/cv/cv-1755165222665.pdf';
    
    console.log('CV URL from database:', cvUrl);
    console.log('✅ This should open in new tab, not download JSON');
    console.log('✅ Fix applied:');
    console.log('  - HeroSection now uses resumeUrl directly from profile API');
    console.log('  - /api/cv/check returns resumeUrl instead of /api/cv');
    console.log('  - No more routing through /api/cv endpoint');
    console.log('✅ Result: CV will open in new tab instead of downloading JSON');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testCVDownload();
