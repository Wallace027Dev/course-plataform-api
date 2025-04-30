import jwt from "jsonwebtoken";
import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { hash, compare } from "bcryptjs";
import { IUserWithoutPassword } from "../interfaces/IUser";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<IUserWithoutPassword | null> {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await this.#comparePassword(user.password, password);
    if (!isValid) return null;

    let token = user.token;

    if (!token || !this.#isTokenValid(token)) {
      token = await this.#generateToken(user.id);
      await UserRepository.update(user.id, { token });
    }

    return excludePassword({ ...user, token });
  }

  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<IUserWithoutPassword | null> {
    const userExists = await UserRepository.findByEmail(email);
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await this.#hashPassword(password);
    const user = await UserRepository.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    const token = await this.#generateToken(user.id);
    await UserRepository.update(user.id, { token });

    return excludePassword({ ...user, token });
  }

  static #isTokenValid(token?: string): boolean {
    if (!token) return false;
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return true;
    } catch {
      return false;
    }
  }

  static async #hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  static async #comparePassword(
    userPassword: string,
    password: string
  ): Promise<boolean> {
    return await compare(password, userPassword);
  }

  static async #generateToken(userId: number): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "60m",
      algorithm: "HS256"
    });
  }
}
