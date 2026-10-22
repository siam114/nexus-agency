import { Router } from "express";
import { contactController } from "../controllers/contact.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { contactInquirySchema } from "../validators/contact.validator.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Public contact inquiry submission (rate limited & Zod-validated)
router.post(
  "/contact",
  contactRateLimiter,
  validate(contactInquirySchema),
  contactController.submitInquiry
);

export default router;

