import express from 'express';
import { AttemptController } from "../controllers/AttemptController";

const attemptRoutes = express.Router();

attemptRoutes.get("/", AttemptController.listAllAttempts);
attemptRoutes.get("/:id", AttemptController.getAttemptsById);
attemptRoutes.post("/", AttemptController.storeAttempt);
attemptRoutes.put("/:id", AttemptController.updateAttempt);
attemptRoutes.delete("/:id", AttemptController.deleteAttempt);

export default attemptRoutes;