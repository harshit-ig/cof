const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

// Test configuration
const testConfig = {
  timeout: 5000,
  validateStatus: (status) => status < 500 // Accept 4xx as valid responses
};

// List of all endpoints to test
const endpoints = [
  // Public endpoints (no auth required)
  { method: 'GET', path: '/health', name: 'Health Check', auth: false },
  { method: 'GET', path: '/programs', name: 'Programs List', auth: false },
  { method: 'GET', path: '/news', name: 'News List', auth: false },
  { method: 'GET', path: '/faculty', name: 'Faculty List', auth: false },
  { method: 'GET', path: '/research', name: 'Research List', auth: false },
  { method: 'GET', path: '/infrastructure', name: 'Infrastructure List', auth: false },
  { method: 'GET', path: '/events', name: 'Events List', auth: false },
  { method: 'GET', path: '/collaborations', name: 'Collaborations List', auth: false },
  { method: 'GET', path: '/content', name: 'Content List', auth: false },
  { method: 'GET', path: '/gallery', name: 'Gallery List', auth: false },
  { method: 'GET', path: '/slideshow', name: 'Slideshow List', auth: false },
  { method: 'GET', path: '/settings', name: 'Settings', auth: false },
  { method: 'GET', path: '/placement', name: 'Placement List', auth: false },
  { method: 'GET', path: '/incubation', name: 'Incubation List', auth: false },
  
  // Auth endpoints
  { method: 'POST', path: '/auth/login', name: 'Auth Login', auth: false, 
    data: { email: 'test@example.com', password: 'test123' } },
];

async function testEndpoint(endpoint) {
  try {
    const config = {
      method: endpoint.method,
      url: `${BASE_URL}${endpoint.path}`,
      ...testConfig
    };
    
    if (endpoint.data) {
      config.data = endpoint.data;
    }
    
    const response = await axios(config);
    return {
      name: endpoint.name,
      path: endpoint.path,
      method: endpoint.method,
      status: response.status,
      success: true,
      dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
      hasData: response.data ? Object.keys(response.data).length > 0 : false
    };
  } catch (error) {
    return {
      name: endpoint.name,
      path: endpoint.path,
      method: endpoint.method,
      status: error.response?.status || 'TIMEOUT/ERROR',
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

async function runTests() {
  console.log('🔍 Testing Backend API Endpoints...\n');
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    const statusIcon = result.success ? '✅' : '❌';
    const statusText = result.success ? 'SUCCESS' : 'FAILED';
    
    console.log(`${statusIcon} ${result.method} ${result.path}`);
    console.log(`   Name: ${result.name}`);
    console.log(`   Status: ${result.status} (${statusText})`);
    
    if (result.success) {
      console.log(`   Data Type: ${result.dataType}`);
      console.log(`   Has Data: ${result.hasData ? 'Yes' : 'No'}`);
    } else {
      console.log(`   Error: ${result.error}`);
    }
    console.log('-'.repeat(80));
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n📊 TEST SUMMARY');
  console.log('=' .repeat(80));
  console.log(`Total Endpoints Tested: ${results.length}`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((successful / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n🚨 FAILED ENDPOINTS:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.method} ${r.path} - Status: ${r.status} - ${r.error}`);
    });
  }
  
  console.log('\n✨ API Endpoint Testing Complete!');
}

// Run the tests
runTests().catch(console.error);
