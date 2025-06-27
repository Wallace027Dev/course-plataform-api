import { z } from "zod";
import { IJourneyBase } from "../interfaces/IJourney";

export const CreateJourneySchema = z.object({
  name: z.string().trim().min(1, "Name must be at least 1 characters"),
  courseId: z.number().int().positive("Course ID must be a positive integer"),
  converUrl: z.string().url("Invalid URL format").nullable().optional()
});

export const UpdateJourneySchema = CreateJourneySchema.partial();

export function validateCreateJourney(data: IJourneyBase) {
  const journeyValidation = CreateJourneySchema.safeParse(data);

  if (!journeyValidation.success) {
    return journeyValidation.error.format();
  }
  return null;
}

export function validateUpdateJourney(data: IJourneyBase) {
  const journeyValidation = UpdateJourneySchema.safeParse(data);

  if (!journeyValidation.success) {
    return journeyValidation.error.format();
  }
  return null;
}
