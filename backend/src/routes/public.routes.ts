import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";
import { serviceController } from "../controllers/service.controller.js";
import { teamController } from "../controllers/team.controller.js";
import { testimonialController } from "../controllers/testimonial.controller.js";
import { settingsController } from "../controllers/settings.controller.js";

const router = Router();

// Projects
router.get("/projects", projectController.getPublicProjects);
router.get("/projects/:slug", projectController.getProjectBySlug);

// Services
router.get("/services", serviceController.getPublicServices);
router.get("/services/:slug", serviceController.getServiceBySlug);

// Team & Testimonials
router.get("/team", teamController.getPublicTeam);
router.get("/testimonials", testimonialController.getPublicTestimonials);

// Settings
router.get("/settings", settingsController.getSettings);

export default router;

