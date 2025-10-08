const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set. Please check your .env file.');
    }

    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI configured:', process.env.MONGODB_URI ? 'YES' : 'NO');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Database connection error:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.error('Make sure your .env file exists and contains MONGODB_URI');
    }
    process.exit(1);
  }
};

module.exports = connectDB;




