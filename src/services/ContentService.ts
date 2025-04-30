import { IContent, IContentBase, IContentUpdate } from "../interfaces/IContent";
import { ContentRepository } from "../repositories/ContentRepository";

export class ContentService {
  static async listContents(type?: string, title?: string): Promise<IContent[] | null> {
    return await ContentRepository.findAll(type, title);
  }

  static async getContentById(journeyId: number): Promise<IContent[] | null> {
    const content = await ContentRepository.findOneById(journeyId);
    if (!content) return null;
    return content;
  }

  static async createContent(data: IContentBase): Promise<IContent | null> {
    return await ContentRepository.create(data);
  }

  static async updateContent(
    id: number,
    data: IContentUpdate
  ): Promise<IContent | null> {
    return await ContentRepository.update(id, data);
  }
}
