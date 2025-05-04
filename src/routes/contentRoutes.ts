import express from 'express';
import { ContentController } from "../controllers/ContentController";

const contentRoutes = express.Router();

// ROTAS DE CONTEUDO DE UMA JORNADA
contentRoutes.get("/", ContentController.listAllContents);
contentRoutes.get("/:id", ContentController.getContentById);
contentRoutes.post("/", ContentController.storeContent);
contentRoutes.put("/:id", ContentController.updateContent);
contentRoutes.delete("/:id", ContentController.deleteContent);

export default contentRoutes;