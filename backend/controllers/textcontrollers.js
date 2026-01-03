import { supabase } from "../config/supabaseClient.js";

export const createText = async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({
      error: "Text is required and cannot be empty",
    });
  }

  try {
    const { data, error } = await supabase
      .from("simple_texts")
      .insert([{ content: text }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getText = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("simple_texts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
