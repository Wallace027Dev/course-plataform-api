import { PrismaClient } from "@prisma/client";
import { ICourse, ICourseBase, ICourseUpdate } from "../interfaces/ICourse";
const prisma = new PrismaClient();

export class CourseRepository {
  static async findAll(name?: string) {
    return await prisma.course.findMany({
      where: {
        deletedAt: null,
        ...(name && { name: { contains: name } })
      }
    });
  }

  static async findOneById(id: number) {
    return await prisma.course.findUnique({
      where: { id, deletedAt: null },
      include: {
        journeys: {
          where: { deletedAt: null }
        }
      }
    });
  }

  static async findOneByIdWithStudents(id: number) {
    return await prisma.course.findUnique({
      where: { id, deletedAt: null },
      include: {
        userCourses: {
          include: {
            user: true,
          }
        }
      }
    });
  }

  static async create(data: ICourseBase): Promise<ICourse> {
    return await prisma.course.create({
      data: {
        name: data.name,
        description: data.description,
        coverUrl: data.coverUrl,
        deletedAt: null
      },
      include: {
        journeys: true,
        userCourses: true
      }
    });
  }

  static async update(id: number, data: ICourseUpdate) {
    return await prisma.course.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        coverUrl: data.coverUrl,
        deletedAt: data.deletedAt ?? null
      },
      include: {
        journeys: true,
        userCourses: true
      }
    });
  }
}
