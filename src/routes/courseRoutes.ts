import express from "express";
import { CourseController } from "../controllers/CourseController";

const courseRoutes = express.Router();

courseRoutes.get("/", CourseController.listCourses);
courseRoutes.get("/:id/students", CourseController.getStudentsOfCourseId);
courseRoutes.get("/:id", CourseController.getCourseById);
courseRoutes.post("/", CourseController.storeCourse);
courseRoutes.put("/:id", CourseController.updateCourse);
courseRoutes.delete("/:id", CourseController.deleteCourse);

export default courseRoutes;
