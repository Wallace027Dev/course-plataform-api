import express from "express";

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
import uploadRoutes from "./uploadRoutes";

const routes = express.Router();

routes.use("/answers", answerRoutes);
routes.use("/attempts", attemptRoutes);
routes.use("/auth", authRoutes);
routes.use("/contents", contentRoutes);
routes.use("/courses", courseRoutes);
routes.use("/journeys", journeyRoutes);
routes.use("/questions", questionRoutes);
routes.use("/quizzes", quizRoutes);
routes.use("/results", resultRoutes);
routes.use("/register", userCourseRoutes);
routes.use("/users", userRoutes);
routes.use("/api/upload", uploadRoutes);

export default routes;
