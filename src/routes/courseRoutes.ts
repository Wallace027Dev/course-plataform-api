import express from "express";
import { CourseController } from "../controllers/CourseController";

const courseRoutes = express.Router();

courseRoutes.get("/", CourseController.listCourses);
courseRoutes.get("/:id/students", CourseController.getStudentsOfCourse);
courseRoutes.get("/:id", CourseController.getCourse);
courseRoutes.post("/", CourseController.storeCourse);

export default courseRoutes;
