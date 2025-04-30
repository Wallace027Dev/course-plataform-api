import { IJourney, IJourneyBase, IJourneyUpdate } from "../interfaces/IJourney";
import { JourneyRepository } from "../repositories/JourneyRepository";

export class JourneyService {
  static async listJourneys(name?: string): Promise<IJourney[] | null> {
    return await JourneyRepository.findAll(name);
  }

  static async getJourneyById(journeyId: number): Promise<IJourney | null> {
    const journey = await JourneyRepository.findOneById(journeyId);
    if (!journey) return null;
    return journey;
  }

  static async createJourney(data: IJourneyBase): Promise<IJourney | null> {
    return await JourneyRepository.create(data);
  }

  static async updateJourney(
    id: number,
    data: IJourneyUpdate
  ): Promise<IJourney | null> {
    return await JourneyRepository.update(id, data);
  }
}
