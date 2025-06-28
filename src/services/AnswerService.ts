import { IAnswer, IAnswerUpdate } from "../interfaces/IAnswer";
import { AnswerRepository } from "../repositories/AnswerRepository";

export class AnswerService {
  static async listAllAnswers(): Promise<IAnswer[] | null> {
    return await AnswerRepository.findAll();
  }
  
  static async getAnswerById(answerId: number): Promise<IAnswer | null> {
    return await AnswerRepository.findOneById(answerId);
  }

  static async createAnswer(data: any): Promise<any> {
    const answer = data;

    return await AnswerRepository.create(answer);
  }

  static async updateAnswer(id: number, data: IAnswerUpdate): Promise<IAnswer | null> {
    await this.getAnswerById(id);
    
    return await AnswerRepository.update(id, data);
  }
}