import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { ResultService } from "../services/ResultService";
import { validateCreateResult } from "../schemas/ResultSchema";

export class ResultController {
  static async listAllResults(_req: Request, res: Response): Promise<any> {
    const results = await ResultService.listAllResults();
    if (results?.length === 0) return HttpResponse.notFound(res, "Result not found");

    return HttpResponse.ok(res, "Results found", results);
  }

  static async getResultById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const result = await ResultService.getResultById(id as number);
    if (!result) return HttpResponse.notFound(res, "Result not found");

    return HttpResponse.ok(res, "Result found", result);
  }

static async storeResult(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateResult(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const result = await ResultService.createResult(data);

    return HttpResponse.created(res, "Result created", result);
  }

  static async updateResult(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const validate = validateCreateResult(data);
    if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

    const result = await ResultService.updateResult(id as number, data);

    return HttpResponse.ok(res, "Result updated", result);
  }

  static deleteResult(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
