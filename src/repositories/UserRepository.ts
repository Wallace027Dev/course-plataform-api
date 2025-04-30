import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
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
        password: data.password,
        token: data.token
      }
    });
  }

  static async update(id: number, data: any) {
    return await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        token: data.token
      }
    });
  }
}
