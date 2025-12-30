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



  app.post("/text", async (req, res) => {
  const { text } = req.body;
  
  try {
    // Purana text delete karo
    await supabase.from('simple_texts').delete().neq('id', 0);
    
    // Naya text dal do
    const { data, error } = await supabase
      .from('simple_texts')
      .insert([{ content: text }])
      .select();
    
    if (error) throw error;
    
    // BILKUL FIXED URL - NO ID!
    res.json({ 
      success: true, 
      url: `http://localhost:5173/text`  // Same URL hamesha!
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Har request pe expired delete karo
app.get("/text", async (req, res) => {
  // Pehle expired delete karo
  
  // Phir latest text lao
  const { data, error } = await supabase
    .from('simple_texts')
    .select('*')
    .order('id', { ascending: true })
    .limit(1)
    
  if (error || !data || data.length === 0) {
    return res.status(404).json({ error: 'No text available' });
  }
  
  res.status(200).json({ content: data[0].content });
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
