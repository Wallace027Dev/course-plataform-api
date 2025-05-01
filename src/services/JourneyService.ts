import { IJourney, IJourneyBase, IJourneyUpdate } from "../interfaces/IJourney";
import { JourneyRepository } from "../repositories/JourneyRepository";

export class JourneyService {
  static async listJourneys(name?: string): Promise<IJourney[]> {
    try {
      return await JourneyRepository.findAll(name);
    } catch (error: any) {
      throw new Error(`Failed to list journeys: ${error.message}`);
    }
  }

  static async getJourneyById(journeyId: number): Promise<IJourney | null> {
    try {
      const journey = await JourneyRepository.findOneById(journeyId);
      if (!journey) return null;
      return journey;
    } catch (error: any) {
      throw new Error(`Failed to get journey with id ${journeyId}: ${error.message}`);
    }
  }

  static async createJourney(data: IJourneyBase): Promise<IJourney> {
    try {
      return await JourneyRepository.create(data);
    } catch (error: any) {
      throw new Error(`Failed to create journey: ${error.message}`);
    }
  }

  static async updateJourney(id: number, data: IJourneyUpdate): Promise<IJourney | null> {
    try {
      const updatedJourney = await JourneyRepository.update(id, data);
      if (!updatedJourney) return null;
      return updatedJourney;
    } catch (error: any) {
      throw new Error(`Failed to update journey with id ${id}: ${error.message}`);
    }
  }
}
