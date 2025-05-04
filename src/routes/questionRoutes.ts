import express from 'express';
import { QuestionController } from "../controllers/QuestionController";

const questionRoutes = express.Router();

questionRoutes.get("/", QuestionController.listAllQuestions);
questionRoutes.get("/:id", QuestionController.getQuestionsById);
questionRoutes.post("/", QuestionController.storeQuestion);
questionRoutes.put("/:questionId", QuestionController.updateQuestion);

export default questionRoutes;