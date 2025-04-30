import express from 'express';
import { ContentsController } from "../controllers/ContentsController";

const contentRoutes = express.Router();

// ROTAS DE CONTEUDO DE UMA JORNADA
contentRoutes.get("/", ContentsController.listAllContents);
contentRoutes.get("/journey/:journeyId", ContentsController.getContentsByCourseId);
contentRoutes.post("/journey", ContentsController.storeContentsOnCourse);

export default contentRoutes;