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

  static async getContentById(id: number): Promise<IContent | null> {
    try {
      const content = await ContentRepository.findOneById(id);
      if (!content) throw new Error(`Content with id ${id} not found`);

      return content || null;
    } catch (error: any) {
      throw new Error(`Failed to get one content with id ${id}: ${error.message}`);
    }
  }

  static async listContentsByJourneyId(journeyId: number): Promise<IContent[] | null> {
    try {
      const content = await ContentRepository.listByJourneyId(journeyId);
      return content || null;
    } catch (error: any) {
      throw new Error(`Failed to list contents of journey with journey id ${journeyId}: ${error.message}`);
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
      await this.getContentById(id);

      return await ContentRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update content with id ${id}: ${error.message}`);
    }
  }
}
