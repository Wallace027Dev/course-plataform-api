import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { ContentService } from "../services/ContentService";
import { validateCreateContent } from "../schemas/ContentSchema";

export class ContentsController {
  static async listAllContents(req: Request, res: Response): Promise<any> {
    try {
      const { type, title } = req.query;

      const contents = await ContentService.listContents(type as string, title as string);
      if (contents?.length === 0) return HttpResponse.notFound(res, "Content not found");

      return HttpResponse.ok(res, "Courses found", contents);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while listing courses",
        error.message
      );
    }
  }

  static async getContentsByCourseId(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const id = parseInt(req.params.journeyId, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const content = await ContentService.getContentById(id as number);
      if (!content) return HttpResponse.notFound(res, "Content not found");

      return HttpResponse.ok(res, "Content found", content);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while getting content",
        error.message
      );
    }
  }
  static async storeContentsOnCourse(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const data = req.body;

      const validate = validateCreateContent(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const content = await ContentService.createContent(data);

      return HttpResponse.ok(res, "Content created", content);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Error while creating courses",
        error.message
      );
    }
  }
}
