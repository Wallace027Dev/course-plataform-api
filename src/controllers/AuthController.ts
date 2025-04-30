import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { CreateUserSchema } from "../schemas/UserSchema";
import { UserService } from "../services/UserService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      const token = await UserService.login(email, password);
      if (!token) {
        return HttpResponse.badRequest(res, "Invalid email or password");
      }

      return HttpResponse.ok(res, "User logged in", { token });
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Internal server error when logging in",
        error.message
      );
    }
  }

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

      HttpResponse.created(res, "User registered", { token: user.token });
    } catch (error: any) {
      HttpResponse.serverError(
        res,
        "Internal server error while registering user",
        error.message
      );
    }
  }
}
