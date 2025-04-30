import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { validateCreateUser } from "../schemas/UserSchema";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;

      const token = await AuthService.login(data);
      if (!token) return HttpResponse.badRequest(res, "Invalid email or password");

      return HttpResponse.ok(res, "User logged in", { token });
    } catch (error: any) {
      return HttpResponse.serverError(res, "Error when logging in", error.message);
    }
  }

  static async register(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      
      const validate = validateCreateUser(data);
      if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);

      const user = await AuthService.createUser(data);
      if (!user) return HttpResponse.conflict(res, "User already exists");

      return HttpResponse.created(res, "User registered", { token: user.token });
    } catch (error: any) {
      return HttpResponse.serverError(res, "Error while registering user", error.message);
    }
  }
}
