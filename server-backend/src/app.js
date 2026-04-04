import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import authRoutes from "./routes/auth-routes.js";
// import transactionRoutes from "./routes/transaction-routes.js";
// import dashboardRoutes from "./routes/dashboard-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/dashboard", dashboardRoutes);

import homePage from "./views/home-view.js";
app.get(["/","/api"], (req, res) => {
  res.send(homePage());
});

export default app;