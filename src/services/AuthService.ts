import { hash, compare } from "bcryptjs";
import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { TokenService } from "./TokenService";
import {
  IUserLogin,
  IUserRegister,
  IUserWithoutPassword
} from "../interfaces/IUser";

export class AuthService {
  static async login(data: IUserLogin): Promise<IUserWithoutPassword | null> {
    try {
      const user = await UserRepository.findOneByEmail(data.email);
      if (!user) return null;

      const isValid = await compare(data.password, user.password);
      if (!isValid) return null;

      let token = user.token;
      if (!token || !TokenService.isTokenValid(token)) {
        token = TokenService.generateToken(user.id);
        await UserRepository.update(user.id, { token });
      }

      return excludePassword({ ...user, token });
    } catch (error: any) {
      throw new Error(`Failed to login: ${error.message}`);
    }
  }

  static async createUser(
    data: IUserRegister
  ): Promise<IUserWithoutPassword | null> {
    try {
      const userExists = await UserRepository.findOneByEmail(data.email);
      if (userExists) throw new Error("User already exists");

      const hashedPassword = await hash(data.password, 10);

      const user = await UserRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
      });

      const token = TokenService.generateToken(user.id);
      await UserRepository.update(user.id, { token });

      return excludePassword({ ...user, token });
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}
