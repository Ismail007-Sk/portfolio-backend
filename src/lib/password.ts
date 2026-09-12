import bcrypt from "bcrypt";
import { env } from "../config/env.js";

const SALT_ROUNDS = env.BCRYPT_SALT_ROUNDS;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}