import { API } from "@/api";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { Upload, Download, Trash2, X, Loader2, RefreshCw, CloudUpload, CheckCircle2, FileText, File as FileIcon, Image, FileCode, Film, Music, Archive, HardDrive, Eye } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/supabase";
import { v4 as uuidv4 } from "uuid";

const BASE = API.defaults.baseURL;

const getIcon = (t) => {
    if (!t) return { icon: FileIcon, color: "#9ca3af", bg: "#f3f4f6", label: "FILE" };
    if (t.startsWith("image/")) return { icon: Image, color: "#ec4899", bg: "#fdf2f8", label: "IMG" };
    if (t.startsWith("video/")) return { icon: Film, color: "#8b5cf6", bg: "#f5f3ff", label: "VID" };
    if (t.startsWith("audio/")) return { icon: Music, color: "#10b981", bg: "#ecfdf5", label: "MP3" };
    if (/zip|rar|tar|gz|7z/.test(t)) return { icon: Archive, color: "#f59e0b", bg: "#fffbeb", label: "ZIP" };
    if (/pdf/.test(t)) return { icon: FileText, color: "#ef4444", bg: "#fef2f2", label: "PDF" };
    if (/doc|word/.test(t)) return { icon: FileText, color: "#3b82f6", bg: "#eff6ff", label: "DOC" };
    if (/text|plain/.test(t)) return { icon: FileText, color: "#6b7280", bg: "#f9fafb", label: "TXT" };
    if (/javascript|json|html|css|xml|code/.test(t)) return { icon: FileCode, color: "#06b6d4", bg: "#ecfeff", label: "CODE" };
    return { icon: FileIcon, color: "#9ca3af", bg: "#f3f4f6", label: "FILE" };
};

const fmtSize = (b) => {
    if (!b) return "0 B";
    const k = 1024, s = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return (b / Math.pow(k, i)).toFixed(1) + " " + s[i];
};

const isImage = (t) => t && t.startsWith("image/");

