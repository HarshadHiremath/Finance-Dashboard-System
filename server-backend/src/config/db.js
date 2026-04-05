import mongoose from "mongoose"; 
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  const mongoUri = "mongodb://localhost:27017/finance-dashboard";

  try {
    const conn = await mongoose.connect(mongoUri);
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error;
  }
};

export default connectDB;