import { CourseRepository } from "../repositories/CourseRepository";
import {
  ICourse,
  ICourseBase,
  ICourseUpdate,
  ICourseWithStudents
} from "../interfaces/ICourse";

export class CourseService {
  static async listCourses(name?: string): Promise<ICourse[]> {
    return await CourseRepository.findAll(name);
  }

  static async getCourseById(id: number): Promise<ICourse | null> {
    const course = await CourseRepository.findOneById(id) || null;
    if (!course) throw new Error(`Course with id ${id} not found`);

    return course || null;
  }

  static async getStudentsOfCourseById(id: number): Promise<ICourseWithStudents | null> {
    const course = await CourseRepository.findOneByIdWithStudents(id);
    if (!course || course.deletedAt !== null) return null;

    const students = course.userCourses
      .filter((uc) => uc.user.role === "STUDENT")
      .map((uc) => uc.user);

    return { ...course, userCourses: students };
  }

  static async createCourse(data: ICourseBase): Promise<ICourse> {
    return await CourseRepository.create(data);
  }

  static async updateCourse(id: number, data: ICourseUpdate): Promise<ICourse | null> {
    await CourseService.getCourseById(id);

    return await CourseRepository.update(id, data);
  }

  static async deleteCourse(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
