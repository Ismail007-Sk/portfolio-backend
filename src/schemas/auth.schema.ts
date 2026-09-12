import { z } from "zod";

// Signup
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
     /[^A-Za-z0-9]/,
     "Password must contain at least one special character"
  ),
});

// Login
export const loginSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

// Reset password
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

// Inferred TypeScript types
export type SignupInput = z.infer<typeof signupSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;