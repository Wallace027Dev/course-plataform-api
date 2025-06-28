import { IContent, IContentBase, IContentUpdate } from "../interfaces/IContent";
import { ContentRepository } from "../repositories/ContentRepository";

export class ContentService {
  static async listContents(type?: string, title?: string): Promise<IContent[]> {
    return await ContentRepository.findAll(type, title);
  }

  static async getContentById(id: number): Promise<IContent | null> {
    return await ContentRepository.findOneById(id);
  }

  static async listContentsByJourneyId(journeyId: number): Promise<IContent[] | null> {
    const content = await ContentRepository.listByJourneyId(journeyId);
    return content || null;
  }

  static async createContent(data: IContentBase): Promise<IContent> {
    return await ContentRepository.create(data);
  }

  static async updateContent(id: number, data: IContentUpdate): Promise<IContent | null> {
    await this.getContentById(id);

    return await ContentRepository.update(id, data);
  }
}
