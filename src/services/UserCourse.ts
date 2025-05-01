import { IUserCourse } from "../interfaces/IUserCourse";
import { UserCourseRepository } from "../repositories/UserCourseRepository";

export class UserCourseService {
  static async registerOnCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse | null> {
    try {
      return await UserCourseRepository.registerOnCourse(courseId, userId);
    } catch (error: any) {
      throw new Error(`Failed to register user ${userId} on course ${courseId}: ${error.message}`);
    }
  }

  static async removeFromCourse(
    courseId: number,
    userId: number
  ): Promise<IUserCourse | null> {
    try {
      return await UserCourseRepository.removeOfCourse(courseId, userId);
    } catch (error: any) {
      throw new Error(`Failed to remove user ${userId} from course ${courseId}: ${error.message}`);
    }
  }
}
