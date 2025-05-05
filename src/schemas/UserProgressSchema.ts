import { z } from "zod";
import { IUserProgressBase } from "../interfaces/IUserProgress";

export const CreateUserProgressSchema = z.object({
  userId: z.number().int().positive("User ID must be a positive integer"),
  contentId: z.number().int().positive("User ID must be a positive integer"),
  completedAt: z.date(),
});

export function validateCreateUserProgress(data: IUserProgressBase) {
  const userProgressValidation = CreateUserProgressSchema.safeParse(data);

  if (!userProgressValidation.success) {
    return userProgressValidation.error.format();
  }
  return null;
}
