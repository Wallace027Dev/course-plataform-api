import { hash, compare } from "bcryptjs";
import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { TokenService } from "./TokenService";
import { IUserBase, IUserLogin, IUserWithoutPassword } from "../interfaces/IUser";

export class AuthService {
  static async login(data: IUserLogin): Promise<IUserWithoutPassword | null> {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) return null;

    const isValid = await this.#comparePassword(user.password, data.password);
    if (!isValid) return null;

    let token = user.token;
    if (!token || !TokenService.isTokenValid(token)) {
      token = await TokenService.generateToken(user.id);
      await UserRepository.update(user.id, { token });
    }

    return excludePassword({ ...user, token });
  }

  static async createUser(data: IUserBase): Promise<IUserWithoutPassword | null> {
    const userExists = await UserRepository.findByEmail(data.email);
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await this.#hashPassword(data.password);
    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "student"
    });

    const token = await TokenService.generateToken(user.id);
    await UserRepository.update(user.id, { token });

    return excludePassword({ ...user, token });
  }

  static async #hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  static async #comparePassword(userPassword: string, password: string): Promise<boolean> {
    return await compare(password, userPassword);
  }
}
