import { Router } from "express";
import { z } from "zod";
import { projectController } from "../controllers/project.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
  projectIdParamSchema,
  getProjectsQuerySchema,
} from "../schemas/project.schema.js";
import {
  createProjectImageSchema,
  updateProjectImageSchema,
  projectImageIdParamSchema,
} from "../schemas/projectImage.schema.js";
import { requireAuth } from "../middleware/requireAuth.middleware.js";
import { projectImageUpload } from "../middleware/upload.middleware.js";




export const projectRouter = Router();

// PROJECT

// Create project
projectRouter.post("/projects",requireAuth,validate(z.object({body: createProjectSchema})),projectController.createProject);

// Get all projects
projectRouter.get("/projects",validate(z.object({query: getProjectsQuerySchema,})),projectController.getAllProjects);

// Get project by ID with images
projectRouter.get("/projects/:id",validate(z.object({params: projectIdParamSchema,})),projectController.getProjectById);

// Update project
projectRouter.patch("/projects/:id",requireAuth,validate(z.object({params: projectIdParamSchema,body: updateProjectSchema,})),projectController.updateProject);

// Delete project
projectRouter.delete("/projects/:id",requireAuth,validate(z.object({params: projectIdParamSchema,})),projectController.deleteProject);

// PROJECT IMAGES

// Create project image
projectRouter.post("/projects/images",requireAuth,projectImageUpload.single("image"),validate(z.object({body: createProjectImageSchema,})),projectController.createProjectImage);

// Update specific project image
projectRouter.patch("/projects/images/:id",requireAuth,validate(z.object({params: projectImageIdParamSchema,body: updateProjectImageSchema})),projectController.updateProjectImage);

// Delete specific project image
projectRouter.delete("/projects/images/:id",requireAuth,validate(z.object({params: projectImageIdParamSchema,})),projectController.deleteProjectImage);

