import { IAttempt, IAttemptUpdate } from "../interfaces/IAttempt";
import { AttemptRepository } from "../repositories/AttemptRepository";

export class AttemptService {
  static async listAllAttempts(): Promise<IAttempt[] | null> {
    try {
      return await AttemptRepository.findAll();
    } catch (error: any) {
      throw new Error(`Failed to list attempts: ${error.message}`);
    }
  }
  

  static async getAttemptById(attemptId: number): Promise<IAttempt | null> {
    try {
      const attempt = await AttemptRepository.findOneById(attemptId);
      return attempt || null;
    } catch (error: any) {
      throw new Error(`Failed to get attempt with id ${attemptId}: ${error.message}`);
    }
  }

  static async createAttempt(data: any): Promise<any> {
    try {
      const attempt = data;

      return await AttemptRepository.create(attempt);
    } catch (error: any) {
      throw new Error(`Failed to create attempt: ${error.message}`);
    }
  }

  static async updateAttempt(id: number, data: IAttemptUpdate): Promise<IAttempt | null> {
    try {
      return await AttemptRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update attempt with id ${id}: ${error.message}`);
    }
  }
}