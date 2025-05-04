import express from "express";
import { CourseController } from "../controllers/CourseController";
import { JourneyController } from "../controllers/JourneyController";
import { UserCourseController } from "../controllers/UserCourseController";

const courseRoutes = express.Router();

// ROTAS DE CURSOS
courseRoutes.get("/", CourseController.listCourses);
courseRoutes.get("/:courseId/students", CourseController.getStudentsOfCourse);
courseRoutes.get("/:courseId", CourseController.getCourse);
courseRoutes.post("/", CourseController.storeCourse);

export default courseRoutes;
