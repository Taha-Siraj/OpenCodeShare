import express from "express";
import multer from "multer";
import { router } from "./textcontrollers";

export default express.Router()

const upload = multer({
  limits: { fileSize: 50 * 1025 * 1024 }, // 50 MB limit
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
  } catch (error) {
    console.log(error);
  }
});