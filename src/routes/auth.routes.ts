import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/requireAuth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  signupSchema,
  loginSchema,
  resetPasswordSchema
} from "../schemas/auth.schema.js";
import z from "zod";

export const authRouter = Router();

// Public routes
authRouter.post("/signup",validate(z.object({body:signupSchema})),authController.signup);
authRouter.post("/login",validate(z.object({body:loginSchema})),authController.login);
authRouter.post("/logout",authController.logout);

// Refresh access token
authRouter.post("/refresh",authController.refreshAccessToken);

// Protected route
authRouter.get("/me",requireAuth,authController.getCurrentUser);

// Reset password route
authRouter.post("/reset-password",requireAuth,validate(z.object({body: resetPasswordSchema})),authController.resetPassword);