import { IUserCourse } from "../interfaces/IUserCourse";
import { UserCourseRepository } from "../repositories/UserCourseRepository";

export class UserCourseService {
  static async registerOnCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse | null> {
    return await UserCourseRepository.registerOnCourse(courseId, userId);
  }

  static async removeOfCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse | null> {
    return await UserCourseRepository.removeOfCourse(courseId, userId);
  }
}
