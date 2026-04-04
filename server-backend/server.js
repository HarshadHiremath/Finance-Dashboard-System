import app from "./src/app.js";
import connectDB from "./src/config/db.js";

import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
  }
};

startServer();