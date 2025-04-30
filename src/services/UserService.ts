import { excludePassword } from "../helper/excludePassword";
import { IUserBase, IUserWithoutPassword } from "../interfaces/IUser";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  static async listUsers(
    name?: string
  ): Promise<IUserWithoutPassword[] | null> {
    const users = await UserRepository.findAll(name);
    return users.map((user) => {
      return excludePassword(user);
    });
  }

  static async getUserById(id: number): Promise<IUserWithoutPassword | null> {
    if (!id) throw Error("ID is required");
    const user = await UserRepository.findById(id);
    return excludePassword(user);
  }

  static async getUserByEmail(
    email: string
  ): Promise<IUserWithoutPassword | null> {
    const user = await UserRepository.findByEmail(email);
    return excludePassword(user);
  }

  static async updateUser(
    id: number,
    data: IUserBase
  ): Promise<IUserWithoutPassword | null> {
    const updatedUser = await UserRepository.update(id, data);
    return excludePassword(updatedUser);
  }

  static async deleteUser(id: number) {}
}
