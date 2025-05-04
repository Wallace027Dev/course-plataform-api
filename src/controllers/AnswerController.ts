import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { AttemptService } from "../services/AttemptService";
import { validateCreateAttempt } from "../schemas/AttemptSchema";

export class AttemptController {
  static async listAllAttempts(_req: Request, res: Response): Promise<any> {
    const attempts = await AttemptService.listAllAttempts();
    if (attempts?.length === 0) return HttpResponse.notFound(res, "Attempt not found");

    return HttpResponse.ok(res, "Attempts found", attempts);
  }

  static async getAttemptsByAttemptId(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.journeyId, 10);
    if (!id) return HttpResponse.badRequest(res, "Invalid ID");

    const attempt = await AttemptService.getAttemptById(id as number);
    if (!attempt) return HttpResponse.notFound(res, "Attempt not found");

    return HttpResponse.ok(res, "Attempt found", attempt);
  }

  static async storeAttemptsOnAttempt(req: Request,res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateAttempt(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const attempt = await AttemptService.createAttempt(data);

    return HttpResponse.ok(res, "Attempt created", attempt);
  }

  static async updateAttempt(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.attemptId, 10);
    if (!id) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateCreateAttempt(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const attempt = await AttemptService.updateAttempt(id as number, data);

    return HttpResponse.ok(res, "Attempt updated", attempt);
  }

  static deleteAnswer(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
