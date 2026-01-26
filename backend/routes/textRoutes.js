import express from "express";
import { createText, getText } from "../controllers/textcontrollers.js";

const router = express.Router();

router.post("/create", createText);
router.get("/get", getText);

export default router;
