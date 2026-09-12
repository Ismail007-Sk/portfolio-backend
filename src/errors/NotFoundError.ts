// especially for Global Error Handler
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, "NOT_FOUND", `${resource} not found`);
  }
}