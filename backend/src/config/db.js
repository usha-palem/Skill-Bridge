const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbridge';
    const isAtlas = mongoUri.includes('mongodb+srv') || mongoUri.includes('.mongodb.net');

    console.log(`Connecting to ${isAtlas ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'}...`);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: isAtlas ? 10000 : 5000
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host} (${isAtlas ? 'Cloud Atlas' : 'Local Instance'})`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ MongoDB Connection Failed: ${error.message}`);
    console.warn(`ℹ️ Operating in High-Resiliency Fallback Mode (In-Memory Database Active).`);
    console.warn(`ℹ️ To connect MongoDB Atlas, set MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/skillbridge in backend/.env`);
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
