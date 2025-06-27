import { IContent, IContentBase, IContentUpdate } from "../interfaces/IContent";
import { Prisma, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class ContentRepository {
  static async findAll(type?: string, title?: string): Promise<IContent[]> {
    return await db.content.findMany({
      where: {
        deletedAt: null,
        ...(type && { type: { contains: type } }),
        ...(title && { title: { contains: title } }),
      }
    });
  }

  static async findOneById(id: number): Promise<IContent | null> {
    return await db.content.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static async listByJourneyId(journeyId: number): Promise<IContent[] | null> {
    return await db.content.findMany({
      where: { journeyId, deletedAt: null }
    });
  }

  static async findOneByIdWithStudents(id: number): Promise<IContent | null> {
    return await db.content.findUnique({
      where: { id, deletedAt: null }
    });
  }

  static async create(data: IContentBase): Promise<IContent> {
    return await db.content.create({
      data: {
        journeyId: data.journeyId,
        type: data.type,
        title: data.title,
        order: data.order,
        metadata: data.metadata ?? Prisma.JsonNull,
        quizId: data.quizId,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IContentUpdate): Promise<IContent> {
    return await db.content.update({
      where: { id },
      data: {
        journeyId: data.journeyId,
        type: data.type,
        title: data.title,
        order: data.order,
        metadata: data.metadata ?? Prisma.JsonNull,
        quizId: data.quizId,
        deletedAt: data.deletedAt ?? null
      }
    });
  }
}
