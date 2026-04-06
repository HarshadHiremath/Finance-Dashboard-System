import express from "express";
import { getDashboardSummary } from "../controllers/dashboard-controller.js";
import { protect } from "../middleware/auth-middleware.js";
import { authorize } from "../middleware/role-middleware.js";

const router = express.Router();

router.get("/", protect, authorize("Admin","Analyst"), getDashboardSummary);

export default router;