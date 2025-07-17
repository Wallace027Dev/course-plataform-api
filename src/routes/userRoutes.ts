import express from "express";
import { UserController } from "../controllers/UserController";
import { Roles } from "../constants/Roles";
import { hasRole } from "../middlewares/hasRole.ts";

const userRoutes = express.Router();

userRoutes.get("/", UserController.listUsers);
userRoutes.get("/:id", UserController.getUser);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.delete("/:id", hasRole([Roles.ADMIN]), UserController.deleteUser);

export default userRoutes;
