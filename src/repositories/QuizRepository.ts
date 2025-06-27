import { IQuiz, IQuizBase, IQuizUpdate } from "../interfaces/IQuiz";
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
        attempts: {
          include: {
            user: true
          }
        }
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

  static async create(data: IQuizBase, contentId?: number ): Promise<IQuiz> {
    return await db.quiz.create({
      data: {
        name: data.name,
        questions: {
          create: data.questions.map((q) => ({
            question: q.question,
            explication: q.explication,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                correct: a.correct,
                deletedAt: null
              }))
            },
            deletedAt: null
          }))
        },
        attempts: { create: [] },
        content: contentId ? { connect: { id: contentId } } : undefined,
        deletedAt: null,
      },
      include: {
        questions: { include: { answers: true } },
        attempts: true
      }
    });
  }

  static async update(id: number, data: IQuizUpdate): Promise<IQuiz> {
    // Apaga todas as perguntas antigas
    await db.question.deleteMany({
      where: { quizId: id }
    });

    // Atualiza o quiz (nome, deletedAt, e recria perguntas)
    return await db.quiz.update({
      where: { id },
      data: {
        name: data.name,
        deletedAt: data.deletedAt ?? null,
        questions: {
          create: data.questions?.map((q) => ({
            question: q.question,
            explication: q.explication,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                correct: a.correct,
                deletedAt: null
              }))
            },
            deletedAt: null
          }))
        }
      },
      include: {
        questions: {
          include: { answers: true }
        },
        attempts: true
      }
    });
  }
}