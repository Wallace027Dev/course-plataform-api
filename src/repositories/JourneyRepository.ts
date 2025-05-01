import { IJourney, IJourneyBase, IJourneyUpdate } from "../interfaces/IJourney";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class JourneyRepository {
  static async findAll(name?: string): Promise<IJourney[]> {
    return await db.journey.findMany({
      where: {
        deletedAt: null,
        ...(name && { name: { contains: name } })
      }
    });
  }

  static async findOneById(journeyId: number): Promise<IJourney | null> {
    return await db.journey.findFirst({
      where: {
        id: journeyId,
        deletedAt: null
      },
      include: {
        contents: {
          where: { deletedAt: null }
        }
      }
    });
  }

  static async create(data: IJourneyBase): Promise<IJourney> {
    return await db.journey.create({
      data: {
        name: data.name,
        courseId: data.courseId,
        coverUrl: data.coverUrl,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IJourneyUpdate): Promise<IJourney> {
    return await db.journey.update({
      where: { id },
      data: {
        name: data.name,
        courseId: data.courseId,
        coverUrl: data.coverUrl,
        deletedAt: data.deletedAt ?? null
      },
      include: {
        contents: true
      }
    });
  }
}
