import express from "express";
import { QuestionController } from "../controllers/QuestionController";
import { hasRole } from "../middlewares/hasRole.ts";
import { Roles } from "../constants/Roles";

const questionRoutes = express.Router();

questionRoutes.get("/", QuestionController.listAllQuestions);
questionRoutes.get("/:id", QuestionController.getQuestionsById);
questionRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuestionController.storeQuestion
);
questionRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuestionController.updateQuestion
);
questionRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  QuestionController.deleteQuestion
);

export default questionRoutes;
