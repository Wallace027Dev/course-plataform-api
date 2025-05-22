import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import { HttpResponse } from "../helper/HttpResponse";
import { validateCreateCourse, validateUpdateCourse } from "../schemas/CourseSchema";

export class CourseController {
  static async listCourses(req: Request, res: Response): Promise<any> {
    const name = req.query.name as string | undefined;

    const courses = await CourseService.listCourses(name as string);
    if (courses?.length === 0) return HttpResponse.notFound(res, "Courses not found");

    return HttpResponse.ok(res, "Courses found", courses);
  }

  static async getCourseById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const course = await CourseService.getCourseById(id as number);
    if (!course) return HttpResponse.notFound(res, "Course not found");

    return HttpResponse.ok(res, "Course found", course);
  }

  static async getStudentsOfCourseId(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const course = await CourseService.getCourseById(id as number);
    if (!course) return HttpResponse.notFound(res, "Course not found");

    const students = await CourseService.getStudentsOfCourseById(id as number);
    if (!students) return HttpResponse.notFound(res, "Students not found");

    return HttpResponse.ok(res, `Students of ${course?.name}`, students);
  }

  static async storeCourse(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateCourse(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const course = await CourseService.createCourse(data);

    return HttpResponse.created(res, "User registered", course);
  }

  static async updateCourse(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateUpdateCourse(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const course = await CourseService.updateCourse(id as number, data);

    return HttpResponse.ok(res, "Course updated", course);
  }

  static deleteCourse(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
