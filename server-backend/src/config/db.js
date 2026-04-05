import mongoose from "mongoose";

let dbEventListenersAdded = false;
const ensureDbEventListeners = () => {
  if (dbEventListenersAdded) return;

  mongoose.connection.on("connected", () => console.log("MongoDB connected"));
  mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
  mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

  dbEventListenersAdded = true;
};

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined. Set it in .env or your production environment.");
    throw new Error("MONGO_URI not defined");
  }

  ensureDbEventListeners();

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;