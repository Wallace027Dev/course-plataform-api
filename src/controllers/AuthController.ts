import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { CreateUserSchema } from "../schemas/UserSchema";
import { AuthService } from "../services/AuthService";
import { IUserWithoutPassword } from "../interfaces/IUser";

export class AuthController {
  static async login(
    req: Request,
    res: Response
  ): Promise<Response<IUserWithoutPassword | null>> {
    try {
      const { email, password } = req.body;

      const token = await AuthService.login(email, password);
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

  static async register(
    req: Request,
    res: Response
  ): Promise<Response<IUserWithoutPassword | null>> {
    try {
      const { name, email, password } = req.body;
      const userValidation = CreateUserSchema.safeParse({
        name,
        email,
        password
      });

      if (!userValidation.success) {
        return HttpResponse.badRequest(
          res,
          "Validation error",
          userValidation.error.format()
        );
      }

      const user = await AuthService.createUser(name, email, password);
      if (!user) {
        return HttpResponse.conflict(res, "User already exists");
      }

      return HttpResponse.created(res, "User registered", { token: user.token });
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Internal server error while registering user",
        error.message
      );
    }
  }
}
