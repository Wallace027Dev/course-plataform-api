import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { AttemptService } from "../services/AttemptService";
import { validateCreateAttempt } from "../schemas/AttemptSchema";

export class AttemptController {
  static async listAllAttempts(_req: Request, res: Response): Promise<any> {
    try {
      const attempts = await AttemptService.listAllAttempts();
      if (attempts?.length === 0) return HttpResponse.notFound(res, "Attempt not found");

      return HttpResponse.ok(res, "Attempts found", attempts);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing attempts",
        error.message
      );
    }
  }

  static async getAttemptsByAttemptId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const attempt = await AttemptService.getAttemptById(id as number);
      if (!attempt) return HttpResponse.notFound(res, "Attempt not found");

      return HttpResponse.ok(res, "Attempt found", attempt);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting attempt",
        error.message
      );
    }
  }

  static async storeAttemptsOnAttempt(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const data = req.body;

      const isInvalid = validateCreateAttempt(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const attempt = await AttemptService.createAttempt(data);

      return HttpResponse.ok(res, "Attempt created", attempt);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating attempts",
        error.message
      );
    }
  }

  static async updateAttempt(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.attemptId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const data = req.body;

      const validate = validateCreateAttempt(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const attempt = await AttemptService.updateAttempt(id as number, data);

      return HttpResponse.ok(res, "Attempt updated", attempt);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while updating attempt",
        error.message
      );
    }
  }
}
