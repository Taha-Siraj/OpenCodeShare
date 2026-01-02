import express from "express";
import { supabase } from "../config/supabaseClient.js";
export const router = express.Router();

router.post("/text", async (req, res) => {
  const { text } = req.body;

  if(!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required and cannot be empty." });
  }
  try {

    const { data, error } = await supabase
      .from("simple_texts")
      .insert([{ content: text }])
      .select()
      .single;

    if (error) throw error;

    res.json({
      success: true,
      content: data[0].content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/text", async (req, res) => {
  const { data, error } = await supabase
    .from("simple_texts")
    .select("*")
    .order("id", { ascending: true })
    .limit(1);

  if (error || !data || data.length === 0) {
    return res.status(404).json({ error: "No text available" });
  }

  res.status(200).json({ content: data[0].content });
});
