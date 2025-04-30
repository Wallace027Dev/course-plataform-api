import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import { HttpResponse } from "../helper/HttpResponse";
import { validateCreateCourse } from "../schemas/CourseSchema";
import { UserService } from "../services/UserService";

export class CourseController {
  static async listCourses(req: Request, res: Response): Promise<any> {
    try {
      const name = req.query.name as string | undefined;

      const courses = await CourseService.listCourses(name as string);
      if (courses?.length === 0)
        return HttpResponse.notFound(res, "No courses found");

      return HttpResponse.ok(res, "Courses found", courses);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing courses",
        error.message
      );
    }
  }

  static async getCourse(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.courseId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const course = await CourseService.getCourseById(id as number);
      if (!course) HttpResponse.notFound(res, "Course not found");

      return HttpResponse.ok(res, "Course found", course);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting course",
        error.message
      );
    }
  }

  static async getStudentsOfCourse(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.courseId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const course = await CourseService.getCourseById(id as number);
      if (!course) HttpResponse.notFound(res, "Course not found");

      const students = await CourseService.getStudentsOfCourseById(
        id as number
      );
      if (!students) HttpResponse.notFound(res, "Students not found");

      return HttpResponse.ok(res, `Students of ${course?.name}`, students);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting student",
        error.message
      );
    }
  }

  static async storeCourse(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;

      const validate = validateCreateCourse(data);
      if (validate)
        return HttpResponse.badRequest(res, "Invalid data", validate);

      const course = await CourseService.createCourse(data);

      return HttpResponse.created(res, "User registered", course);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while registering course",
        error.message
      );
    }
  }

  static updateCourse(req: Request, res: Response) {}

  static deleteCourse(req: Request, res: Response) {}
}
