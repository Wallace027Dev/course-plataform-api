import { Router } from "express";
import { AnswerController } from "../controllers/AnswerController";
import { hasRole } from "../middlewares/hasRole.ts";
import { Roles } from "../constants/Roles";

const answerRoutes = Router();

answerRoutes.get("/", AnswerController.listAllAnswers);
answerRoutes.get("/:id", AnswerController.getAnswersById);
answerRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  AnswerController.storeAnswer
);
answerRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  AnswerController.updateAnswer
);
answerRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  AnswerController.deleteAnswer
);

export default answerRoutes;
