import express from "express";
import { CourseController } from "../controllers/CourseController";
import { Roles } from "../constants/Roles";
import { hasRole } from "../middlewares/hasRole.ts";

const courseRoutes = express.Router();

courseRoutes.get("/", CourseController.listCourses);
courseRoutes.get("/:id/students", CourseController.getStudentsOfCourseId);
courseRoutes.get("/:id", CourseController.getCourseById);
courseRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  CourseController.storeCourse
);
courseRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  CourseController.updateCourse
);
courseRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  CourseController.deleteCourse
);

export default courseRoutes;
