import { Router } from "express";

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
import { authenticated } from "../middlewares/authenticated";

const router = Router();

// Rotas públicas
router.use("/auth", authRoutes);

// Rotas privadas
router.use(authenticated);
router.use("/answers", answerRoutes);
router.use("/attempts", attemptRoutes);
router.use("/contents", contentRoutes);
router.use("/courses", courseRoutes);
router.use("/journeys", journeyRoutes);
router.use("/questions", questionRoutes);
router.use("/quizzes", quizRoutes);
router.use("/results", resultRoutes);
router.use("/register", userCourseRoutes);
router.use("/users", userRoutes);

export default router;
