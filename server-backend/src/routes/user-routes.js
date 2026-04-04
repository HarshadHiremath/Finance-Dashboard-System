import express from "express";
import { getAllUsers, updateUser, createUser, deleteUser } from "../controllers/user-controller.js";
import {protect} from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/createUser", protect, createUser);

router.get("/getAllUsers", protect, getAllUsers);

router.put("/:id", protect, updateUser);

router.delete("/:id", protect, deleteUser);

export default router;