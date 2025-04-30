import { z } from "zod";
import { ICourseBase } from "../interfaces/ICourse";

export const CreateCourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(25, "Description must be at least 25 characters"),
  coverUrl: z.string().url("Invalid URL format").optional()
});

export function validateCreateCourse(data: ICourseBase) {
  const courseValidation = CreateCourseSchema.safeParse(data);

  if (!courseValidation.success) {
    return courseValidation.error.format();
  }
  return null;
}
