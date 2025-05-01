import { z } from "zod";
import { CreateAnswersSchema } from "./AnswersSchema";

export const CreateQuestionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  explication: z.string().min(15, "Explication must be at least 15 characters"),
  answers: z.array(CreateAnswersSchema).min(2, "Question must have at least 2 answers").max(4, "Question must have at most 4 answers"),
});