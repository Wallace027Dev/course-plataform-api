import { IQuestion, IQuestionBase, IQuestionUpdate } from "../interfaces/IQuestion";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class QuestionRepository {
  static async findAll(question?: string, explication?: string): Promise<IQuestion[]> {
    return await db.question.findMany({
      where: {
        ...(question && { question: { contains: question } }),
        ...(explication && { explication: { contains: explication } }),
        deletedAt: null
      },
      include: {
        answers: true
      }
    });
  }

  static async findOneById(id: number): Promise<IQuestion | null> {
    return await db.question.findFirst({
      where: {
        id,
        deletedAt: null
      },
      include: {
        answers: true
      }
    });
  }

  static async create(data: IQuestionBase): Promise<IQuestion> {
    const question = await db.question.create({
      data: {
        question: data.question,
        explication: data.explication,
        quizId: data.quizId,
        deletedAt: null
      }
    });

    return { ...question, answers: [] };
  }

  static async createWithAnswers(data: IQuestionBase): Promise<IQuestion> {
    return await db.question.create({
      data: {
        question: data.question,
        explication: data.explication,
        quizId: data.quizId,
        answers: {
          create: data.answers.map((a) => ({
            text: a.text,
            correct: a.correct,
            deletedAt: null
          }))
        },
        deletedAt: null
      },
      include: {
        answers: true
      }
    });
  }

  static async update(id: number, data: IQuestionUpdate): Promise<IQuestion> {
    return await db.question.update({
      where: { id },
      data: {
        question: data.question,
        explication: data.explication,
        quizId: data.quizId,
        deletedAt: null
      },
      include: {
        answers: true
      }
    });
  }
}
