import { IContent, IContentBase, IContentUpdate } from "../interfaces/IContent";
import { ContentRepository } from "../repositories/ContentRepository";

export class ContentService {
  static async listContents(type?: string, title?: string): Promise<IContent[]> {
    try {
      return await ContentRepository.findAll(type, title);
    } catch (error: any) {
      throw new Error(`Failed to list contents: ${error.message}`);
    }
  }

  static async getContentById(journeyId: number): Promise<IContent[] | null> {
    try {
      const content = await ContentRepository.listByJourneyId(journeyId);
      return content || null;
    } catch (error: any) {
      throw new Error(`Failed to get content for journey with id ${journeyId}: ${error.message}`);
    }
  }

  static async createContent(data: IContentBase): Promise<IContent> {
    try {
      return await ContentRepository.create(data);
    } catch (error: any) {
      throw new Error(`Failed to create content: ${error.message}`);
    }
  }

  static async updateContent(id: number, data: IContentUpdate): Promise<IContent | null> {
    try {
      return await ContentRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update content with id ${id}: ${error.message}`);
    }
  }
}
