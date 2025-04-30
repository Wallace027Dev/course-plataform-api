import { PrismaClient } from "@prisma/client";
import { IUserCourse } from "../interfaces/IUserCourse";
const db = new PrismaClient();

export class UserCourseRepository {
  static async registerOnCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse | null> {
    return await db.userCourse.create({
      data: { courseId, userId }
    });
  }

  static async removeUserFromCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse> {
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
