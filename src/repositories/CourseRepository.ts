import { IUserCourse } from "./../interfaces/IUserCourse";
import { IUser } from "./../interfaces/IUser";
import { ICourse, ICourseBase, ICourseUpdate } from "../interfaces/ICourse";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class CourseRepository {
  static async findAll(name?: string): Promise<ICourse[]> {
    return await db.course.findMany({
      where: {
        deletedAt: null,
        ...(name && { name: { contains: name } })
      }
    });
  }

  static async findOneById(id: number): Promise<ICourse | null> {
    return await db.course.findUnique({
      where: { id, deletedAt: null },
      include: {
        journeys: {
          where: { deletedAt: null }
        }
      }
    });
  }

  static async findOneByIdWithStudents(
    id: number
  ): Promise<
    (ICourse & { userCourses: (IUserCourse & { user: IUser })[] }) | null
  > {
    return await db.course.findUnique({
      where: { id, deletedAt: null },
      include: {
        userCourses: {
          include: {
            user: true
          }
        }
      }
    });
  }

  static async create(data: ICourseBase): Promise<ICourse> {
    return await db.course.create({
      data: {
        name: data.name,
        description: data.description,
        coverUrl: data.coverUrl,
        deletedAt: null
      },
      include: {
        journeys: true,
        userCourses: {
          include: {
            user: true
          }
        }
      }
    });
  }

  static async update(id: number, data: ICourseUpdate): Promise<ICourse> {
    return await db.course.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        coverUrl: data.coverUrl,
        deletedAt: data.deletedAt ?? null
      },
      include: {
        journeys: true,
        userCourses: {
          include: {
            user: true
          }
        }
      }
    });
  }
}
