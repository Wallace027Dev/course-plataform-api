import express from "express";
import { UserProgressController } from "../controllers/UserProgressController";

const userProgressRoutes = express.Router();

userProgressRoutes.get("/", UserProgressController.listAllUserProgresss);
userProgressRoutes.get("/:id", UserProgressController.getUserProgressById);
userProgressRoutes.post("/", UserProgressController.storeUserProgress);
userProgressRoutes.put("/:id", UserProgressController.updateUserProgress);
userProgressRoutes.delete("/:id", UserProgressController.deleteUserProgress);

export default userProgressRoutes;
