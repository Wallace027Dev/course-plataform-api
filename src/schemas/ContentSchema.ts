import { z } from "zod";
import { IContentBase } from "../interfaces/IContent";

export const CreateContentSchema = z.object({
  journeyId: z.number().int().positive("Journey ID must be a positive integer"),
  title: z.string().trim().min(1, "Title must be at least 1 characters"),
  order: z.number().int().positive("Order must be a positive integer"),
  quizId: z.number().int().nullable().optional(),
  type: z.enum(["video", "article", "quiz", "assignment", "project", "other"], {
    errorMap: () => ({ message: "Invalid content type" })
  }),
  metadata: z
    .object({
      level: z.enum(["Newbie", "Apprentice", "Master", "Legendary"], {
        errorMap: () => ({ message: "Invalid level" })
      }),
      contentType: z.enum(["text", "video", "audio", "image", "pdf", "other"], {
        errorMap: () => ({ message: "Invalid content type" })
      }),
      thumb: z.string().url("Invalid URL"),
      description: z.string().nullable().optional(),
      duration: z.string().nullable().optional(),
      contentUrl: z.string().url("Invalid URL").nullable().optional(),
      objetive: z.string().nullable().optional(),
      instructor: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      content: z.string().nullable().optional()
    })
    .nullable()
    .optional()
});

export const UpdateContentSchema = z.object({
  journeyId: z.number().int().positive().optional(),
  title: z.string().trim().min(1).optional(),
  order: z.number().int().positive().optional(),
  quizId: z.number().int().nullable().optional(),
  type: z
    .enum(["video", "article", "quiz", "assignment", "project", "other"])
    .optional(),
  metadata: z
    .object({
      level: z.enum(["Newbie", "Apprentice", "Master", "Legendary"]).optional(),
      contentType: z
        .enum(["text", "video", "audio", "image", "pdf", "other"])
        .optional(),
      thumb: z.string().url().optional(),
      description: z.string().nullable().optional(),
      duration: z.string().nullable().optional(),
      contentUrl: z.string().url().nullable().optional(),
      objetive: z.string().nullable().optional(),
      instructor: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      content: z.string().nullable().optional()
    })
    .partial()
    .optional()
});

export function validateCreateContent(data: IContentBase) {
  const courseValidation = CreateContentSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}

export function validateUpdateContent(data: IContentBase) {
  const courseValidation = UpdateContentSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}
