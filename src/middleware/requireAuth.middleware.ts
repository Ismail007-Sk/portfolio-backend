import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    throw new UnauthorizedError("Access token missing");
  }

  try {
    const payload = verifyAccessToken(accessToken) as {
      userId: string;
    };

    req.user = {
      id: payload.userId,
    };

    next();
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }
}
