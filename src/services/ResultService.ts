import { IResult, IResultUpdate } from "../interfaces/IResult";
import { ResultRepository } from "../repositories/ResultRepository";

export class ResultService {
  static async listAllResults(): Promise<IResult[] | null> {
    return await ResultRepository.findAll();
  }
  

  static async getResultById(resultId: number): Promise<IResult | null> {
    const result = await ResultRepository.findOneById(resultId);
    if (!result) throw new Error(`Result with id ${resultId} not found`);
    
    return result || null;
  }

  static async createResult(data: any): Promise<any> {
    return await ResultRepository.create(data);
  }

  static async updateResult(id: number, data: IResultUpdate): Promise<IResult | null> {
    await ResultService.getResultById(id);

    return await ResultRepository.update(id, data);
  }
}