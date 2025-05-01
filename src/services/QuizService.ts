import { IQuiz } from "../interfaces/IQuiz";
import { QuizRepository } from "../repositories/QuizRepository";

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
      return await QuizRepository.create(data);
    } catch (error: any) {
      throw new Error(`Failed to create quiz: ${error.message}`);
    }
  }
}