import { IUserProgress, IUserProgressUpdate } from "../interfaces/IUserProgress";
import { UserProgressRepository } from "../repositories/UserProgressRepository";

export class UserProgressService {
  static async listAllUserProgresss(): Promise<IUserProgress[] | null> {
    return await UserProgressRepository.findAll();
  }
  
  static async getUserProgressById(userProgressId: number): Promise<IUserProgress | null> {
    return await UserProgressRepository.findOneById(userProgressId);
  }

  static async createUserProgress(data: any): Promise<any> {
    return await UserProgressRepository.create(data);
  }

  static async updateUserProgress(id: number, data: IUserProgressUpdate): Promise<IUserProgress | null> {
    return await UserProgressRepository.update(id, data);
  }
}