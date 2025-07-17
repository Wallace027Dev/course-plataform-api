import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { HttpResponse } from "../helper/HttpResponse";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      userEmail?: string;
    }
  }
}

export function authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return HttpResponse.unauthorized(res, "Token is required");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return HttpResponse.unauthorized(res, "Token malformatted");
  }

  const token = parts[1];

  try {
    const payload = verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    req.userId = payload.id;
    req.userEmail = payload.email;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return HttpResponse.unauthorized(res, "Token expired");
    }
    return HttpResponse.unauthorized(res, "Token unauthorized");
  }
}
