import { IResultBase } from './../interfaces/IResult';
import { z } from "zod";

export const CreateResultSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
  score: z.number().int().positive("Score must be a positive integer"),
  attemptId: z.number().int().positive("Attempt ID must be a positive integer"),
});

export function validateCreateResult(data: IResultBase) {
  const courseValidation = CreateResultSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}
