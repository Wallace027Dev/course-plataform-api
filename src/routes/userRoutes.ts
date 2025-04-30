import express from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", UserController.listUsers);
userRoutes.get("/:id", UserController.getUser);

export default userRoutes;
