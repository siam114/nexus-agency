import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { apiResponse } from "./utils/apiResponse.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (
        env.ALLOWED_ORIGINS.includes(origin) ||
        env.NODE_ENV === "development" ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Mount API v1 router
app.use("/api/v1", apiRouter);

// Root route
app.get("/", (_req, res) => {
  return apiResponse.success(
    res,
    {
      name: "NexusAgency API",
      version: "1.0.0",
      docs: "/api/v1/health",
    },
    "NexusAgency backend API is running"
  );
});

// 404 Handler for undefined routes
app.use((_req, res) => {
  return apiResponse.notFound(res, "Endpoint not found");
});

// Centralized error handler
app.use(errorHandler);

export default app;

