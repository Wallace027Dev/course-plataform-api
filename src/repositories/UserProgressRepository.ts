import { IUserProgress, IUserProgressBase, IUserProgressUpdate } from "../interfaces/IUserProgress";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class UserProgressRepository {
  static async findAll(completedAt?: Date, userId?: number, contentId?: number): Promise<IUserProgress[]> {
    return await db.userProgress.findMany({
      where: {
        ...(completedAt && { completedAt: { equals: completedAt } }),
        ...(userId && { userId: { equals: userId } }),
        ...(contentId && { contentId: { equals: contentId } }),
        deletedAt: null
      }
    });
  }

  static async findOneById(id: number): Promise<IUserProgress | null> {
    return await db.userProgress.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static async create(data: IUserProgressBase): Promise<IUserProgress> {
    return await db.userProgress.create({
      data: {
        userId: data.userId,
        contentId: data.contentId,
        completedAt: data.completedAt,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IUserProgressUpdate): Promise<IUserProgress> {
    return await db.userProgress.update({
      where: { id },
      data: {
        userId: data.userId,
        contentId: data.contentId,
        completedAt: data.completedAt,
        deletedAt: null
      }
    });
  }
}
