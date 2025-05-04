import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { ResultService } from "../services/ResultService";
import { validateCreateResult } from "../schemas/ResultSchema";

export class ResultController {
  static async listAllResults(_req: Request, res: Response): Promise<any> {
    try {
      const results = await ResultService.listAllResults();
      if (results?.length === 0) return HttpResponse.notFound(res, "Result not found");

      return HttpResponse.ok(res, "Results found", results);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing results",
        error.message
      );
    }
  }

  static async getResultsByResultId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const result = await ResultService.getResultById(id as number);
      if (!result) return HttpResponse.notFound(res, "Result not found");

      return HttpResponse.ok(res, "Result found", result);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting result",
        error.message
      );
    }
  }

  static async storeResultsOnResult(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const data = req.body;

      const isInvalid = validateCreateResult(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const result = await ResultService.createResult(data);

      return HttpResponse.ok(res, "Result created", result);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating results",
        error.message
      );
    }
  }

  static async updateResult(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.resultId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const data = req.body;

      const validate = validateCreateResult(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const result = await ResultService.updateResult(id as number, data);

      return HttpResponse.ok(res, "Result updated", result);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while updating result",
        error.message
      );
    }
  }
}
