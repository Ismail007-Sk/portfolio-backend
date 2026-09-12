import { z } from "zod";


const projectStatusSchema = z.enum([
  "in_progress",
  "completed",
  "archived",
]);

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Project title is required")
    .max(255, "Project title must not exceed 255 characters"),

  problem: z.string().trim().optional(),

  solution: z.string().trim().optional(),

  fullDescription: z.string().trim().optional(),

  techStack: z
    .array(z.string().trim().min(1))
    .default([]),

  githubUrl: z
    .url("Invalid GitHub URL")
    .optional(),

  liveDemoUrl: z
    .url("Invalid live demo URL")
    .optional(),

  demoVideoUrl: z
    .url("Invalid demo video URL")
    .optional(),

  projectCategory: z
    .string()
    .trim()
    .max(100, "Project category must not exceed 100 characters")
    .optional(),

  isFeatured: z.boolean().default(false),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .default(0),

  status: projectStatusSchema.default("completed")

});


export const updateProjectSchema = createProjectSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required for update",
    }
  );


export const projectIdParamSchema = z.object({
  id: z.uuid("Invalid project ID"),
});


export const getProjectsQuerySchema = z.object({
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((value) =>
      value === undefined ? undefined : value === "true"
    ),

  status: projectStatusSchema.optional(),

  category: z.string().trim().optional(),
});


// TypeScript types inferred from Zod schemas

export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>;

export type UpdateProjectInput = z.infer<
  typeof updateProjectSchema
>;

export type ProjectIdParams = z.infer<
  typeof projectIdParamSchema
>;

export type GetProjectsQuery = z.infer<
  typeof getProjectsQuerySchema
>;