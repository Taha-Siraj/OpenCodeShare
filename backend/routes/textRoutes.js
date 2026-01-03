import express from "express";
import { createText, getText } from "../controllers/textcontrollers.js";

const router = express.Router();

router.post("/text", createText);
router.get("/text", getText);

export default router;
