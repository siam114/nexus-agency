import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/logger.js";

async function startServer() {
  // Connect to MongoDB (or continue with in-memory fallback if unconfigured)
  await connectDB();

  const server = app.listen(env.PORT, () => {
    logger.info(`NexusAgency Backend running on http://localhost:${env.PORT}`);
    logger.info(`Health check available at http://localhost:${env.PORT}/api/v1/health`);
    logger.info(`Environment: ${env.NODE_ENV}`);
  });

  // Graceful shutdown handling
  const shutdown = async () => {
    logger.info("Gracefully shutting down backend server...");
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});

