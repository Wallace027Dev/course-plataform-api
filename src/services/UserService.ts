import { excludePassword } from "../helper/excludePassword";
import { UserRepository } from "../repositories/UserRepository";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

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
    return await UserRepository.findByEmail(email);
  }

  static async login(email: string, password: string): Promise<any | null> {
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
  

  static async createUser(name: string, email: string, password: string) {
    const userExists = await UserService.getUserByEmail(email);
    if (userExists) return null;

    const hashedPassword = await this.#hashPassword(password);
    const user = await UserRepository.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    const token = await this.#generateToken(user.id);
    const userWithToken = await UserRepository.update(user.id, { token });

    return excludePassword(userWithToken);
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

  static async #hashPassword(password: string) {
    return hash(password, 10);
  }

  static async #comparePassword(userPassword: string, password: string) {
    return await compare(password, userPassword);
  }

  static async #generateToken(userId: number) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "60m",
      algorithm: "HS256"
    });
  }

  static async updateUser(id: number, data: any) {
    const updatedUser = await UserRepository.update(id, data);
    return excludePassword(updatedUser);
  }

  static async deleteUser(id: number) {}
}
