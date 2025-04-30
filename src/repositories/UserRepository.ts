import { PrismaClient } from "@prisma/client";
import { IUserRegister, IUserUpdate } from "../interfaces/IUser";
const prisma = new PrismaClient();

export class UserRepository {
  static async findAll(name?: string) {
    return await prisma.user.findMany({
      where: {
        deletedAt: null,
        ...(name && { name: { contains: name } })
      }
    });
  }

  static async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id, deletedAt: null }
    });
  }

  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email, deletedAt: null }
    });
  }

  static async create(data: IUserRegister) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        deletedAt: null
      }
    });
  }

  static async update(id: number, data: IUserUpdate) {
    return await prisma.user.update({
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
