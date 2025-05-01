import { CourseRepository } from "../repositories/CourseRepository";
import {
  ICourse,
  ICourseBase,
  ICourseUpdate,
  ICourseWithStudents
} from "../interfaces/ICourse";

export class CourseService {
  static async listCourses(name?: string): Promise<ICourse[]> {
    try {
      return await CourseRepository.findAll(name);
    } catch (error: any) {
      throw new Error(`Failed to list courses: ${error.message}`);
    }
  }

  static async getCourseById(id: number): Promise<ICourse | null> {
    try {
      return await CourseRepository.findOneById(id) || null;
    } catch (error: any) {
      throw new Error(`Failed to get course with id ${id}: ${error.message}`);
    }
  }

  static async getStudentsOfCourseById(id: number): Promise<ICourseWithStudents | null> {
    try {
      const course = await CourseRepository.findOneByIdWithStudents(id);
      if (!course || course.deletedAt !== null) return null;

      const students = course.userCourses
        .filter((uc) => uc.user.role === "STUDENT")
        .map((uc) => uc.user);

      return { ...course, userCourses: students };
    } catch (error: any) {
      throw new Error(`Failed to get students of course with id ${id}: ${error.message}`);
    }
  }

  static async createCourse(data: ICourseBase): Promise<ICourse> {
    try {
      return await CourseRepository.create(data);
    } catch (error: any) {
      throw new Error(`Failed to create course: ${error.message}`);
    }
  }

  static async updateCourse(id: number, data: ICourseUpdate): Promise<ICourse | null> {
    try {
      return await CourseRepository.update(id, data);
    } catch (error: any) {
      throw new Error(`Failed to update course with id ${id}: ${error.message}`);
    }
  }

  static async deleteCourse(id: number): Promise<void> {
    try {
      const course = await CourseRepository.findOneById(id);
      if (!course) throw new Error("Course not found");

      //await CourseRepository.delete(id);  // Ativar a exclusão quando necessário
    } catch (error: any) {
      throw new Error(`Failed to delete course with id ${id}: ${error.message}`);
    }
  }
}
