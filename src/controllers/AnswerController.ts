import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { AnswerService } from "../services/AnswerService";
import { validateCreateAnswer } from "../schemas/AnswerSchema";

export class AnswerController {
  static async listAllAnswers(_req: Request, res: Response): Promise<any> {
    try {
      const answers = await AnswerService.listAllAnswers();
      if (answers?.length === 0) return HttpResponse.notFound(res, "Answer not found");

      return HttpResponse.ok(res, "Answers found", answers);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing answers",
        error.message
      );
    }
  }

  static async getAnswersByAnswerId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const answer = await AnswerService.getAnswerById(id as number);
      if (!answer) return HttpResponse.notFound(res, "Answer not found");

      return HttpResponse.ok(res, "Answer found", answer);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting answer",
        error.message
      );
    }
  }

  static async storeAnswersOnAnswer(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const data = req.body;

      const isInvalid = validateCreateAnswer(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const answer = await AnswerService.createAnswer(data);

      return HttpResponse.ok(res, "Answer created", answer);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating answers",
        error.message
      );
    }
  }

  static async updateAnswer(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.answerId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const data = req.body;

      const validate = validateCreateAnswer(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const answer = await AnswerService.updateAnswer(id as number, data);

      return HttpResponse.ok(res, "Answer updated", answer);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while updating answer",
        error.message
      );
    }
  }
}
