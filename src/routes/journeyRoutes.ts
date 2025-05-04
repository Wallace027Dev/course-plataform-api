import express from 'express';
import { JourneyController } from "../controllers/JourneyController";

const journeyRoutes = express.Router();

journeyRoutes.get("/", JourneyController.listJourneysOfCourse);
journeyRoutes.get("/:courseId", JourneyController.listJourneysOfCourse);
journeyRoutes.get("/:journeyId", JourneyController.getJourneyById);
journeyRoutes.post("/", JourneyController.storeJourneyOnCourse);
journeyRoutes.put("/:journeyId", JourneyController.updateJourney);

export default journeyRoutes;