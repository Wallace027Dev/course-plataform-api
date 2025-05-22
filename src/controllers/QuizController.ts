import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { QuizService } from "../services/QuizService";
import { validateCreateQuiz } from "../schemas/QuizSchema";

export class QuizController {
  static async listAllQuizzes(req: Request, res: Response): Promise<any> {
    const { name } = req.query;

    const quizzes = await QuizService.listAllQuizzes(name as string);
    if (quizzes?.length === 0) return HttpResponse.notFound(res, "Quizzes not found");

    return HttpResponse.ok(res, "Quizzes found", quizzes);
  }

  static async listQuizzesOfJourney(req: Request, res: Response): Promise<any> {
    const journeyId = parseInt(req.params.journeyId, 10);
    if (!journeyId) return HttpResponse.badRequest(res, "Invalid ID");

    const contentWithQuiz = await QuizService.listQuizzesOfJourney(journeyId);
    if (!contentWithQuiz) return HttpResponse.notFound(res, "Quizzes of journey not found");

    return HttpResponse.ok(res, "Quizzes of journey found", contentWithQuiz);
  }

  static async getQuizById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const contentWithQuiz = await QuizService.getQuizById(id);
    if (!contentWithQuiz) return HttpResponse.notFound(res, "Quizzes not found");

    return HttpResponse.ok(res, "Quizzes found", contentWithQuiz);
  }

  static async storeQuiz(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const errors = validateCreateQuiz(data);
    if (errors) return HttpResponse.badRequest(res, "Invalid data", errors);

    const newQuiz = await QuizService.createQuiz(data);
    if (!newQuiz) return HttpResponse.notFound(res, "Quiz not created");

    return HttpResponse.created(res, "Quizzes found", newQuiz);
  }

  static async updateQuiz(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const errors = validateCreateQuiz(data);
    if (errors) return HttpResponse.badRequest(res, "Invalid data", errors);

    const updatedQuiz = await QuizService.updateQuiz(id as number, data);
    if (!updatedQuiz) return HttpResponse.notFound(res, "Quiz not updated");

    return HttpResponse.ok(res, "Quizzes found", updatedQuiz);
  }

  static deleteQuiz(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}