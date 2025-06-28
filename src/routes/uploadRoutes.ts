import express from 'express';
import { upload } from "../config/multer";

const uploadRoutes = express.Router();

// Upload de imagem
uploadRoutes.post("/upload/image", upload.single("file"), (req, res) => {
  const fileUrl = `/uploads/${req.file?.filename}`;
  res.status(201).json({ url: fileUrl });
});

// Upload de vídeo
uploadRoutes.post("/upload/video", upload.single("file"), (req, res) => {
  const fileUrl = `/uploads/${req.file?.filename}`;
  res.status(201).json({ url: fileUrl });
});

export default uploadRoutes;
