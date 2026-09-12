import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "3001",
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: process.env.NODE_ENV || "development",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS ?? 12),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m',
  ACCESS_TOKEN_MAX_AGE:Number(process.env.ACCESS_TOKEN_MAX_AGE!),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
  REFRESH_TOKEN_MAX_AGE:Number(process.env.REFRESH_TOKEN_MAX_AGE!),
  CORS_ORIGINS: (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(',').map((s) => s.trim()),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};