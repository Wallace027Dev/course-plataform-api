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

// ROTAS DE MATRICULAS EM CURSOS
courseRoutes.post("/:courseId/students/:userId", UserCourseController.registerUserToCourse);
courseRoutes.delete("/:courseId/students/:userId", UserCourseController.removeUserFromCourse);

// ROTAS DE JORNADAS DE UM CURSO
courseRoutes.get("/journeys/:journeyId", JourneyController.getJourneyById);
courseRoutes.get("/:courseId/journeys", JourneyController.listJourneysOfCourse);
courseRoutes.post("/:courseId/journeys", JourneyController.storeJourneyOnCourse);

export default courseRoutes;
