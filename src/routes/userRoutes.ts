import express from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", UserController.listUsers);
userRoutes.get("/:id", UserController.getUser);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.delete("/:id", UserController.deleteUser);

export default userRoutes;
