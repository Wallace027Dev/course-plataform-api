import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { ContentService } from "../services/ContentService";
import { validateCreateContent } from "../schemas/ContentSchema";

export class ContentController {
  static async listAllContents(req: Request, res: Response): Promise<any> {
    const { type, title } = req.query;

    const contents = await ContentService.listContents(type as string, title as string);
    if (contents?.length === 0) return HttpResponse.notFound(res, "Content not found");

    return HttpResponse.ok(res, "Courses found", contents);
  }

  static async getContentById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (!id) return HttpResponse.badRequest(res, "Invalid ID");

    const content = await ContentService.getContentById(id as number);
    if (!content) return HttpResponse.notFound(res, "Content not found");

    return HttpResponse.ok(res, "Content found", content);
  }

  static async storeContent(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateContent(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const content = await ContentService.createContent(data);

    return HttpResponse.ok(res, "Content created", content);
  }

  static async updateContent(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (!id) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateCreateContent(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const content = await ContentService.updateContent(id as number, data);

    return HttpResponse.ok(res, "Content updated", content);
  }

  static deleteContent(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
