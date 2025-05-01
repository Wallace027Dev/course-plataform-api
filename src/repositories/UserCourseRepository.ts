import { PrismaClient } from "@prisma/client";
import { IUserCourse, IUserCourseBase } from "../interfaces/IUserCourse";
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
