import express from 'express';
import { JourneyController } from "../controllers/JourneyController";

const journeyRoutes = express.Router();

journeyRoutes.get("/", JourneyController.listJourneysOfCourse);
journeyRoutes.get("/course/:courseId", JourneyController.listJourneysOfCourse);
journeyRoutes.get("/:id", JourneyController.getJourneyById);
journeyRoutes.post("/", JourneyController.storeJourneyOnCourse);
journeyRoutes.put("/:id", JourneyController.updateJourney);
journeyRoutes.delete("/:id", JourneyController.deleteJourney);

export default journeyRoutes;