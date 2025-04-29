import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";

export class UserService {
  static async listUsers(name?: string) {
    const users = await UserRepository.findAll(name);
    return users.map((user) => {
      return excludePassword(user);
    });
  }

  static async getUserById(id: number) {
    const user = await UserRepository.findById(id);
    return excludePassword(user);
  }

  static async getUserByEmail(email: string) {
    const user = await UserRepository.findByEmail(email);
    return excludePassword(user);
  }

  static async createUser(name: string, email: string, password: string) {
    const userExists = await UserService.getUserByEmail(email);
    if (userExists) return null;

    const hashedPassword = await this.#hashPassword(password);

    const user = await UserRepository.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    return excludePassword(user);
  }

  static async #hashPassword(password: string) {
    return hash(password, 10);
  }

  static async updateUser(id: number, data: any) {}

  static async deleteUser(id: number) {}
}
