import { IQuiz } from "../interfaces/IQuiz";
import { QuizRepository } from "../repositories/QuizRepository";
import { ContentService } from "./ContentService";

export class QuizService {
  static async listAllQuizzes(listAllQuizzes?: string): Promise<IQuiz[] | null> {
    try {
      return await QuizRepository.findAll(listAllQuizzes);
    } catch (error: any) {
      throw new Error(`Failed to list quizzes: ${error.message}`);
    }
  }
  static async listQuizzesOfJourney(journeyId: number): Promise<IQuiz[] | null> {
    try {
      return await QuizRepository.findAllByJourneyId(journeyId);
    } catch (error: any) {
      throw new Error(`Failed to list quizzes: ${error.message}`);
    }
  }

  static async getQuizById(quizId: number): Promise<IQuiz | null> {
    try {
      const quiz = await QuizRepository.findOneById(quizId);
      return quiz || null;
    } catch (error: any) {
      throw new Error(`Failed to get quiz with id ${quizId}: ${error.message}`);
    }
  }

  static async createQuiz(data: any): Promise<any> {
    try {
      const { contentId, ...quizData } = data;

      // Verificar se o Content com o contentId existe
      if (contentId) await ContentService.getContentById(contentId);

      const newQuiz = await QuizRepository.create(quizData, contentId);

      // Se contentId foi fornecido, atualizar o Content com o tipo "quiz"
      if (contentId) await ContentService.updateContent(contentId, { type: "quiz" });

      return newQuiz;
    } catch (error: any) {
      throw new Error(`Failed to create quiz: ${error.message}`);
    }
  }
}