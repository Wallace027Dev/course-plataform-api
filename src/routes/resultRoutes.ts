import express from 'express';
import { ResultController } from "../controllers/ResultController";

const resultRoutes = express.Router();

resultRoutes.get("/", ResultController.listAllResults);
resultRoutes.get("/:resultId", ResultController.getResultsByResultId);
resultRoutes.post("/", ResultController.storeResultsOnResult);
resultRoutes.put("/:resultId", ResultController.updateResult);

export default resultRoutes;