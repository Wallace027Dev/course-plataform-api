import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { AnswerService } from "../services/AnswerService";
import { validateCreateAnswer, validateUpdateAnswer } from "../schemas/AnswerSchema";

export class AnswerController {
  static async listAllAnswers(_req: Request, res: Response): Promise<any> {
    const answers = await AnswerService.listAllAnswers();
    if (answers?.length === 0) return HttpResponse.notFound(res, "Answer not found");

    return HttpResponse.ok(res, "Answers found", answers);
  }

  static async getAnswersById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const answer = await AnswerService.getAnswerById(id as number);
    if (!answer) return HttpResponse.notFound(res, "Answer not found");

    return HttpResponse.ok(res, "Answer found", answer);
  }

  static async storeAnswer(req: Request,res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateAnswer(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const answer = await AnswerService.createAnswer(data);

    return HttpResponse.created(res, "Answer created", answer);
  }

  static async updateAnswer(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateUpdateAnswer(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const answer = await AnswerService.updateAnswer(id as number, data);

    return HttpResponse.ok(res, "Answer updated", answer);
  }

  static deleteAnswer(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
