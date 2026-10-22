import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";
import { loginRateLimiter } from "../middleware/rateLimiter.js";
import { protectAdmin } from "../middleware/auth.middleware.js";

const router = Router();

// Admin login (rate limited & Zod-validated)
router.post(
  "/auth/login",
  loginRateLimiter,
  validate(loginSchema),
  authController.login
);

// Current admin profile
router.get("/auth/me", protectAdmin, authController.me);

export default router;

