import { IQuestion } from "../interfaces/IQuestion";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuizService } from "./QuizService";

export class QuestionService {
  static async listAllQuestions(listAllQuestions?: string): Promise<IQuestion[] | null> {
    try {
      return await QuestionRepository.findAll(listAllQuestions);
    } catch (error: any) {
      throw new Error(`Failed to list questions: ${error.message}`);
    }
  }

  static async getQuestionById(questionId: number): Promise<IQuestion | null> {
    try {
      const question = await QuestionRepository.findOneById(questionId);
      return question || null;
    } catch (error: any) {
      throw new Error(`Failed to get question with id ${questionId}: ${error.message}`);
    }
  }

  static async createQuestion(data: IQuestion): Promise<any> {
    try {
      const quiz = await QuizService.getQuizById(data.quizId);
      if (!quiz) throw new Error(`Quiz with id ${data.quizId} not found`);

      const newQuestion = await QuestionRepository.create(data);

      await QuizService.updateQuiz(quiz.id, { questions: [data, newQuestion] });

      return newQuestion;
    } catch (error: any) {
      throw new Error(`Failed to create question: ${error.message}`);
    }
  }

  static async updateQuestion(id: number, data: IQuestion): Promise<IQuestion | null> {
    try {
      const question = await QuestionService.getQuestionById(id);
      if (!question) throw new Error(`Question with id ${id} not found`);

      return await QuestionRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update question with id ${id}: ${error.message}`);
    }
  }
}