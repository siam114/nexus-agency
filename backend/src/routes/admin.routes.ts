import { Router } from "express";
import { protectAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { projectController } from "../controllers/project.controller.js";
import { serviceController } from "../controllers/service.controller.js";
import { teamController } from "../controllers/team.controller.js";
import { testimonialController } from "../controllers/testimonial.controller.js";
import { contactController } from "../controllers/contact.controller.js";
import { settingsController } from "../controllers/settings.controller.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator.js";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validators/service.validator.js";
import {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from "../validators/team.validator.js";
import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from "../validators/testimonial.validator.js";
import { updateInquiryStatusSchema } from "../validators/contact.validator.js";
import { updateSettingsSchema } from "../validators/settings.validator.js";

const router = Router();

// Protect ALL routes mounted on /admin with JWT verification
router.use(protectAdmin);

// ========================
// Projects Management (/api/v1/admin/projects)
// ========================
router.get("/projects", projectController.getAllAdminProjects);
router.get("/projects/:id", projectController.getAdminProjectById);
router.post(
  "/projects",
  validate(createProjectSchema),
  projectController.createProject
);
router.patch(
  "/projects/:id",
  validate(updateProjectSchema),
  projectController.updateProject
);
router.delete("/projects/:id", projectController.deleteProject);
router.patch("/projects/:id/publish", projectController.togglePublishProject);

// ========================
// Services Management (/api/v1/admin/services)
// ========================
router.get("/services", serviceController.getAllAdminServices);
router.post(
  "/services",
  validate(createServiceSchema),
  serviceController.createService
);
router.patch(
  "/services/:id",
  validate(updateServiceSchema),
  serviceController.updateService
);
router.delete("/services/:id", serviceController.deleteService);

// ========================
// Team Members Management (/api/v1/admin/team)
// ========================
router.get("/team", teamController.getAllAdminTeam);
router.post(
  "/team",
  validate(createTeamMemberSchema),
  teamController.createTeamMember
);
router.patch(
  "/team/:id",
  validate(updateTeamMemberSchema),
  teamController.updateTeamMember
);
router.delete("/team/:id", teamController.deleteTeamMember);

// ========================
// Testimonials Management (/api/v1/admin/testimonials)
// ========================
router.get("/testimonials", testimonialController.getAllAdminTestimonials);
router.post(
  "/testimonials",
  validate(createTestimonialSchema),
  testimonialController.createTestimonial
);
router.patch(
  "/testimonials/:id",
  validate(updateTestimonialSchema),
  testimonialController.updateTestimonial
);
router.delete("/testimonials/:id", testimonialController.deleteTestimonial);

// ========================
// Contact Inquiries Management (/api/v1/admin/inquiries)
// ========================
router.get("/inquiries", contactController.getAllInquiries);
router.get("/inquiries/:id", contactController.getInquiryById);
router.patch(
  "/inquiries/:id/status",
  validate(updateInquiryStatusSchema),
  contactController.updateInquiryStatus
);
router.delete("/inquiries/:id", contactController.deleteInquiry);

// ========================
// Settings Management (/api/v1/admin/settings)
// ========================
router.patch(
  "/settings",
  validate(updateSettingsSchema),
  settingsController.updateSettings
);

export default router;

