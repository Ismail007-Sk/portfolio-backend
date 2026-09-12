import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../errors/ValidationError.js";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      next(new ValidationError(message));
      return;
    }

    next();
  };