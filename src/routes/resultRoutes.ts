import express from 'express';
import { ResultController } from "../controllers/ResultController";

const resultRoutes = express.Router();

resultRoutes.get("/", ResultController.listAllResults);
resultRoutes.get("/:id", ResultController.getResultById);
resultRoutes.post("/", ResultController.storeResult);
resultRoutes.put("/:id", ResultController.updateResult);
resultRoutes.delete("/:id", ResultController.deleteResult);

export default resultRoutes;