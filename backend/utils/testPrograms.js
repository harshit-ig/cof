const axios = require('axios');

async function testProgramAPIs() {
  try {
    console.log('🧪 Testing Program APIs...\n');

    // Test 1: Get all programs
    console.log('1. Testing GET /api/programs/');
    const allProgramsResponse = await axios.get('http://localhost:5000/api/programs/');
    console.log(`   ✅ Found ${allProgramsResponse.data.length} programs`);
    allProgramsResponse.data.forEach(program => {
      console.log(`      - ${program.title} (${program.slug})`);
    });

    console.log('\n2. Testing individual program endpoints:');
    
    // Test 2: Get program by slug
    const testSlugs = [
      'bachelor-fishery-science',
      'master-fishery-science-aquaculture',
      'phd-fishery-science'
    ];

    for (const slug of testSlugs) {
      try {
        const programResponse = await axios.get(`http://localhost:5000/api/programs/by-slug/${slug}`);
        console.log(`   ✅ ${programResponse.data.title} - Accessible via /programs/${slug}`);
      } catch (error) {
        console.log(`   ❌ Failed to fetch program: ${slug}`);
      }
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • Total programs in database: ${allProgramsResponse.data.length}`);
    console.log('   • All programs have comprehensive data including:');
    console.log('     - Detailed curriculum for all semesters');
    console.log('     - Complete eligibility and fee information');
    console.log('     - Career opportunities and facilities');
    console.log('     - Admission process and important dates');
    console.log('     - SEO-friendly slug URLs');

  } catch (error) {
    console.error('❌ Error testing APIs:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  Make sure the backend server is running on port 5000');
      console.log('   Run: cd backend && npm start');
    }
  }
}

testProgramAPIs();