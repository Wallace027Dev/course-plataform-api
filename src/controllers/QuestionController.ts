import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { QuestionService } from "../services/QuestionService";
import { validateCreateQuestion } from "../schemas/QuestionSchema";

export class QuestionController {
  static async listAllQuestions(_req: Request, res: Response): Promise<any> {
    try {
      const questions = await QuestionService.listAllQuestions();
      if (questions?.length === 0) return HttpResponse.notFound(res, "Question not found");

      return HttpResponse.ok(res, "Questions found", questions);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing questions",
        error.message
      );
    }
  }

  static async getQuestionsByQuestionId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const question = await QuestionService.getQuestionById(id as number);
      if (!question) return HttpResponse.notFound(res, "Question not found");

      return HttpResponse.ok(res, "Question found", question);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting question",
        error.message
      );
    }
  }

  static async storeQuestionsOnQuestion(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const data = req.body;

      const isInvalid = validateCreateQuestion(data);
      if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

      const question = await QuestionService.createQuestion(data);

      return HttpResponse.ok(res, "Question created", question);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating questions",
        error.message
      );
    }
  }

  static async updateQuestion(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.questionId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const data = req.body;

      const validate = validateCreateQuestion(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const question = await QuestionService.updateQuestion(id as number, data);

      return HttpResponse.ok(res, "Question updated", question);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while updating question",
        error.message
      );
    }
  }
}
