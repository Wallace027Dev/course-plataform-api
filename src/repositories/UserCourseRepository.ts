import { IUserCourseBase } from "../interfaces/IUserCourse";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class UserCourseRepository {
  static async registerOnCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourseBase | null> {
    return await db.userCourse.create({
      data: { courseId, userId }
    });
  }

  static async removeOfCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourseBase | null> {
    return await db.userCourse.delete({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
      }
    });
  }
}
