import jwt from "jsonwebtoken";

export class TokenService {
  static isTokenValid(token?: string): boolean {
    try {
      if (!token) throw new Error("Token is required");

      jwt.verify(token, process.env.JWT_SECRET as string);
      return true;
    } catch {
      return false;
    }
  }

  static generateToken(userId: number): string {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "60m",
      algorithm: "HS256",
    });
  }
}
