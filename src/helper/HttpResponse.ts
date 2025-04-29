import { Response } from "express";

export class HttpResponse {
  static ok(res: Response, message: string, data?: any) {
    return res.status(200).json({ message, data });
  }

  static created(res: Response, message: string, data?: any) {
    return res.status(201).json({ message, data });
  }

  static badRequest(res: Response, message: string, errors?: any) {
    return res.status(400).json({ message, errors });
  }

  static unauthorized(res: Response, message = "Unauthorized") {
    return res.status(401).json({ message });
  }

  static forbidden(res: Response, message = "Forbidden") {
    return res.status(403).json({ message });
  }

  static notFound(res: Response, message = "Not Found") {
    return res.status(404).json({ message });
  }

  static serverError(res: Response, message = "Internal Server Error", error?: any) {
    return res.status(500).json({ message, error });
  }
}
