import { Request, Response } from "express";
import UserService from "../services/UserService";
import { CreateUserSchema } from "../schemas/UserSchema";

export default class UserController {
  static async findAll(req: Request, res: Response): Promise<any> {
    const { name } = req.query;

    const users = await UserService.listUsers(name as string);

    if (users.length === 0) {
      res.status(404).json({
        message: "No users found"
      });
    }

    const usersWithoutPassword = users.map((user) => {
      return { ...user, password: undefined };
    });

    res.status(200).json({
      message: "Users found",
      data: usersWithoutPassword
    });
  }

  static async findById(req: Request, res: Response): Promise<any> {
    const params = req.params;
    const id = Number(params.id);

    if (!id) {
      res.status(400).json({
        message: "User ID is Required"
      });
    }

    const user = await UserService.getUserById(id as number);

    if (!user) {
      res.status(404).json({
        message: "User not found"
      });
    }

    const userWithoutPassword = {
      ...user,
      password: undefined
    };

    res.status(200).json({
      message: "User found",
      data: userWithoutPassword
    });
  }

  static async store(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password } = req.body;

      const userValidation = CreateUserSchema.safeParse({
        name,
        email,
        password
      });

      if (!userValidation.success) {
        return res.status(400).json({
          message: "Validation error",
          errors: userValidation.error.format()
        });
      }

      const userExists = await UserService.getUserByEmail(email);
      if (userExists) {
        res.status(400).json({
          message: "User already exists"
        });
      }

      const user = await UserService.createUser(name, email, password);

      const userWithoutPassword = {
        ...user,
        password: undefined
      };

      res.status(201).json({
        message: "User created",
        data: userWithoutPassword
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        error: error?.message || "Unknown error"
      });
    }
  }

  static update(req: Request, res: Response) {}

  static delete(req: Request, res: Response) {}
}
