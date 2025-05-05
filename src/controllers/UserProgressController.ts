import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { UserProgressService } from "../services/UserProgressService";
import { validateCreateUserProgress } from "../schemas/UserProgressSchema";

export class UserProgressController {
  static async listAllUserProgresss(_req: Request, res: Response): Promise<any> {
    const userProgresss = await UserProgressService.listAllUserProgresss();
    if (userProgresss?.length === 0) return HttpResponse.notFound(res, "UserProgress not found");

    return HttpResponse.ok(res, "UserProgresss found", userProgresss);
  }

  static async getUserProgressById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const userProgress = await UserProgressService.getUserProgressById(id as number);
    if (!userProgress) return HttpResponse.notFound(res, "UserProgress not found");

    return HttpResponse.ok(res, "UserProgress found", userProgress);
  }

static async storeUserProgress(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateUserProgress(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const userProgress = await UserProgressService.createUserProgress(data);

    return HttpResponse.ok(res, "UserProgress created", userProgress);
  }

  static async updateUserProgress(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const validate = validateCreateUserProgress(data);
    if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

    const userProgress = await UserProgressService.updateUserProgress(id as number, data);

    return HttpResponse.ok(res, "UserProgress updated", userProgress);
  }

  static deleteUserProgress(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
