import { z } from "zod";
import { CreateAnswerSchema } from "./AnswerSchema";
import { IQuestionBase } from "../interfaces/IQuestion";

export const CreateQuestionSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  explication: z.string().trim().min(15, "Explication must be at least 15 characters"),
  answers: z
    .array(CreateAnswerSchema)
    .min(2, "Question must have at least 2 answers")
    .max(4, "Question must have at most 4 answers"),
});

export const UpdateQuestionSchema = CreateQuestionSchema.partial();

export function validateCreateQuestion(data: IQuestionBase) {
  const userValidation = CreateQuestionSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}

export function validateUpdateQuestion(data: IQuestionBase) {
  const userValidation = UpdateQuestionSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}
