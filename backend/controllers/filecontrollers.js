import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const upload = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const savedFiles = [];

    for (const file of files) {
      const fileName = `${uuidv4()}-${file.originalname}`;

      const { error } = await supabase.storage
        .from("files")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      savedFiles.push({
        name: file.originalname,
        stored_name: fileName,
        size: file.size,
        type: file.mimetype,
      });
    }

    res.json({
      message: "Uploaded successfully",
      files: savedFiles,
    });

  } catch (err) {
    console.error("Catch error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};




export const getFiles = async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .from("files")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch files" });
    }

    const files = data.map(file => ({
      name: file.name,
      size: file.metadata?.size || 0,
      uploaded_at: file.created_at,
    }));

    res.json(files);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
