import express from "express";
import path from "path";
import { authenticated } from "../middlewares/authenticated";
import { errorHandler } from "../middlewares/error";
import { logRequest } from "../middlewares/logger";

import authRoutes from "./authRoutes";
import courseRoutes from "./courseRoutes";
import contentRoutes from "./contentRoutes";
import userRoutes from "./userRoutes";
import quizRoutes from "./quizRoutes";
import answerRoutes from "./answerRoutes";
import attemptRoutes from "./attemptRoutes";
import journeyRoutes from "./journeyRoutes";
import questionRoutes from "./questionRoutes";
import resultRoutes from "./resultRoutes";
import userCourseRoutes from "./userCourseRoutes";

const router = express.Router();
router.use(express.json());

// Middleware de log
router.use(logRequest());

// Rotas públicas
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// Middleware de autenticação global
router.use(authenticated);

// Rotas privadas
router.use("/answers", answerRoutes);
router.use("/attempts", attemptRoutes);
router.use("/contents", contentRoutes);
router.use("/journeys", journeyRoutes);
router.use("/questions", questionRoutes);
router.use("/quizzes", quizRoutes);
router.use("/results", resultRoutes);
router.use("/register", userCourseRoutes);
router.use("/users", userRoutes);

// Middleware de tratamento de erros
router.use(errorHandler());

export default router;
