import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

const JWT_ACCESS_SECRET = env.JWT_ACCESS_SECRET;

const ACCESS_TOKEN_EXPIRES_IN =
  env.ACCESS_TOKEN_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>;

const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;

const REFRESH_TOKEN_EXPIRES_IN =
  env.REFRESH_TOKEN_EXPIRES_IN as NonNullable<SignOptions["expiresIn"]>;

export function generateAccessToken(userId: string): string {
  return jwt.sign(
    { userId },
    JWT_ACCESS_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}