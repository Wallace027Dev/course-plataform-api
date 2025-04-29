import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { HttpResponse } from "../helper/HttpResponse";

export class UserController {
  static async findAll(req: Request, res: Response): Promise<any> {
    try {
      const name = req.query.name;

      const users = await UserService.listUsers(name as string);
      if (users.length === 0) {
        HttpResponse.notFound(res, "No users found");
      }

      HttpResponse.ok(res, "Users found", users);
    } catch (error: any) {
      HttpResponse.serverError(
        res,
        "Internal server error while creating user",
        error.message
      );
    }
  }

  static async findById(req: Request, res: Response): Promise<any> {
    try {
      const params = req.params;
      const id = Number(params.id);
      if (!id) {
        HttpResponse.badRequest(res, "Invalid ID");
      }

      const user = await UserService.getUserById(id as number);
      if (!user) {
        HttpResponse.notFound(res, "User not found");
      }

      HttpResponse.ok(res, "User found", user);
    } catch (error: any) {
      HttpResponse.serverError(
        res,
        "Internal server error while creating user",
        error.message
      );
    }
  }

  static update(req: Request, res: Response) {}

  static delete(req: Request, res: Response) {}
}
