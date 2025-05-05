import { z } from "zod";
import { IUserBase } from "../interfaces/IUser";

export const CreateUserSchema = z.object({
  name: z.string().trim().min(1, "Name must be at least 1 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum(["admin", "student", "teacher"], {
      errorMap: () => ({ message: "Role is required" })
    })
    .default("student")
});

export function validateCreateUser(data: IUserBase) {
  const userValidation = CreateUserSchema.safeParse(data);

  if (!userValidation.success) {
    return userValidation.error.format();
  }
  return null;
}
