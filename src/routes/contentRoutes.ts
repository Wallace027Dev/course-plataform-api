import express from "express";

import { ContentController } from "../controllers/ContentController";
import { uploads } from "../helper/multerConfig";
import { hasRole } from "../middlewares/hasRole.ts";
import { Roles } from "../constants/Roles";

const contentRoutes = express.Router();

contentRoutes.get("/", ContentController.listAllContents);
contentRoutes.get("/:id", ContentController.getContentById);
contentRoutes.post(
  "/",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  uploads,
  ContentController.storeContent
);
contentRoutes.put(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  ContentController.updateContent
);
contentRoutes.delete(
  "/:id",
  hasRole([Roles.ADMIN, Roles.TEACHER]),
  ContentController.deleteContent
);

export default contentRoutes;
