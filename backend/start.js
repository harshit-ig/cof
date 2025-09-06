require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Check if we're in the right directory
const serverPath = path.join(__dirname, 'server.js');
if (!fs.existsSync(serverPath)) {
  console.error('server.js not found at:', serverPath);
  process.exit(1);
}

// Set environment variables
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kush2012bhardwaj:RaidenEi21@cluster0.7fvgxjw.mongodb.net/fishery_college?retryWrites=true&w=majority';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production';
process.env.PORT = process.env.PORT || '5001';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Starting server with environment:');
console.log('- PORT:', process.env.PORT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MONGODB_URI set:', !!process.env.MONGODB_URI);

// Start the actual server
require('./server.js');
