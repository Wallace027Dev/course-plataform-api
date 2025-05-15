import { IAttempt, IAttemptBase, IAttemptUpdate } from "../interfaces/IAttempt";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class AttemptRepository {
  static async findAll(): Promise<IAttempt[]> {
    return await db.attempt.findMany({
      where: {
        deletedAt: null
      }
    });
  }

  static async findOneById(id: number): Promise<IAttempt | null> {
    return await db.attempt.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static async create(data: IAttemptBase): Promise<IAttempt> {
    return await db.attempt.create({
      data: {
        userId: data.userId,
        quizId: data.quizId,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IAttemptUpdate): Promise<IAttempt> {
    return await db.attempt.update({
      where: { id },
      data: {
        userId: data.userId,
        quizId: data.quizId,
        deletedAt: data.deletedAt ?? null
      }
    });
  }
}
