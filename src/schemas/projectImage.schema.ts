import { z } from "zod";

export const createProjectImageSchema = z.object({
  projectId: z.uuid("Invalid project ID"),

  altText: z
    .string()
    .trim()
    .max(255, "Alt text must not exceed 255 characters")
    .optional(),

  displayOrder: z
    .coerce
    .number()
    .int()
    .min(0)
    .default(0),
});


export const updateProjectImageSchema = createProjectImageSchema
  .omit({
    projectId: true,
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required for update",
    }
  );


export const projectImageIdParamSchema = z.object({
  id: z.uuid("Invalid project image ID"),
});


export type CreateProjectImageInput = z.infer<
  typeof createProjectImageSchema
>;

export type UpdateProjectImageInput = z.infer<
  typeof updateProjectImageSchema
>;

export type ProjectImageIdParams = z.infer<
  typeof projectImageIdParamSchema
>;