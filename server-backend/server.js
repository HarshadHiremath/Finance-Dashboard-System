import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
  }
};

startServer();