import express from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);

export default authRoutes;