const FilePage = () => {
    const [files, setFiles] = useState([]);
    const [queue, setQueue] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [drag, setDrag] = useState(false);
    const [preview, setPreview] = useState(null);
    const ref = useRef(null);
    const { isDark } = useTheme();

    const load = async () => {
        try { setLoading(true); const r = await API.get("/files"); setFiles(r.data); }
        catch { toast.error("Failed to load files"); }
        finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const add = (list) => {
        const ok = list.filter((f) => { if (f.size > 50 * 1024 * 1024) { toast.error(`${f.name} exceeds 50MB`); return false; } return true; });
        setQueue((p) => [...p, ...ok]);
    };

    const upload_ = async () => {
        if (!queue.length) return toast.error("Select files first");
        try {
            setUploading(true);
            const savedFiles = [];

            for (const file of queue) {
                // Remove special characters to prevent Supabase URL/CORS errors
                const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                const storedName = `${uuidv4()}-${safeName}`;

                // 1. Direct upload to Supabase (Bypasses Vercel 4.5MB limit!)
                const { error: uploadError } = await supabase.storage
                    .from("files")
                    .upload(storedName, file, { contentType: file.type });

                if (uploadError) throw uploadError;

                // 2. Save metadata directly to Supabase DB
                const { error: dbError } = await supabase
                    .from("file_metadata")
                    .insert({
                        stored_name: storedName,
                        original_name: file.name,
                        size: file.size,
                        type: file.type || "application/octet-stream",
                    });

                if (dbError) throw dbError;

                savedFiles.push({
                    stored_name: storedName,
                    original_name: file.name,
                    size: file.size,
                    type: file.type || "application/octet-stream",
                    uploaded_at: new Date().toISOString()
                });
            }

            toast.success(`${queue.length} file(s) uploaded!`);
            setFiles(prev => [...savedFiles, ...prev]);
            setQueue([]);
            // Still call API to trigger background cleanup silently
            API.get("/files").catch(() => { });
        } catch (err) {
            console.error("Upload error:", err);
            toast.error(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const dl = (stored, original) => {
        const a = document.createElement("a");
        a.href = `${BASE}/download/${stored}`;
        a.download = original || stored;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        toast.success("Downloading…");
    };

    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#6b7280" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";

    return (
        <div style={{ background: bg, minHeight: "100vh", padding: "40px 20px", transition: "background 0.3s" }}>
            <Toaster position="bottom-center" />
            <Helmet>
                <title>Upload & Share Files — OpenCodeShare</title>
                <meta name="description" content="Upload and share files up to 50MB instantly. All formats supported. Auto-deletes after 30 seconds." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/files" />
            </Helmet>

            {/* Image Preview Modal */}
            {preview && (
                <div onClick={() => setPreview(null)} style={{
                    position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer",
                }}>
                    <img src={`${BASE}/preview/${preview.stored_name}`} alt={preview.original_name}
                        style={{ maxWidth: "90%", maxHeight: "85vh", borderRadius: 12, objectFit: "contain" }}
                        onClick={(e) => e.stopPropagation()} />
                    <button onClick={() => setPreview(null)} style={{
                        position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <X size={20} />
                    </button>
                </div>
            )}

            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, color: t1, marginBottom: 6 }}>
                        Upload & Share <span style={{ color: "#10b981" }}>Files</span>
                    </h1>
                    <p style={{ fontSize: 14, color: t2 }}>Max 50MB · All formats · Auto-deletes after 30s</p>
                </div>

                {/* Dropzone */}
                <div style={{
                    borderWidth: 2, borderStyle: "dashed", borderRadius: 16, padding: "36px 20px",
                    borderColor: drag ? "#10b981" : bdr, textAlign: "center", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    marginBottom: 20, transition: "all 0.2s",
                    background: drag ? (isDark ? "#0f1f1a" : "#f0fdf4") : cardBg,
                }}
                    onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDrag(false); }}
                    onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files?.length) add(Array.from(e.dataTransfer.files)); }}
                    onClick={() => ref.current?.click()}>
                    <input type="file" ref={ref} onChange={(e) => { add(Array.from(e.target.files)); e.target.value = ""; }} multiple style={{ display: "none" }} />
                    <div style={{
                        width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                        background: drag ? "#10b981" : isDark ? "#1c1f2e" : "#f3f4f6",
                        marginBottom: 10,
                    }}>
                        <Upload size={20} style={{ color: drag ? "#fff" : "#9ca3af" }} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: t1, marginBottom: 4 }}>{drag ? "Drop here!" : "Drag & drop files"}</p>
                    <p style={{ fontSize: 12, color: t2 }}>or <span style={{ color: "#10b981", fontWeight: 500 }}>browse from device</span></p>
                </div>

                {/* Upload Queue */}
                {queue.length > 0 && (
                    <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: t1, display: "flex", alignItems: "center", gap: 8 }}>
                                <HardDrive size={14} style={{ color: "#10b981" }} /> Ready ({queue.length})
                            </span>
                            <button onClick={() => setQueue([])} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}>
                                <Trash2 size={11} /> Clear
                            </button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
                            {queue.map((f, i) => {
                                const fi = getIcon(f.type);
                                const Icon = fi.icon;
                                return (
                                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: isDark ? "#1c1f2e" : "#f8f9fb" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
                                            <Icon size={16} style={{ color: fi.color, flexShrink: 0 }} />
                                            <div style={{ minWidth: 0, flex: 1 }}>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: t1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                                                <p style={{ fontSize: 11, color: t2 }}>{fmtSize(f.size)}</p>
                                            </div>
                                        </div>
                                        <button onClick={(e) => { e.stopPropagation(); setQueue((p) => p.filter((_, j) => j !== i)); }}
                                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={upload_} disabled={uploading} style={{
                            width: "100%", marginTop: 12, padding: "12px 0", borderRadius: 12,
                            fontSize: 13, fontWeight: 600, background: "#10b981", color: "#fff",
                            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            opacity: uploading ? 0.5 : 1,
                        }}>
                            {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : <><CloudUpload size={14} /> Upload {queue.length} file{queue.length > 1 ? "s" : ""}</>}
                        </button>
                    </div>
                )}

                {/* Shared Files */}
                <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: t1, display: "flex", alignItems: "center", gap: 8 }}>
                            <CheckCircle2 size={14} style={{ color: "#10b981" }} /> Shared Files
                        </span>
                        <button onClick={load} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: t2 }}>
                            <RefreshCw size={11} /> Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}>
                            <Loader2 size={20} className="animate-spin" style={{ color: t2 }} />
                        </div>
                    ) : files.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "50px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <FileIcon size={28} style={{ color: isDark ? "#374151" : "#d1d5db", marginBottom: 8 }} />
                            <p style={{ fontSize: 14, fontWeight: 500, color: t2 }}>No files yet</p>
                            <p style={{ fontSize: 12, color: t2, marginTop: 4 }}>Upload your first file above</p>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }} className="filesGrid">
                            {files.map((f, i) => {
                                const fi = getIcon(f.type);
                                const Icon = fi.icon;
                                const img = isImage(f.type);

                                return (
                                    <div key={i} style={{
                                        borderRadius: 14, overflow: "hidden",
                                        border: `1px solid ${isDark ? "#1e2030" : "#eef0f4"}`,
                                        background: isDark ? "#12141c" : "#fafbfc",
                                        transition: "all 0.2s",
                                    }}>
                                        {/* Preview area */}
                                        {img ? (
                                            <div
                                                onClick={() => setPreview(f)}
                                                style={{
                                                    width: "100%", height: 160, cursor: "pointer", position: "relative",
                                                    background: isDark ? "#0d0f14" : "#f3f4f6",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    overflow: "hidden",
                                                }}>
                                                <img
                                                    src={`${BASE}/preview/${f.stored_name}`}
                                                    alt={f.original_name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    onError={(e) => { e.target.style.display = "none"; }}
                                                />
                                                <div style={{
                                                    position: "absolute", inset: 0,
                                                    background: "rgba(0,0,0,0)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    transition: "background 0.2s",
                                                }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.3)"}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(0,0,0,0)"}>
                                                    <Eye size={22} style={{ color: "#fff", opacity: 0 }} className="peekIcon" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{
                                                width: "100%", height: 100, display: "flex", flexDirection: "column",
                                                alignItems: "center", justifyContent: "center",
                                                background: isDark ? fi.bg.replace("#f", "#1") : fi.bg,
                                            }}>
                                                <Icon size={28} style={{ color: fi.color, marginBottom: 6 }} />
                                                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: fi.color, textTransform: "uppercase" }}>{fi.label}</span>
                                            </div>
                                        )}

                                        {/* Info */}
                                        <div style={{ padding: "12px 14px" }}>
                                            <p style={{
                                                fontSize: 13, fontWeight: 500, color: t1, marginBottom: 4,
                                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            }}>{f.original_name}</p>
                                            <p style={{ fontSize: 11, color: t2, marginBottom: 10 }}>
                                                {fmtSize(f.size)}{f.uploaded_at && ` · ${moment(f.uploaded_at).fromNow()}`}
                                            </p>
                                            <button onClick={() => dl(f.stored_name, f.original_name)} style={{
                                                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                                padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
                                                background: isDark ? "#1c1f2e" : "#f3f4f6",
                                                border: `1px solid ${isDark ? "#2d3044" : "#e5e7eb"}`,
                                                color: isDark ? "#9ca3af" : "#6b7280",
                                                transition: "all 0.15s",
                                            }}>
                                                <Download size={12} /> Download
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media (min-width: 480px) { .filesGrid { grid-template-columns: 1fr 1fr !important; } }
        @media (min-width: 768px) { .filesGrid { grid-template-columns: 1fr 1fr 1fr !important; } }
      `}</style>
        </div>
    );
};

export default FilePage;
