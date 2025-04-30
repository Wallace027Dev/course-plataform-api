import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { CourseService } from "../services/CourseService";
import { UserService } from "../services/UserService";
import { UserCourseService } from "../services/UserCourse";

export class UserCourseController {
  static async registerUserToCourse(req: Request, res: Response): Promise<any> {
    try {
      const { userId, courseId } = await UserCourseController.#extractIdsFromParams(
        res,
        req.params
      );
      const course = await CourseService.getCourseById(courseId as number);
      if (!course) HttpResponse.notFound(res, "Course not found");

      const student = await UserService.getUserById(userId as number);
      if (!student) HttpResponse.notFound(res, "Students not found");

      const userCourse = await UserCourseService.registerOnCourse(courseId, userId);

      return HttpResponse.ok(
        res,
        `Student ${student?.name} registeres on ${course?.name} course`,
        userCourse
      );
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while register student on course",
        error.message
      );
    }
  }

  static async removeUserFromCourse() {}

  static async #extractIdsFromParams(
    res: Response,
    params: Record<string, string>
  ): Promise<any> {
    const userId = parseInt(params.userId, 10);
    if (!userId) return HttpResponse.badRequest(res, "Invalid user ID");

    const courseId = parseInt(params.courseId, 10);
    if (!courseId) return HttpResponse.badRequest(res, "Invalid course ID");

    return { userId, courseId };
  }
}
