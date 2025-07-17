import express from "express";
import { QuizController } from "../controllers/QuizController";
import { hasRole } from "../middlewares/hasRole.ts";
import { Roles } from "../constants/Roles";

const quizRoutes = express.Router();

quizRoutes.get("/:id", QuizController.getQuizById);
quizRoutes.get("/", QuizController.listAllQuizzes);
quizRoutes.get("/journey/:journeyId", QuizController.listQuizzesOfJourney);
quizRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuizController.storeQuiz
);
quizRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuizController.updateQuiz
);
quizRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuizController.deleteQuiz
);

export default quizRoutes;
