import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import userRoutes from "./routes/user-routes.js";
import transactionRoutes from "./routes/transaction-routes.js";
import dashboardRoutes from "./routes/dashboard-routes.js";

import homePage from "./views/home-view.js";

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root route
app.get(["/", "/api"], (req, res) => {
  res.send(homePage());
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app; 