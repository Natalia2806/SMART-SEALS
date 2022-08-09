import express from "express";
import {createWorkers, deleteWorkers, getWorkers, updateWorkers} from "../controllers/workers.controller.js";

const router = express.Router();

router.get("/", getWorkers)

router.post("/", createWorkers)

router.put("/", updateWorkers)

router.delete("/:id", deleteWorkers)


export default router;