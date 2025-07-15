import express from "express";

import { ContentController } from "../controllers/ContentController";
import { uploads } from "../helper/multerConfig";

const contentRoutes = express.Router();

contentRoutes.get("/", ContentController.listAllContents);
contentRoutes.get("/:id", ContentController.getContentById);
contentRoutes.post("/", uploads, ContentController.storeContent);
contentRoutes.put("/:id", ContentController.updateContent);
contentRoutes.delete("/:id", ContentController.deleteContent);

export default contentRoutes;
