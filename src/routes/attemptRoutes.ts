import express from 'express';
import { AttemptController } from "../controllers/AttemptController";

const attemptRoutes = express.Router();

attemptRoutes.get("/", AttemptController.listAllAttempts);
attemptRoutes.get("/:attemptId", AttemptController.getAttemptsByAttemptId);
attemptRoutes.post("/", AttemptController.storeAttemptsOnAttempt);

export default attemptRoutes;