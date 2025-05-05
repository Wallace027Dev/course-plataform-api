import { z } from "zod";
import { CreateAnswerSchema } from "./AnswerSchema";
import { IQuestionBase } from "../interfaces/IQuestion";

export const CreateQuestionSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  explication: z.string().trim().min(15, "Explication must be at least 15 characters"),
  quizId: z.number().int().positive("Quiz ID must be a positive integer"),
  answers: z
    .array(CreateAnswerSchema)
    .min(2, "Question must have at least 2 answers")
    .max(4, "Question must have at most 4 answers"),
});

export function validateCreateQuestion(data: IQuestionBase) {
  const userValidation = CreateQuestionSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}
