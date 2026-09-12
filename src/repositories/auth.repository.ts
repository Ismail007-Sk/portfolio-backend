import { db } from "../config/database.js";

export const authRepository = {
  // Create user
  async create(name: string, passwordHash: string) {
    const [user] = await db("users")
      .insert({
        name,
        password_hash: passwordHash,
      })
      .returning(["id", "name", "password_hash"]);

    return user;
  },

  // Find user by name
  async findByName(name: string) {
    const user = await db("users")
      .where({ name })
      .first();

    return user ?? null;
  },

  // Find user by ID
  async findById(id: string) {
    const user = await db("users")
      .where({ id })
      .first();

    return user ?? null;
  },

  // Reset password
  async updatePassword(
    userId: string,
    passwordHash: string
  ) {
    const user = await db("users")
      .where({ id: userId })
      .update({
        password_hash: passwordHash,
      })
      .returning(["id", "name"]);

    return user[0] ?? null;
  },

};