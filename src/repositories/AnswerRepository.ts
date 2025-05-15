import { IAnswer, IAnswerBase, IAnswerUpdate } from "../interfaces/IAnswer";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class AnswerRepository {
  static async findAll(text?: string, correct?: boolean): Promise<IAnswer[]> {
    return await db.answer.findMany({
      where: {
        ...(text && { text: { contains: text } }),
        ...(correct && { correct }),
        deletedAt: null
      }
    });
  }

  static async findOneById(id: number): Promise<IAnswer | null> {
    return await db.answer.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static async create(data: IAnswerBase): Promise<IAnswer> {
    return await db.answer.create({
      data: {
        text: data.text,
        correct: data.correct,
        questionId: data.questionId,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IAnswerUpdate): Promise<IAnswer> {
    return await db.answer.update({
      where: { id },
      data: {
        text: data.text,
        correct: data.correct,
        questionId: data.questionId,
        deletedAt: data.deletedAt ?? null
      }
    });
  }
}
