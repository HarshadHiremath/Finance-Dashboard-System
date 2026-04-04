import express from "express";
import { loginUser, verifyToken } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/loginUser", loginUser);

router.get("/verifyToken", verifyToken);

export default router;