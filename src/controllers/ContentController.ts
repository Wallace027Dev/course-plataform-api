import dotenv from "dotenv";
import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { ContentService } from "../services/ContentService";
import {
  validateCreateContent,
  validateUpdateContent
} from "../schemas/ContentSchema";

const baseUrl = process.env.BASE_URL || "http://localhost:6000";

export class ContentController {
  static async listAllContents(req: Request, res: Response): Promise<any> {
    const { type, title } = req.query;

    const contents = await ContentService.listContents(
      type as string,
      title as string
    );
    if (contents?.length === 0)
      return HttpResponse.notFound(res, "Content not found");

    return HttpResponse.ok(res, "Courses found", contents);
  }

  static async getContentById(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const content = await ContentService.getContentById(id as number);
    if (!content) return HttpResponse.notFound(res, "Content not found");

    return HttpResponse.ok(res, "Content found", content);
  }

  static async storeContent(req: Request, res: Response): Promise<any> {
    try {
      const files = req.files as {
        image?: Express.Multer.File[];
        video?: Express.Multer.File[];
        audio?: Express.Multer.File[];
        pdf?: Express.Multer.File[];
      };

      console.log(files);

      const imageFile = files?.image?.[0];
      const videoFile = files?.video?.[0];
      const audioFile = files?.audio?.[0];
      const pdfFile = files?.pdf?.[0];

      // Parseando metadata manualmente
      const rawMetadata =
        typeof req.body.metadata === "string"
          ? JSON.parse(req.body.metadata)
          : req.body.metadata || {};

      // Adiciona o path da imagem como thumb, se foi enviado
      if (imageFile) {
        rawMetadata.thumb = `${baseUrl}/uploads/${imageFile.filename}`;
      }

      // Também pode adicionar contentUrl para vídeos, pdfs, etc.
      if (videoFile) {
        rawMetadata.contentUrl = `${baseUrl}/uploads/${videoFile.filename}`;
      } else if (audioFile) {
        rawMetadata.contentUrl = `${baseUrl}/uploads/${audioFile.filename}`;
      } else if (pdfFile) {
        rawMetadata.contentUrl = `${baseUrl}/uploads/${pdfFile.filename}`;
      }

      const data = {
        title: req.body.title,
        type: req.body.type,
        order: Number(req.body.order),
        journeyId: Number(req.body.journeyId),
        quizId: req.body.quizId ? Number(req.body.quizId) : null,
        metadata: rawMetadata
      };

      const isInvalid = validateCreateContent(data);
      if (isInvalid) {
        return HttpResponse.badRequest(res, "Invalid data", isInvalid);
      }

      const createdContent = await ContentService.createContent(data);
      return HttpResponse.created(res, "Content created", createdContent);
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError(res, "Erro ao criar conteúdo");
    }
  }

  static async updateContent(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const isInvalid = validateUpdateContent(data);
    if (isInvalid)
      return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const content = await ContentService.updateContent(id as number, data);

    return HttpResponse.ok(res, "Content updated", content);
  }

  static deleteContent(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
