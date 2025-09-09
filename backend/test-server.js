require('dotenv').config();

console.log('Testing environment variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT);
console.log('SMTP_HOST:', process.env.SMTP_HOST);

const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

// Test placement route
try {
  const placementRoute = require('./routes/placement');
  app.use('/api/placement', placementRoute);
  console.log('Placement route loaded successfully');
} catch (error) {
  console.error('Error loading placement route:', error.message);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
