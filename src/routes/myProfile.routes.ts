import { Router } from "express";
import { z } from "zod";

import {
  myProfileController,
  skillsController,
  experienceController,
  educationController,
  certificationsController,
  achievementsController,
  servicesController,
} from "../controllers/myProfile.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { requireAuth } from "../middleware/requireAuth.middleware.js";

import {
  createMyProfileSchema,
  updateMyProfileSchema,
  myProfileIdParamSchema,

  createSkillSchema,
  updateSkillSchema,
  skillIdParamSchema,

  createExperienceSchema,
  updateExperienceSchema,
  experienceIdParamSchema,

  createEducationSchema,
  updateEducationSchema,
  educationIdParamSchema,

  createCertificationSchema,
  updateCertificationSchema,
  certificationIdParamSchema,

  createAchievementSchema,
  updateAchievementSchema,
  achievementIdParamSchema,

  createServiceSchema,
  updateServiceSchema,
  serviceIdParamSchema,
} from "../schemas/myProfile.schema.js";

import {
  cvUpload,
  certificationUpload,
  certificationIssuerUpload,
  achievementIconUpload,
  skillIconUpload,
  experienceIconUpload,
  certificationFilesUpload,
  profileFilesUpload,
} from "../middleware/upload.middleware.js";


export const myProfileRouter = Router();


// Myprofile
myProfileRouter.post("/myprofile", requireAuth, profileFilesUpload, validate(z.object({ body: createMyProfileSchema })), myProfileController.createProfile);
myProfileRouter.get("/myprofile", myProfileController.getProfiles);
myProfileRouter.get("/myprofile/:id", validate(z.object({ params: myProfileIdParamSchema })), myProfileController.getProfile);
myProfileRouter.patch("/myprofile/:id", requireAuth, profileFilesUpload, validate(z.object({ params: myProfileIdParamSchema, body: updateMyProfileSchema })), myProfileController.updateProfile);
myProfileRouter.delete("/myprofile/:id", requireAuth, validate(z.object({ params: myProfileIdParamSchema })), myProfileController.deleteProfile);


// Skill
myProfileRouter.post("/skills", requireAuth, skillIconUpload.single("icon"), validate(z.object({ body: createSkillSchema })), skillsController.createSkill);
myProfileRouter.get("/skills", skillsController.getSkills);
myProfileRouter.get("/skills/:id", validate(z.object({ params: skillIdParamSchema })), skillsController.getSkill);
myProfileRouter.patch("/skills/:id", requireAuth, skillIconUpload.single("icon"), validate(z.object({ params: skillIdParamSchema, body: updateSkillSchema })), skillsController.updateSkill);
myProfileRouter.delete("/skills/:id", requireAuth, validate(z.object({ params: skillIdParamSchema })), skillsController.deleteSkill);


// Experience
myProfileRouter.post("/experience", requireAuth, experienceIconUpload.single("icon"), validate(z.object({ body: createExperienceSchema })), experienceController.createExperience);
myProfileRouter.get("/experience", experienceController.getExperience);
myProfileRouter.get("/experience/:id", validate(z.object({ params: experienceIdParamSchema })), experienceController.getExperienceById);
myProfileRouter.patch("/experience/:id", requireAuth, experienceIconUpload.single("icon"), validate(z.object({ params: experienceIdParamSchema, body: updateExperienceSchema })), experienceController.updateExperience);
myProfileRouter.delete("/experience/:id", requireAuth, validate(z.object({ params: experienceIdParamSchema })), experienceController.deleteExperience);


// Education
myProfileRouter.post("/education", requireAuth, validate(z.object({ body: createEducationSchema })), educationController.createEducation);
myProfileRouter.get("/education", educationController.getEducation);
myProfileRouter.get("/education/:id", validate(z.object({ params: educationIdParamSchema })), educationController.getEducationById);
myProfileRouter.patch("/education/:id", requireAuth, validate(z.object({ params: educationIdParamSchema, body: updateEducationSchema })), educationController.updateEducation);
myProfileRouter.delete("/education/:id", requireAuth, validate(z.object({ params: educationIdParamSchema })), educationController.deleteEducation);


// Certification
myProfileRouter.post("/certifications", requireAuth, certificationFilesUpload, validate(z.object({ body: createCertificationSchema })), certificationsController.createCertification);
myProfileRouter.get("/certifications", certificationsController.getCertifications);
myProfileRouter.get("/certifications/:id", validate(z.object({ params: certificationIdParamSchema })), certificationsController.getCertification);
myProfileRouter.patch("/certifications/:id", requireAuth, certificationFilesUpload, validate(z.object({ params: certificationIdParamSchema, body: updateCertificationSchema })), certificationsController.updateCertification);
myProfileRouter.delete("/certifications/:id", requireAuth, validate(z.object({ params: certificationIdParamSchema })), certificationsController.deleteCertification);


// Achievement
myProfileRouter.post("/achievements", requireAuth, achievementIconUpload.single("icon"), validate(z.object({ body: createAchievementSchema })), achievementsController.createAchievement);
myProfileRouter.get("/achievements", achievementsController.getAchievements);
myProfileRouter.get("/achievements/:id", validate(z.object({ params: achievementIdParamSchema })), achievementsController.getAchievement);
myProfileRouter.patch("/achievements/:id", requireAuth, achievementIconUpload.single("icon"), validate(z.object({ params: achievementIdParamSchema, body: updateAchievementSchema })), achievementsController.updateAchievement);
myProfileRouter.delete("/achievements/:id", requireAuth, validate(z.object({ params: achievementIdParamSchema })), achievementsController.deleteAchievement);


// Service
myProfileRouter.post("/services", requireAuth, validate(z.object({ body: createServiceSchema })), servicesController.createService);
myProfileRouter.get("/services", servicesController.getServices);
myProfileRouter.get("/services/:id", validate(z.object({ params: serviceIdParamSchema })), servicesController.getService);
myProfileRouter.patch("/services/:id", requireAuth, validate(z.object({ params: serviceIdParamSchema, body: updateServiceSchema })), servicesController.updateService);
myProfileRouter.delete("/services/:id", requireAuth, validate(z.object({ params: serviceIdParamSchema })), servicesController.deleteService);