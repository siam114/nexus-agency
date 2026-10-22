import { Router } from "express";
import publicRoutes from "./public.routes.js";
import contactRoutes from "./contact.routes.js";
import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js";
import { isDbConnected } from "../config/db.js";
import { apiResponse } from "../utils/apiResponse.js";

const apiRouter = Router();

// Health check endpoint
apiRouter.get("/health", (_req, res) => {
  return apiResponse.success(
    res,
    {
      status: "healthy",
      service: "nexusagency-backend",
      database: isDbConnected() ? "connected" : "disconnected (using fallback cache)",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    "NexusAgency API is operating normally"
  );
});

// Mount modules
apiRouter.use(publicRoutes);
apiRouter.use(contactRoutes);
apiRouter.use(authRoutes);
apiRouter.use("/admin", adminRoutes);

export default apiRouter;

