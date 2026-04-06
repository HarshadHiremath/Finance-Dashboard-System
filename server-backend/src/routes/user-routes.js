import express from "express";
import { getAllUsers, updateUser, createUser, deleteUser } from "../controllers/user-controller.js";
import {protect} from "../middleware/auth-middleware.js";
import { authorize } from "../middleware/role-middleware.js";

const router = express.Router();

router.post("/createUser", protect, authorize("Admin"), createUser);

router.get("/getAllUsers", protect, authorize("Admin"), getAllUsers);

router.put("/:id", protect, authorize("Admin"), updateUser);

router.delete("/:id", protect, authorize("Admin") ,deleteUser);

export default router;