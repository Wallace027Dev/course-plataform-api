import { IAttemptBase } from './../interfaces/IAttempt';
import { z } from "zod";

export const CreateAttemptSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  quizId: z.number().int().positive("Quiz ID must be a positive integer"),
});

export function validateCreateAttempt(data: IAttemptBase) {
  const courseValidation = CreateAttemptSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}
