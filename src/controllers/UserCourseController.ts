import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { CourseService } from "../services/CourseService";
import { UserService } from "../services/UserService";
import { UserCourseService } from "../services/UserCourseService";

export class UserCourseController {
  static async registerUserToCourse(req: Request, res: Response): Promise<any> {
    const { userId, courseId } =
      await UserCourseController.#extractIdsFromParams(res, req.params);

    const course = await CourseService.getCourseById(courseId as number);
    if (!course) return HttpResponse.notFound(res, "Course not found");

    const student = await UserService.getUserById(userId as number);
    if (!student) return HttpResponse.notFound(res, "Student not found");

    const userCourse = await UserCourseService.registerOnCourse(
      courseId,
      userId
    );

    return HttpResponse.created(
      res,
      `Student ${student?.name} registeres on ${course?.name} course`,
      userCourse
    );
  }

  static async removeUserFromCourse(req: Request, res: Response): Promise<any> {
    const { userId, courseId } =
      await UserCourseController.#extractIdsFromParams(res, req.params);

    const userCourse = await UserCourseService.removeOfCourse(
      courseId,
      userId
    );

    return HttpResponse.ok(res, "Student removed from curse", userCourse);
  }

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
