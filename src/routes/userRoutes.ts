import express from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", UserController.findAll);
userRoutes.get("/:id", UserController.findById);

export default userRoutes;
