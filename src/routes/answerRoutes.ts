import express from 'express';
import { AnswerController } from "../controllers/AnswerController";

const answerRoutes = express.Router();

answerRoutes.get("/", AnswerController.listAllAnswers);
answerRoutes.get("/:answerId", AnswerController.getAnswersByAnswerId);
answerRoutes.post("/", AnswerController.storeAnswersOnAnswer);
answerRoutes.put("/:answerId", AnswerController.updateAnswer);

export default answerRoutes;