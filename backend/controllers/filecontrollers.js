import express from "express";
import { supabase } from "../config/supabaseClient.js";
export const router = express.Router();

router.post("/text", async (req, res) => {
  const { text } = req.body;

  try {
    await supabase.from("simple_texts").delete().neq("id", 0);

    const { data, error } = await supabase
      .from("simple_texts")
      .insert([{ content: text }])
      .select();

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
