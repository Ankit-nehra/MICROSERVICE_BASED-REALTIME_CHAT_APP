import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";


import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/errorHandler.js";

console.log("🚀 Starting Auth Service...");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    service: "auth-service",
    status: "running",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Auth Service running on ${PORT}`);
  });
};

startServer();