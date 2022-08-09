import express from "express";
import {
    createElements,
    deleteElements,
    getElements,
    getStatus,
    updateElements,
} from "../controllers/elements.controller.js";

const router = express.Router();

router.get("/status", getStatus);

router.get("/", getElements);

router.post("/", createElements);

router.put("/", updateElements);

router.delete("/:id", deleteElements);

export default router;
