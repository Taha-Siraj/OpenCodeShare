import { supabase } from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

// --- UPLOAD ---
export const upload = async (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const savedFiles = [];
    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) {
        return res.status(400).json({ error: `${file.originalname} exceeds 50MB limit` });
      }

      const storedName = `${uuidv4()}-${file.originalname}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(storedName, file.buffer, { contentType: file.mimetype });

      if (uploadError) {
        console.error("Storage upload error:", uploadError.message);
        throw uploadError;
      }

      const { error: dbError } = await supabase
        .from("file_metadata")
        .insert({
          stored_name: storedName,
          original_name: file.originalname,
          size: file.size,
          type: file.mimetype,
        });

      if (dbError) console.error("DB insert error:", dbError.message);

      savedFiles.push({
        name: file.originalname,
        stored_name: storedName,
        size: file.size,
        type: file.mimetype,
      });
    }

    res.json({ message: "Uploaded successfully", files: savedFiles });
  } catch (err) {
    console.error("Upload error:", err.message || err);
    res.status(500).json({ error: "Upload failed: " + (err.message || "Unknown error") });
  }
};

// --- GET FILES ---
export const getFiles = async (req, res) => {
  try {
    // Run cleanup asynchronously in background
    cleanupExpiredFiles().catch(console.error);

    const { data: dbFiles, error: dbError } = await supabase
      .from("file_metadata")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (!dbError && dbFiles && dbFiles.length > 0) {
      const files = dbFiles.map(f => ({
        stored_name: f.stored_name,
        original_name: f.original_name,
        size: f.size || 0,
        type: f.type || "",
        uploaded_at: f.created_at,
      }));
      return res.json(files);
    }

    res.json([]);
  } catch (err) {
    console.error("getFiles error:", err.message || err);
    res.json([]);
  }
};

// --- DOWNLOAD ---
export const downloadFile = async (req, res) => {
  try {
    const storedName = req.params.name;
    const { data, error } = await supabase.storage.from("files").download(storedName);

    if (error) return res.status(404).json({ error: "File not found" });

    const parts = storedName.split("-");
    const originalName = parts.length > 5 ? parts.slice(5).join("-") : storedName;

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Disposition", `attachment; filename="${originalName}"`);
    res.setHeader("Content-Type", data.type || "application/octet-stream");
    res.send(buffer);
  } catch (err) {
    console.error("Download error:", err.message || err);
    res.status(500).json({ error: "Server error" });
  }
};

// --- PREVIEW (inline) ---
export const previewFile = async (req, res) => {
  try {
    const storedName = req.params.name;
    const { data, error } = await supabase.storage.from("files").download(storedName);
    if (error) return res.status(404).json({ error: "File not found" });

    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Content-Type", data.type || "application/octet-stream");
    res.setHeader("Cache-Control", "public, max-age=30");
    res.send(buffer);
  } catch (err) {
    console.error("Preview error:", err.message || err);
    res.status(500).json({ error: "Server error" });
  }
};

// --- AUTO CLEANUP (30 seconds) ---
export const cleanupExpiredFiles = async () => {
  try {
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString();

    const { data: expired, error: fetchError } = await supabase
      .from("file_metadata")
      .select("stored_name")
      .lt("created_at", thirtySecondsAgo);

    if (fetchError || !expired || expired.length === 0) return;

    // Delete from storage
    const names = expired.map(f => f.stored_name);
    const { error: storageError } = await supabase.storage.from("files").remove(names);
    if (storageError) console.error("Storage cleanup error:", storageError.message);

    // Delete from table
    const { error: dbError } = await supabase
      .from("file_metadata")
      .delete()
      .lt("created_at", thirtySecondsAgo);

    if (dbError) console.error("DB cleanup error:", dbError.message);
    else if (names.length > 0) console.log(`🗑️  Cleaned up ${names.length} expired file(s)`);
  } catch (err) {
    console.error("Cleanup error:", err.message || err);
  }
};
