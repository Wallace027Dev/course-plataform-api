import { IResult, IResultUpdate } from "../interfaces/IResult";
import { ResultRepository } from "../repositories/ResultRepository";

export class ResultService {
  static async listAllResults(): Promise<IResult[] | null> {
    try {
      return await ResultRepository.findAll();
    } catch (error: any) {
      throw new Error(`Failed to list results: ${error.message}`);
    }
  }
  

  static async getResultById(resultId: number): Promise<IResult | null> {
    try {
      const result = await ResultRepository.findOneById(resultId);
      return result || null;
    } catch (error: any) {
      throw new Error(`Failed to get result with id ${resultId}: ${error.message}`);
    }
  }

  static async createResult(data: any): Promise<any> {
    try {
      const result = data;

      return await ResultRepository.create(result);
    } catch (error: any) {
      throw new Error(`Failed to create result: ${error.message}`);
    }
  }

  static async updateResult(id: number, data: IResultUpdate): Promise<IResult | null> {
    try {
      return await ResultRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update result with id ${id}: ${error.message}`);
    }
  }
}