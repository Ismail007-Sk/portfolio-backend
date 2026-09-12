import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(403, "FORBIDDEN", message);
  }
}