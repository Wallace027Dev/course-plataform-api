import { z } from "zod";
import { IJourneyBase } from "../interfaces/IJourney";

export const CreateJourneySchema = z.object({
  name: z.string().min(1, "Name is required"),
  courseId: z.number().int().positive("Course ID must be a positive integer"),
  converUrl: z.string().url("Invalid URL format").optional()
});

export function validateCreateJourney(data: IJourneyBase) {
  const journeyValidation = CreateJourneySchema.safeParse(data);

  if (!journeyValidation.success) {
    return journeyValidation.error.format();
  }
  return null;
}
