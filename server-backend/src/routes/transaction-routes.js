import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction-controller.js";
import {protect} from "../middleware/auth-middleware.js";
import { authorize } from "../middleware/role-middleware.js";

const router = express.Router();

// CRUD Routes
router.post("/", protect, authorize("Admin"), createTransaction);
router.get("/", protect, authorize("Admin","Analyst","Viewer"), getTransactions);
router.put("/:id", authorize("Admin"), protect, updateTransaction);
router.delete("/:id", authorize("Admin"), protect, deleteTransaction);

export default router;