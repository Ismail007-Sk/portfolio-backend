import type { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service.js";
import type {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectIdParams,
  GetProjectsQuery,
} from "../schemas/project.schema.js";
import type {
  CreateProjectImageInput,
  UpdateProjectImageInput,
  ProjectImageIdParams,
} from "../schemas/projectImage.schema.js";

export const projectController = {
  // PROJECT

  // Create project
  async createProject(
    req: Request<{}, {}, CreateProjectInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await projectService.createProject(req.body);

      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all projects
  async getAllProjects(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const projects = await projectService.getAllProjects(req.query as GetProjectsQuery);

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get project by ID with all related images
  async getProjectById(
    req: Request<ProjectIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await projectService.getProjectById(req.params.id);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update project
  async updateProject(
    req: Request<ProjectIdParams, {}, UpdateProjectInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await projectService.updateProject(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete project
  async deleteProject(
    req: Request<ProjectIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const project = await projectService.deleteProject(req.params.id);

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // PROJECT IMAGES

  // Create project image
  async createProjectImage(
    req: Request<{}, {}, CreateProjectImageInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const image = await projectService.createProjectImage(
        req.body,
        req.file
      );

      res.status(201).json({
        success: true,
        data: image,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update specific project image
  async updateProjectImage(
    req: Request<ProjectImageIdParams, {}, UpdateProjectImageInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const image = await projectService.updateProjectImage(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: image,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete specific project image
  async deleteProjectImage(
    req: Request<ProjectImageIdParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const image = await projectService.deleteProjectImage(req.params.id);

      res.status(200).json({
        success: true,
        message: "Project image deleted successfully",
        data: image,
      });
    } catch (error) {
      next(error);
    }
  },
};