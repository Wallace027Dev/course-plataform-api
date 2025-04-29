import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { CreateUserSchema } from "../schemas/UserSchema";
import { UserService } from "../services/UserService";

export class AuthController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password } = req.body;
      const userValidation = CreateUserSchema.safeParse({
        name,
        email,
        password
      });

      if (!userValidation.success) {
        HttpResponse.badRequest(
          res,
          "Validation error",
          userValidation.error.format()
        );
      }

      const user = await UserService.createUser(name, email, password);
      if (!user) {
        return HttpResponse.badRequest(res, "User already exists");
      }

      HttpResponse.created(res, "User registered", user);
    } catch (error: any) {
      HttpResponse.serverError(
        res,
        "Internal server error while creating user",
        error.message
      );
    }
  }
}
