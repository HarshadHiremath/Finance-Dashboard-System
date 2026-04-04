import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction-controller.js";
import {protect} from "../middleware/auth-middleware.js";

const router = express.Router();

// CRUD Routes
router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;