import { IResult, IResultBase, IResultUpdate } from "../interfaces/IResult";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class ResultRepository {
  static async findAll(score?: number): Promise<IResult[]> {
    return await db.result.findMany({
      where: {
        ...(score && { score: { equals: score } }),
        deletedAt: null
      }
    });
  }

  static async findOneById(id: number): Promise<IResult | null> {
    return await db.result.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static async create(data: IResultBase): Promise<IResult> {
    return await db.result.create({
      data: {
        feedback: data.feedback,
        score: data.score,
        attemptId: data.attemptId,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IResultUpdate): Promise<IResult> {
    return await db.result.update({
      where: { id },
      data: {
        feedback: data.feedback,
        score: data.score,
        attemptId: data.attemptId,
        deletedAt: null
      }
    });
  }
}
