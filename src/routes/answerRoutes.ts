import express from 'express';
import { AnswerController } from "../controllers/AnswerController";

const answerRoutes = express.Router();

answerRoutes.get("/", AnswerController.listAllAnswers);
answerRoutes.get("/:id", AnswerController.getAnswersById);
answerRoutes.post("/", AnswerController.storeAnswer);
answerRoutes.put("/:id", AnswerController.updateAnswer);
answerRoutes.delete("/:id", AnswerController.deleteAnswer);

export default answerRoutes;