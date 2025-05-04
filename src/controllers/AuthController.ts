import { Request, Response } from "express";
import { HttpResponse } from "../helper/HttpResponse";
import { validateCreateUser } from "../schemas/UserSchema";
import { AuthService } from "../services/AuthService";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const token = await AuthService.login(data);
    if (!token) return HttpResponse.badRequest(res, "Invalid email or password");

    return HttpResponse.ok(res, "User logged in", { token });
  }

  static async register(req: Request, res: Response): Promise<any> {
    const data = req.body;

    const isInvalid = validateCreateUser(data);
    if (isInvalid) return HttpResponse.badRequest(res, "Invalid data", isInvalid);

    const user = await AuthService.createUser(data);
    if (!user) return HttpResponse.conflict(res, "User already exists");

    return HttpResponse.created(res, "User registered", { token: user.token });
  }
}
