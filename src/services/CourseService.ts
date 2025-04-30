import { CourseRepository } from "../repositories/CourseRepository";
import { IUserCourse } from "../interfaces/IUserCourse";
import {
  ICourse,
  ICourseBase,
  ICourseUpdate,
  ICourseWithStudents,
  IUserCourseWithUser
} from "../interfaces/ICourse";

export class CourseService {
  static async listCourses(name?: string): Promise<ICourse[] | null> {
    return await CourseRepository.findAll(name);
  }

  static async getCourseById(id: number): Promise<ICourse | null> {
    const course = await CourseRepository.findOneById(id);
    if (!course) return null;
    return course;
  }

  static async getStudentsOfCourseById(
    id: number
  ): Promise<ICourseWithStudents | null> {
    const course = await CourseRepository.findOneByIdWithStudents(id);
    if (!course || course.deletedAt !== null) return null;

    const userCourses = course.userCourses as Array<
      IUserCourseWithUser & IUserCourse
    >;

    return {
      ...course,
      userCourses: userCourses
        .filter((uc) => uc.user.role === "STUDENT")
        .map((uc) => uc.user)
    };
  }

  static async createCourse(data: ICourseBase): Promise<ICourse | null> {
    const course = await CourseRepository.create(data);
    return course;
  }

  static async updateCourse(
    id: number,
    data: ICourseUpdate
  ): Promise<ICourse | null> {
    return await CourseRepository.update(id, data);
  }

  static async deleteCourse(id: number) {}
}
