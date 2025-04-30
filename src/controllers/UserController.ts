import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { HttpResponse } from "../helper/HttpResponse";

export class UserController {
  static async listUsers(req: Request, res: Response): Promise<any> {
    try {
      const name = req.query.name as string | undefined;
      if (!name) return HttpResponse.badRequest(res, "Name is required");

      const users = await UserService.listUsers(name as string);
      if (users?.length === 0) return HttpResponse.notFound(res, "No users found");

      return HttpResponse.ok(res, "Users found", users);
    } catch (error: any) {
      return HttpResponse.serverError(res, "Error while creating user", error.message);
    }
  }

  static async getUser(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      if (!id) return HttpResponse.badRequest(res, "Invalid ID");

      const user = await UserService.getUserById(id as number);
      if (!user) HttpResponse.notFound(res, "User not found");

      return HttpResponse.ok(res, "User found", user);
    } catch (error: any) {
      return HttpResponse.serverError(res, "Error while creating user", error.message);
    }
  }

  static updateUser(req: Request, res: Response) {}

  static deleteUser(req: Request, res: Response) {}
}
