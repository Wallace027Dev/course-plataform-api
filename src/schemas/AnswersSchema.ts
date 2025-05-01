import { z } from "zod";

export const CreateAnswersSchema = z.object({
  text: z.string().min(1, "Answer must be at least 1 characters"),
  correct: z.boolean()
});