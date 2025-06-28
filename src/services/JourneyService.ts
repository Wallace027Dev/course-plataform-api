import { IJourney, IJourneyBase, IJourneyUpdate } from "../interfaces/IJourney";
import { JourneyRepository } from "../repositories/JourneyRepository";

export class JourneyService {
  static async listJourneys(name?: string): Promise<IJourney[]> {
    return await JourneyRepository.findAll(name);
  }

  static async listJourneysOfCourse(courseId: number): Promise<IJourney[] | null> {
    const journeys = await JourneyRepository.findAllByCourseId(courseId);
    if (!journeys) return [];
    
    return  journeys || null;
  }

  static async getJourneyById(journeyId: number): Promise<IJourney | null> {
    return await JourneyRepository.findOneById(journeyId);
  }

  static async createJourney(data: IJourneyBase): Promise<IJourney> {
    return await JourneyRepository.create(data);
  }

  static async updateJourney(id: number, data: IJourneyUpdate): Promise<IJourney | null> {
    await JourneyService.getJourneyById(id);
    return await JourneyRepository.update(id, data);
  }
}
