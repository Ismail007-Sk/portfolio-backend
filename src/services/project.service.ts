import { projectRepository } from "../repositories/project.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { saveUploadedFile, deleteUploadedFile } from "../middleware/upload.middleware.js";

import type {
  CreateProjectInput,
  UpdateProjectInput,
  GetProjectsQuery,
} from "../schemas/project.schema.js";

import type {
  CreateProjectImageInput,
  UpdateProjectImageInput,
} from "../schemas/projectImage.schema.js";

export const projectService = {
  // =========================
  // PROJECT
  // =========================

  async createProject(data: CreateProjectInput) {
    return projectRepository.create(data);
  },

  async getAllProjects(filters?: GetProjectsQuery) {
    return projectRepository.findAll(filters);
  },

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    const images =
      await projectRepository.findImagesByProjectId(id);

    return {
      ...project,
      images,
    };
  },

  async updateProject(
    id: string,
    data: UpdateProjectInput
  ) {
    const project = await projectRepository.update(id, data);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    return project;
  },

  async deleteProject(id: string) {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    // Get image URLs before CASCADE deletes their DB records
    const images = await projectRepository.findImagesByProjectId(id);

    // Delete project + related image rows
    await projectRepository.delete(id);

    // Delete physical image files
    for (const image of images) {
      await (image.image_url);
    }

    return project;
  },

  // =========================
  // PROJECT IMAGES
  // =========================

  async createProjectImage(
    data: CreateProjectImageInput,
    file: Express.Multer.File | undefined
  ) {
    // Check project exists
    const project =
      await projectRepository.findById(data.projectId);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    // Check image was uploaded
    if (!file) {
      throw new ValidationError("Project image is required");
    }

    // Save image locally and generate URL
    const {fileUrl} = await saveUploadedFile(file,"projectImage");

    // Save image URL + metadata in database
    return projectRepository.createImage(data, fileUrl);
  },

  async updateProjectImage(
    id: string,
    data: UpdateProjectImageInput
  ) {
    const image =
      await projectRepository.updateImage(id, data);

    if (!image) {
      throw new NotFoundError("Project image not found");
    }

    return image;
  },

  async deleteProjectImage(id: string) {
    // Delete database record first and get its image URL
    const image =
      await projectRepository.deleteImage(id);

    if (!image) {
      throw new NotFoundError("Project image not found");
    }

    // Delete actual physical image file
    await deleteUploadedFile(image.image_url);

    return image;
  },
};