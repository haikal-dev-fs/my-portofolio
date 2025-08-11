// Test API Projects
fetch('http://localhost:3000/api/projects')
  .then(res => res.json())
  .then(data => {
    console.log('API Response:', data);
    if (data.success && data.data) {
      console.log('Projects:', data.data);
    } else {
      console.log('Error:', data.message);
    }
  })
  .catch(err => {
    console.error('Fetch error:', err);
  });
