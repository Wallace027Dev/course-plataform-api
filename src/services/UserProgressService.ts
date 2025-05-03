import { IUserProgress, IUserProgressUpdate } from "../interfaces/IUserProgress";
import { UserProgressRepository } from "../repositories/UserProgressRepository";

export class UserProgressService {
  static async listAllUserProgresss(): Promise<IUserProgress[] | null> {
    try {
      return await UserProgressRepository.findAll();
    } catch (error: any) {
      throw new Error(`Failed to list userProgresss: ${error.message}`);
    }
  }
  

  static async getUserProgressById(userProgressId: number): Promise<IUserProgress | null> {
    try {
      const userProgress = await UserProgressRepository.findOneById(userProgressId);
      return userProgress || null;
    } catch (error: any) {
      throw new Error(`Failed to get userProgress with id ${userProgressId}: ${error.message}`);
    }
  }

  static async createUserProgress(data: any): Promise<any> {
    try {
      const userProgress = data;

      return await UserProgressRepository.create(userProgress);
    } catch (error: any) {
      throw new Error(`Failed to create userProgress: ${error.message}`);
    }
  }

  static async updateUserProgress(id: number, data: IUserProgressUpdate): Promise<IUserProgress | null> {
    try {
      return await UserProgressRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update userProgress with id ${id}: ${error.message}`);
    }
  }
}