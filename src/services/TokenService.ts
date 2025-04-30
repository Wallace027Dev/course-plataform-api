import jwt from "jsonwebtoken";

export class TokenService {
  static isTokenValid(token?: string): boolean {
    if (!token) return false;

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return true;
    } catch {
      return false;
    }
  }

  static async generateToken(userId: number): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: "60m",
      algorithm: "HS256"
    });
  }
}
