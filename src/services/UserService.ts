import UserRepository from "../repositories/UserRepository";

export default class UserService {
  static async listUsers(name?: string) {
    return await UserRepository.findAll(name);
  }

  static async getUserById(id: number) {
    return await UserRepository.findById(id);
  }

  static async getUserByEmail(email: string) {
    return await UserRepository.findByEmail(email);
  }

  static async createUser(name: string, email: string, password: string) {
    return await UserRepository.create({
      name: name,
      email: email,
      password: password
    });
  }

  static async updateUser(id: number, data: any) {}

  static async deleteUser(id: number) {}
}
