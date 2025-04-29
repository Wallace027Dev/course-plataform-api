import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

export default class UserRepository {
  static async findAll(name?: string) {
    return await prisma.user.findMany({
      where: name ? { name: { contains: name } } : undefined
    });
  }

  static async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  static async create(data: any) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await this.#hashPassword(data.password)
      }
    });
  }

  static async #hashPassword(password: string) {
    return hash(password, 10);
  }
}
