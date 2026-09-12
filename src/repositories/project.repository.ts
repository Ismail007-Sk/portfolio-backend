import { db } from "../config/database.js";
import type { 
  CreateProjectInput,
  UpdateProjectInput,
  GetProjectsQuery } from "../schemas/project.schema.js";
import type { 
  CreateProjectImageInput,
  UpdateProjectImageInput} from "../schemas/projectImage.schema.js";

export const projectRepository = {
  // Projects CRUD
  async create(data: CreateProjectInput) {
    const [project] = await db("projects")
      .insert({
        title: data.title,
        problem: data.problem ?? null,
        solution: data.solution ?? null,
        full_description: data.fullDescription ?? null,
        tech_stack: data.techStack,
        github_url: data.githubUrl ?? null,
        live_demo_url: data.liveDemoUrl ?? null,
        demo_video_url: data.demoVideoUrl ?? null,
        project_category: data.projectCategory ?? null,
        is_featured: data.isFeatured,
        display_order: data.displayOrder,
        status: data.status,
      })
      .returning("*");

    return project;
  },

  async findAll(filters?: GetProjectsQuery) {
    const query = db("projects").select("*");

    if (filters?.featured !== undefined) {
      query.where("is_featured", filters.featured);
    }

    if (filters?.status !== undefined) {
      query.where("status", filters.status);
    }

    if (filters?.category !== undefined) {
      query.where("project_category", filters.category);
    }

    return query.orderBy([
      { column: "display_order", order: "asc" },
      { column: "created_at", order: "desc" },
    ]);
  },

  async findById(id: string) {
    const project = await db("projects")
      .where({ id })
      .first();

    return project ?? null;
  },

  async update(
    id: string,
    data: UpdateProjectInput
  ) {
    const updateData: Record<string, unknown> = {
      updated_at: db.fn.now(),
    };

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.problem !== undefined) {
      updateData.problem = data.problem;
    }

    if (data.solution !== undefined) {
      updateData.solution = data.solution;
    }

    if (data.fullDescription !== undefined) {
      updateData.full_description = data.fullDescription;
    }

    if (data.techStack !== undefined) {
      updateData.tech_stack = data.techStack;
    }

    if (data.githubUrl !== undefined) {
      updateData.github_url = data.githubUrl;
    }

    if (data.liveDemoUrl !== undefined) {
      updateData.live_demo_url = data.liveDemoUrl;
    }

    if (data.demoVideoUrl !== undefined) {
      updateData.demo_video_url = data.demoVideoUrl;
    }

    if (data.projectCategory !== undefined) {
      updateData.project_category = data.projectCategory;
    }

    if (data.isFeatured !== undefined) {
      updateData.is_featured = data.isFeatured;
    }

    if (data.displayOrder !== undefined) {
      updateData.display_order = data.displayOrder;
    }

    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    const [project] = await db("projects")
      .where({ id })
      .update(updateData)
      .returning("*");

    return project ?? null;
  },

  async delete(id: string) {
    const [project] = await db("projects")
      .where({ id })
      .delete()
      .returning("*");

    return project ?? null;
  },
  
  // Images CRUD
  async createImage(data: CreateProjectImageInput,imageUrl: string) {
  const [image] = await db("project_images")
    .insert({
      project_id: data.projectId,
      image_url: imageUrl,
      alt_text: data.altText ?? null,
      display_order: data.displayOrder,
    })
    .returning("*");

  return image;
  },

  async findImagesByProjectId(projectId: string) {
    return db("project_images")
      .where({ project_id: projectId })
      .orderBy("display_order", "asc");

  },

  // async findImageById(id: string) {
  //   const image = await db("project_images")
  //     .where({ id })
  //     .first();

  //   return image ?? null;
  // },

  async updateImage(
    id: string,
    data: UpdateProjectImageInput) {
    const updateData: Record<string, unknown> = {};

    if (data.altText !== undefined) {
      updateData.alt_text = data.altText;
    }

    if (data.displayOrder !== undefined) {
      updateData.display_order = data.displayOrder;
    }

    const [image] = await db("project_images")
      .where({ id })
      .update(updateData)
      .returning("*");

    return image ?? null;
  },

  async deleteImage(id: string) {
    const [image] = await db("project_images")
      .where({ id })
      .delete()
      .returning("*");

    return image ?? null;
  }

};