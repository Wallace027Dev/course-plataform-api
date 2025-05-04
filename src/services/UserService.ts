import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { IUser, IUserUpdate, IUserWithoutPassword } from "../interfaces/IUser";

export class UserService {
  static async listUsers(name?: string): Promise<IUserWithoutPassword[] | null> {
    const users = await UserRepository.findAll(name);
    return users.map((user: IUser) => excludePassword(user));
  }

  static async getUserById(id: number): Promise<IUserWithoutPassword | null> {
    const user = await UserRepository.findOneById(id);
    if (!user) throw new Error("User not found");

    return excludePassword(user);
  }

  static async getUserByEmail(email: string): Promise<IUserWithoutPassword | null> {
    const user = await UserRepository.findOneByEmail(email);
    if (!user) throw new Error("User not found");

    return excludePassword(user);
  }

  static async updateUser(id: number, data: IUserUpdate): Promise<IUserWithoutPassword | null> {
    await UserService.getUserById(id);
    const updatedUser = await UserRepository.update(id, data);

    return excludePassword(updatedUser);
  }

  /* static async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await UserRepository.delete(id);
      if (!result) return false;
      return true;
    } catch (error: any) {
      throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
    }
  } */
}
