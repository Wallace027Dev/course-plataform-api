import { IQuiz } from "../interfaces/IQuiz";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class QuizRepository {
  static async findAll(name?: string): Promise<IQuiz[] | null> {
    return await db.quiz.findMany({
      where: { 
        ...(name && { name: { contains: name } }),
        deletedAt: null 
      },
      include: {
        questions: {
          include: {
            answers: true
          }
        },
        attempts: true
      }
    });
  }

  static async findAllByJourneyId(journeyId: number): Promise<IQuiz[] | null> {
    return await db.quiz.findMany({
      where: {
        content: {
          journeyId,
          deletedAt: null
        },
        deletedAt: null
      },
      include: {
        questions: {
          include: {
            answers: true
          }
        },
        attempts: true
      }
    });
  }

  static async findOneById(quizId: number): Promise<IQuiz | null> {
    return await db.quiz.findFirst({
      where: {
        id: quizId,
        deletedAt: null
      },
      include: {
        questions: {
          include: {
            answers: true
          }
        },
        attempts: true
      }
    });
  }

  static async create(data: any) {}
}