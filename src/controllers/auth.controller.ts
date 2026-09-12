import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import type { AuthenticatedRequest } from "../middleware/requireAuth.middleware.js";

const ACCESS_TOKEN_MAX_AGE = env.ACCESS_TOKEN_MAX_AGE;
const REFRESH_TOKEN_MAX_AGE = env.REFRESH_TOKEN_MAX_AGE;


export const authController = {
  // Signup
  async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await authService.signup(req.body);

      res.status(201).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Login
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await authService.login(req.body);

      res
        .cookie("access_token", result.accessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "none",  // make it none while production
          maxAge: ACCESS_TOKEN_MAX_AGE,
        })
        .cookie("refresh_token", result.refreshToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: REFRESH_TOKEN_MAX_AGE,
        })
        .status(200)
        .json({
          user: result.user,
        });
    } catch (error) {
      next(error);
    }
  },

  // Logout
  async logout(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res
        .clearCookie("access_token")
        .clearCookie("refresh_token")
        .status(200)
        .json({
          message: "Logged out successfully",
        });
    } catch (error) {
      next(error);
    }
  },

  // Get current user
  async getCurrentUser(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }

      const user = await authService.getCurrentUser(req.user.id);

      res.status(200).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  // Refresh access token
  async refreshAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies.refresh_token;

      if (!refreshToken) {
        throw new UnauthorizedError("Refresh token missing");
      }

      const { accessToken } =
        await authService.refreshAccessToken(refreshToken);

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: ACCESS_TOKEN_MAX_AGE,
        })
        .status(200)
        .json({
          message: "Access token refreshed successfully",
        });
    } catch (error) {
      next(error);
    }
  },

  // Reset password
  async resetPassword(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new UnauthorizedError("Authentication required");
      }

      const user = await authService.resetPassword(
        req.user.id,
        req.body
      );

      res.status(200).json({
        message: "Password reset successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};