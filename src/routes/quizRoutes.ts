import express from 'express';
import { QuizController } from "../controllers/QuizController";

const quizRoutes = express.Router();

quizRoutes.get("/:id", QuizController.getQuizById);
quizRoutes.get("/", QuizController.listAllQuizzes);
quizRoutes.get("/journey/:journeyId", QuizController.listQuizzesOfJourney);
quizRoutes.post("/", QuizController.store);

export default quizRoutes;