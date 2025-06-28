import { IQuiz, IQuizUpdate } from "../interfaces/IQuiz";
import { QuizRepository } from "../repositories/QuizRepository";
import { ContentService } from "./ContentService";

export class QuizService {
  static async listAllQuizzes(listAllQuizzes?: string): Promise<IQuiz[] | null> {
      return await QuizRepository.findAll(listAllQuizzes);
  }
  
  static async listQuizzesOfJourney(journeyId: number): Promise<IQuiz[] | null> {
    const quizzes = await QuizRepository.findAllByJourneyId(journeyId);
    if (!quizzes) return [];

    return quizzes;
  }

  static async getQuizById(quizId: number): Promise<IQuiz | null> {
    return await QuizRepository.findOneById(quizId);
  }

  static async createQuiz(data: any): Promise<any> {
    const { contentId, ...quizData } = data;

    // Verificar se o Content com o contentId existe
    if (contentId) await ContentService.getContentById(contentId);

    // Criar o Quiz
    const newQuiz = await QuizRepository.create(quizData, contentId);

    // Se contentId foi fornecido, atualizar o Content com o tipo "quiz"
    if (contentId) await ContentService.updateContent(contentId, { type: "quiz" });

    return newQuiz;
  }

  static async updateQuiz(id: number, data: IQuizUpdate): Promise<IQuiz | null> {
    await this.getQuizById(id); 

    return await QuizRepository.update(id, data);
  }
}