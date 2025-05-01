import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { QuizService } from "../services/QuizService";

export class QuizController {
  static async listAllQuizzes(req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.query;
      console.log(name)

      const quizzes = await QuizService.listAllQuizzes(name as string);
      if (quizzes?.length === 0) return HttpResponse.notFound(res, "Quizzes not found");
  
      return HttpResponse.ok(res, "Quizzes found", quizzes);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating user",
        error.message
      );
    }
  }

  static async listQuizzesOfJourney(req: Request, res: Response): Promise<any> {
    try {
      const journeyId = parseInt(req.params.journeyId, 10);
      if (!journeyId) return HttpResponse.badRequest(res, "Invalid ID");
  
      const contentWithQuiz = await QuizService.listQuizzesOfJourney(journeyId);
      if (!contentWithQuiz) return HttpResponse.notFound(res, "Quizzes of journey not found");
  
      return HttpResponse.ok(res, "Quizzes of journey found", contentWithQuiz);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating user",
        error.message
      );
    }
  }

  static async getQuizById(req: Request, res: Response): Promise<any> {
    try {
      const quizId = parseInt(req.params.id, 10);
      if (!quizId) return HttpResponse.badRequest(res, "Invalid ID");
  
      const contentWithQuiz = await QuizService.getQuizById(quizId);
      if (!contentWithQuiz) return HttpResponse.notFound(res, "Quizzes not found");
  
      return HttpResponse.ok(res, "Quizzes found", contentWithQuiz);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating user",
        error.message
      );
    }
  }
  static store() {}
}