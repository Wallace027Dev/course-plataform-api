import express from "express";
import UserController from "../controllers/UserController";

const userRoutes = express.Router();

userRoutes.get("/", UserController.findAll);
userRoutes.get("/:id", UserController.findById);
userRoutes.post("/", UserController.store);


export default userRoutes;
