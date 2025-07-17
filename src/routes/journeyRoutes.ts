import express from "express";
import { JourneyController } from "../controllers/JourneyController";
import { hasRole } from "../middlewares/hasRole.ts";
import { Roles } from "../constants/Roles";

const journeyRoutes = express.Router();

journeyRoutes.get("/", JourneyController.listAllJourneys);
journeyRoutes.get("/course/:courseId", JourneyController.listJourneysOfCourse);
journeyRoutes.get("/:id", JourneyController.getJourneyById);
journeyRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  JourneyController.storeJourneyOnCourse
);
journeyRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  JourneyController.updateJourney
);
journeyRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  JourneyController.deleteJourney
);

export default journeyRoutes;
