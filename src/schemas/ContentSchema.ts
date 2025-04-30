import { z } from "zod";
import { IContentBase } from "../interfaces/IContent";

export const CreateContentSchema = z.object({
  journeyId: z.number().int().positive("Journey ID must be a positive integer"),
  title: z.string().min(1, "Title is required"),
  order: z.number().int().positive("Order must be a positive integer"),
  quizId: z.number().int().optional(),
  type: z.enum(["video", "article", "quiz", "assignment", "project", "other"], {
    errorMap: () => ({ message: "Invalid content type" })
  }),
  metadata: z
    .object({
      level: z.enum(["Newbie", "Apprentice", "Master", "Legendary"], {
        errorMap: () => ({ message: "Invalid level" })
      }),
      thumb: z.string().url("Invalid URL"),
      description: z.string().optional(),
      duration: z.string().optional(),
      contentUrl: z.string().url("Invalid URL").optional(),
      objetive: z.string().optional(),
      instructor: z.string().optional(),
      tags: z.array(z.string()).optional(),
      content: z.string().optional(),
      contentType: z.enum(["text", "video", "audio", "image", "pdf", "other"], {
        errorMap: () => ({ message: "Invalid content type" })
      })
    })
    .optional()
});

export function validateCreateContent(data: IContentBase) {
  const courseValidation = CreateContentSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}
