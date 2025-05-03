import { IAnswer, IAnswerUpdate } from "../interfaces/IAnswer";
import { AnswerRepository } from "../repositories/AnswerRepository";

export class AnswerService {
  static async listAllAnswers(): Promise<IAnswer[] | null> {
    try {
      return await AnswerRepository.findAll();
    } catch (error: any) {
      throw new Error(`Failed to list answers: ${error.message}`);
    }
  }
  

  static async getAnswerById(answerId: number): Promise<IAnswer | null> {
    try {
      const answer = await AnswerRepository.findOneById(answerId);
      return answer || null;
    } catch (error: any) {
      throw new Error(`Failed to get answer with id ${answerId}: ${error.message}`);
    }
  }

  static async createAnswer(data: any): Promise<any> {
    try {
      const answer = data;

      return await AnswerRepository.create(answer);
    } catch (error: any) {
      throw new Error(`Failed to create answer: ${error.message}`);
    }
  }

  static async updateAnswer(id: number, data: IAnswerUpdate): Promise<IAnswer | null> {
    try {
      return await AnswerRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update answer with id ${id}: ${error.message}`);
    }
  }
}