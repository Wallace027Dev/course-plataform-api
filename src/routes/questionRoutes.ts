import express from 'express';
import { QuestionController } from "../controllers/QuestionController";

const questionRoutes = express.Router();

questionRoutes.get("/", QuestionController.listAllQuestions);
questionRoutes.get("/:questionId", QuestionController.getQuestionsByQuestionId);
questionRoutes.post("/", QuestionController.storeQuestionsOnQuestion);
questionRoutes.put("/:questionId", QuestionController.updateQuestion);

export default questionRoutes;