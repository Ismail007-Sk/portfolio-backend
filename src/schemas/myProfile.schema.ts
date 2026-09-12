import { z } from "zod";


// =================================
// My Profile
// =================================


const availabilityStatusSchema = z.enum([
  "available_for_jobs",
  "available_for_freelance",
  "available_for_both",
  "not_available",
]);

export const createMyProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),

  headline: z.string().max(255).optional(),

  bio: z.string().optional(),
  aboutMe: z.string().optional(),

  email: z.email("Invalid email address"),

  phoneNumber: z.string().max(50).optional(),

  linkedinUrl: z.url("Invalid LinkedIn URL").optional(),
  githubUrl: z.url("Invalid GitHub URL").optional(),


  availabilityStatus: availabilityStatusSchema.default("available_for_jobs"),
});

export const updateMyProfileSchema =
  createMyProfileSchema.partial();

export const myProfileIdParamSchema = z.object({
  id: z.uuid("Invalid profile ID"),
});

export type CreateMyProfileInput = z.infer<
  typeof createMyProfileSchema
>;

export type UpdateMyProfileInput = z.infer<
  typeof updateMyProfileSchema
>;

export type MyProfileIdParams = z.infer<
  typeof myProfileIdParamSchema
>;



// =================================
// Skills
// =================================
const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Skill category is required"),
});

export const createSkillSchema = skillSchema;

export const updateSkillSchema = skillSchema.partial();

export const skillIdParamSchema = z.object({
  id: z.uuid("Invalid skill ID"),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;

export type UpdateSkillInput = z.infer<typeof updateSkillSchema>;

export type SkillIdParams = z.infer<typeof skillIdParamSchema>;



// =================================
// Experience
// =================================
const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  employmentType: z.string().trim().min(1).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().nullable().optional(),
  isCurrent: z.coerce.boolean().default(false),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  displayOrder: z.coerce.number().int().min(0).default(0),
  workStatus: z.enum(["remote", "offline", "hybrid"]).optional(),
  responsibilities: z.array(z.string()).default([]),
});

export const createExperienceSchema = experienceSchema;

export const updateExperienceSchema = experienceSchema.partial();

export const experienceIdParamSchema = z.object({
  id: z.uuid("Invalid experience ID"),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;

export type ExperienceIdParams = z.infer<typeof experienceIdParamSchema>;



// =================================
// Education
// =================================
const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

export const createEducationSchema = educationSchema;

export const updateEducationSchema = educationSchema.partial();

export const educationIdParamSchema = z.object({
  id: z.uuid("Invalid education ID"),
});

export type CreateEducationInput = z.infer<typeof createEducationSchema>;

export type UpdateEducationInput = z.infer<typeof updateEducationSchema>;

export type EducationIdParams = z.infer<typeof educationIdParamSchema>;



// =================================
// Certification
// =================================
const certificationSchema = z.object({
  title: z.string().min(1, "Certification title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  certificateType: z.string().optional(),
  issuerIconUrl: z.string().url("Invalid issuer icon URL").optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

export const createCertificationSchema = certificationSchema;

export const updateCertificationSchema = certificationSchema.partial();

export const certificationIdParamSchema = z.object({
  id: z.uuid("Invalid certification ID"),
});

export type CreateCertificationInput = z.infer<
  typeof createCertificationSchema
>;

export type UpdateCertificationInput = z.infer<
  typeof updateCertificationSchema
>;

export type CertificationIdParams = z.infer<
  typeof certificationIdParamSchema
>;



// =================================
// Achievement
// =================================
const achievementSchema = z.object({
  title: z.string().min(1, "Achievement title is required"),
  category: z.string().optional(),
  issuer: z.string().optional(),
  achievementDate: z.string().optional(),
  description: z.string().optional(),
  achievementUrl: z.url("Invalid achievement URL").optional(),
  iconUrl: z.string().url("Invalid icon URL").optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

export const createAchievementSchema = achievementSchema;

export const updateAchievementSchema = achievementSchema.partial();

export const achievementIdParamSchema = z.object({
  id: z.uuid("Invalid achievement ID"),
});

export type CreateAchievementInput = z.infer<
  typeof createAchievementSchema
>;

export type UpdateAchievementInput = z.infer<
  typeof updateAchievementSchema
>;

export type AchievementIdParams = z.infer<
  typeof achievementIdParamSchema
>;



// =================================
// Service
// =================================
const serviceTitleSchema = z.enum([
  "fullstack",
  "frontend",
  "backend",
  "aiml",
  "other",
]);

const serviceSchema = z.object({
  title: serviceTitleSchema,
  description: z.string().min(1, "Service description is required"),
  displayOrder: z.coerce.number().int().min(0).default(0),
  services: z.array(z.string()).default([]),
});

export const createServiceSchema = serviceSchema;

export const updateServiceSchema = serviceSchema.partial();

export const serviceIdParamSchema = z.object({
  id: z.uuid("Invalid service ID"),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

export type ServiceIdParams = z.infer<typeof serviceIdParamSchema>;