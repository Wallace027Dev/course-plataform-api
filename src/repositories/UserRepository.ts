import { IUserRegister, IUserUpdate } from "../interfaces/IUser";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export class UserRepository {
  static async findAll(name?: string) {
    return await db.user.findMany({
      where: {
        ...(name && { name: { contains: name } }),
        deletedAt: null
      }
    });
  }

  static async findOneById(id: number) {
    return await db.user.findUnique({
      where: {
        id,
        deletedAt: null
      }
    });
  }

  static findOneByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
        deletedAt: null
      }
    });
  }

  static async create(data: IUserRegister) {
    return await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IUserUpdate) {
    return await db.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        token: data.token,
        deletedAt: data.deletedAt ?? null
      }
    });
  }
}
