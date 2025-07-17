import express from "express";
import { UserCourseController } from "../controllers/UserCourseController";

const userCourseRoutes = express.Router();

// ROTAS DE MATRICULAS EM CURSOS
userCourseRoutes.post(
  "/:courseId/students/:userId",
  UserCourseController.registerUserToCourse
);
userCourseRoutes.delete(
  "/:courseId/students/:userId",
  UserCourseController.removeUserFromCourse
);

export default userCourseRoutes;
