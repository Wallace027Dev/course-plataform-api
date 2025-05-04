import { z } from "zod";
import { IAnswerBase } from "../interfaces/IAnswer";

export const CreateAnswerSchema = z.object({
  text: z.string().min(1, "Answer must be at least 1 characters"),
  correct: z.boolean()
});

export function validateCreateAnswer(data: IAnswerBase) {
  const courseValidation = CreateAnswerSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}