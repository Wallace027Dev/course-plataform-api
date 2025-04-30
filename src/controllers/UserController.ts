import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { HttpResponse } from "../helper/HttpResponse";
import { IUserWithoutPassword } from "../interfaces/IUser";

export class UserController {
  static async findAll(
    req: Request,
    res: Response
  ): Promise<Response<IUserWithoutPassword[] | null>> {
    try {
      const name = req.query.name;

      const users = await UserService.listUsers(name as string);
      if (users?.length === 0) {
        return HttpResponse.notFound(res, "No users found");
      }

      return HttpResponse.ok(res, "Users found", users);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Internal server error while creating user",
        error.message
      );
    }
  }

  static async findById(
    req: Request,
    res: Response
  ): Promise<Response<IUserWithoutPassword | null>> {
    try {
      const params = req.params;
      const id = Number(params.id);
      if (!id) {
        return HttpResponse.badRequest(res, "Invalid ID");
      }

      const user = await UserService.getUserById(id as number);
      if (!user) {
        HttpResponse.notFound(res, "User not found");
      }

      return HttpResponse.ok(res, "User found", user);
    } catch (error: any) {
      return HttpResponse.serverError(
        res,
        "Internal server error while creating user",
        error.message
      );
    }
  }

  static update(req: Request, res: Response) {}

  static delete(req: Request, res: Response) {}
}
