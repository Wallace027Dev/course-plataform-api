import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { HttpResponse } from "../helper/HttpResponse";
import { validateUpdateUser } from "../schemas/UserSchema";

export class UserController {
  static async listUsers(req: Request, res: Response): Promise<any> {
    const name = req.query.name as string | undefined;

    const users = await UserService.listUsers(name as string);
    if (users?.length === 0) return HttpResponse.notFound(res, "Users not found");

    return HttpResponse.ok(res, "Users found", users);
  }

  static async getUser(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const user = await UserService.getUserById(id as number);
    if (!user) return HttpResponse.notFound(res, "User not found");

    return HttpResponse.ok(res, "User found", user);
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) return HttpResponse.badRequest(res, "Invalid ID");

    const data = req.body;

    const validate = validateUpdateUser(data);
    if (validate) return HttpResponse.badRequest(res, "Invalid data", validate);
    
    const user = UserService.updateUser(id as number, data);

    return HttpResponse.ok(res, "User updated", user);
  }

  static deleteUser(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
