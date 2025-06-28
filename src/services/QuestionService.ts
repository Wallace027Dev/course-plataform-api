import { IQuestion } from "../interfaces/IQuestion";
import { QuestionRepository } from "../repositories/QuestionRepository";
import { QuizService } from "./QuizService";

export class QuestionService {
  static async listAllQuestions(listAllQuestions?: string): Promise<IQuestion[] | null> {
    return await QuestionRepository.findAll(listAllQuestions);
  }

  static async getQuestionById(questionId: number): Promise<IQuestion | null> {
    return await QuestionRepository.findOneById(questionId);
  }

  static async createQuestion(data: IQuestion): Promise<any> {
    const quiz = await QuizService.getQuizById(data.quizId);
    if (!quiz) throw new Error(`Quiz with id ${data.quizId} not found`);

    const newQuestion = await QuestionRepository.create(data);

    await QuizService.updateQuiz(quiz.id, { questions: [data, newQuestion] });

    return newQuestion;
  }

  static async updateQuestion(id: number, data: IQuestion): Promise<IQuestion | null> {
    await this.getQuestionById(id);

    return await QuestionRepository.update(id, data);
  }
}