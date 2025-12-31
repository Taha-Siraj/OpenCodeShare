import "dotenv/config";
import express from "express";
import { supabase } from "./config/supabaseClient.js";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(express.json())
app.use(cors());
const port = 5000;

const upload = multer({
  limits: { fileSize: 50 * 1025 * 1024 }, // 50 MB limit
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
  } catch (error) {
    console.log(error);
  }
});





app.get('api/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
