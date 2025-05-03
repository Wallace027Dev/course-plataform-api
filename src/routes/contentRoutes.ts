import express from 'express';
import { ContentController } from "../controllers/ContentController";

const contentRoutes = express.Router();

// ROTAS DE CONTEUDO DE UMA JORNADA
contentRoutes.get("/", ContentController.listAllContents);
contentRoutes.get("/journey/:journeyId", ContentController.getContentsByCourseId);
contentRoutes.post("/journey", ContentController.storeContentsOnCourse);

export default contentRoutes;