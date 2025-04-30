import express from "express";
import { CourseController } from "../controllers/CourseController";
import { UserCourseController } from "../controllers/UserCourseController";

const courseRoutes = express.Router();

courseRoutes.get("/", CourseController.listCourses);
courseRoutes.get("/:courseId/students", CourseController.getStudentsOfCourse);
courseRoutes.get("/:courseId", CourseController.getCourse);
courseRoutes.post("/", CourseController.storeCourse);

courseRoutes.post("/:courseId/students/:userId", UserCourseController.registerUserToCourse);
courseRoutes.delete("/:courseId/students/:userId", UserCourseController.removeUserFromCourse);

export default courseRoutes;
