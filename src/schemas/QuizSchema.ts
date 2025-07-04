import { z } from "zod";
import { IQuizBase } from "../interfaces/IQuiz";
import { CreateQuestionSchema } from './QuestionSchema';

export const CreateQuizSchema = z.object({
  name: z.string().trim().min(1, "Name must be at least 1 characters"),
  questions: z
    .array(CreateQuestionSchema)
    .min(1, "Quiz must have at least 1 question")
    .max(10, "Quiz must have at most 10 questions"),
});

export const UpdateQuizSchema = CreateQuizSchema.partial();

export function validateCreateQuiz(data: IQuizBase) {
  const userValidation = CreateQuizSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}

export function validateUpdateQuiz(data: IQuizBase) {
  const userValidation = UpdateQuizSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}
