import express from "express";
import { getAllUsers, updateUser, createUser } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/createUser", createUser);

router.get("/getAllUsers", getAllUsers);

router.put("/:id", updateUser);

export default router;