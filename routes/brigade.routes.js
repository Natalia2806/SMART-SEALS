import express from "express";
import { createBrigade, deleteBrigade, getBrigadistas, updateBrigade } from "../controllers/brigadista.controller.js";

const router = express.Router();

router.get("/", getBrigadistas)

router.post("/", createBrigade)

router.put("/", updateBrigade)

router.delete("/:id", deleteBrigade)

export default router;