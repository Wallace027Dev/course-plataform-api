import multer from "multer";
import express from "express";
import path from "node:path";

import { ContentController } from "../controllers/ContentController";

const contentRoutes = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// ROTAS DE CONTEUDO DE UMA JORNADA
contentRoutes.get("/", ContentController.listAllContents);
contentRoutes.get("/:id", ContentController.getContentById);
contentRoutes.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
    { name: "audio", maxCount: 1 }
  ]),
  ContentController.storeContent
);
contentRoutes.put("/:id", ContentController.updateContent);
contentRoutes.delete("/:id", ContentController.deleteContent);

export default contentRoutes;
