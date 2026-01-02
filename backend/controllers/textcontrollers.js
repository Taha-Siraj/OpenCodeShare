import express from "express";
import { supabase } from "../config/supabaseClient.js";

export const router = express.Router();

/**
 * POST /text
 * Create a new public text
 */
router.post("/text", async (req, res) => {
  const { text } = req.body;

  // Validation
  if (!text || !text.trim()) {
    return res
      .status(400)
      .json({ error: "Text is required and cannot be empty." });
  }

  try {
    const { data, error } = await supabase
      .from("simple_texts")
      .insert([{ content: text }])
      .select()
      .single(); // ✅ function call

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /text
 * Fetch latest public texts
 */
router.get("/text", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("simple_texts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
