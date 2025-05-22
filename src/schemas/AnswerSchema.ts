import { z } from "zod";
import { IAnswerBase } from "../interfaces/IAnswer";

export const CreateAnswerSchema = z.object({
  text: z.string().trim().min(1, "Answer must be at least 1 characters"),
  correct: z.boolean(),
});

export const UpdateAnswerSchema = CreateAnswerSchema.partial();

export function validateCreateAnswer(data: IAnswerBase) {
  const courseValidation = CreateAnswerSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}

export function validateUpdateAnswer(data: IAnswerBase) {
  const courseValidation = UpdateAnswerSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}