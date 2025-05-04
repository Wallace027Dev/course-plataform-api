import { IAttempt, IAttemptUpdate } from "../interfaces/IAttempt";
import { AttemptRepository } from "../repositories/AttemptRepository";

export class AttemptService {
  static async listAllAttempts(): Promise<IAttempt[] | null> {
    return await AttemptRepository.findAll();
  }
  

  static async getAttemptById(attemptId: number): Promise<IAttempt | null> {
    const attempt = await AttemptRepository.findOneById(attemptId);
    if (!attempt) throw new Error(`Attempt with id ${attemptId} not found`);

    return attempt || null;
  }

  static async createAttempt(data: any): Promise<any> {
    return await AttemptRepository.create(data);
  }

  static async updateAttempt(id: number, data: IAttemptUpdate): Promise<IAttempt | null> {
    await this.getAttemptById(id);
    
    return await AttemptRepository.update(id, data);
  }
}