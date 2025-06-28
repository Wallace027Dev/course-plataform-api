import express, { Request, Response } from "express";
import { upload } from "../config/multer";

const uploadRoutes = express.Router();

// Upload de imagem
uploadRoutes.post(
  "/image",
  upload.single("file"),
  (req: Request, res: Response): any => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileUrl = `/uploads/${file.filename}`;
    return res.status(201).json({ url: fileUrl });
  }
);

// Upload de vídeo
uploadRoutes.post("/upload/video", upload.single("file"), (req, res) => {
  const fileUrl = `/uploads/${req.file?.filename}`;
  res.status(201).json({ url: fileUrl });
});

export default uploadRoutes;
