import { authRepository } from "../repositories/auth.repository.js";
import {
  hashPassword,
  comparePassword,
} from "../lib/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type {
  SignupInput,
  LoginInput,
  ResetPasswordInput
} from "../schemas/auth.schema.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { ConflictError } from "../errors/ConflictError.js";



export const authService = {
  // Signup
  async signup(data: SignupInput) {
    const existingUser = await authRepository.findByName(data.name);

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const passwordHash = await hashPassword(data.password);

    const user = await authRepository.create(
      data.name,
      passwordHash
    );

    return {
      id: user.id,
      name: user.name,
    };
  },

  // Login
  async login(data: LoginInput) {
    const user = await authRepository.findByName(data.name);

    if (!user) {
      throw new UnauthorizedError("Invalid name or password");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid name or password");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  },

  // Get current user
  async getCurrentUser(userId: string) {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user.id,
      name: user.name,
    };
  },

  // Refresh access token
  async refreshAccessToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken) as {
      userId: string;
    };

    const accessToken = generateAccessToken(decoded.userId);

    return {
      accessToken,
    };
  },

  // Reset password
  async resetPassword(
    userId: string,
    data: ResetPasswordInput
  ) {
    const passwordHash = await hashPassword(data.password);

    const user = await authRepository.updatePassword(
      userId,
      passwordHash
    );

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user.id,
      name: user.name,
    };
  },
};