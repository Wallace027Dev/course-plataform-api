import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { Roles } from "../constants/Roles";
import { HttpResponse } from "../helper/HttpResponse";

const prisma = new PrismaClient();

export function hasRole(allowedRoles: Roles[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return HttpResponse.unauthorized(res, "Token is required");
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true }
      });

      if (!user || !allowedRoles.includes(user.role as Roles)) {
        return HttpResponse.forbidden(
          res,
          ` User is not authorized for ${user?.role as Roles}`
        );
      }

      return next();
    } catch (error) {
      console.error("Erro no middleware hasAnyRole:", error);
      return HttpResponse.serverError(res, "Erro interno do servidor", error);
    }
  };
}
