import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { IUser, IUserUpdate, IUserWithoutPassword } from "../interfaces/IUser";

export class UserService {
  static async listUsers(name?: string): Promise<IUserWithoutPassword[] | null> {
    try {
      const users = await UserRepository.findAll(name);
      return users.map((user: IUser) => excludePassword(user));
    } catch (error: any) {
      throw new Error(`Failed to list users: ${error.message}`);
    }
  }

  static async getUserById(id: number): Promise<IUserWithoutPassword | null> {
    try {
      const user = await UserRepository.findOneById(id);
      if (!user) return null;
      return excludePassword(user);
    } catch (error: any) {
      throw new Error(`Failed to get user with id ${id}: ${error.message}`);
    }
  }

  static async getUserByEmail(
    email: string
  ): Promise<IUserWithoutPassword | null> {
    try {
      const user = await UserRepository.findOneByEmail(email);
      if (!user) return null;
      return excludePassword(user);
    } catch (error: any) {
      throw new Error(`Failed to get user with email ${email}: ${error.message}`);
    }
  }

  static async updateUser(
    id: number,
    data: IUserUpdate
  ): Promise<IUserWithoutPassword | null> {
    try {
      const updatedUser = await UserRepository.update(id, data);
      if (!updatedUser) return null;
      return excludePassword(updatedUser);
    } catch (error: any) {
      throw new Error(`Failed to update user with id ${id}: ${error.message}`);
    }
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
