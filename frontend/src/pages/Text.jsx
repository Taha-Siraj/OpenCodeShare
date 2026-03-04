import { API } from "@/api";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { Send, Copy, Check, Clock, Loader2, RefreshCw } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Text = () => {
    const [input, setInput] = useState("");
    const [texts, setTexts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [copiedId, setCopiedId] = useState(null);
    const { isDark } = useTheme();

    const submit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return toast.error("Enter some text first");
        try {
            setLoading(true);
            await API.post("/create", { text: input });
            toast.success("Shared successfully!");
            setInput("");
            load();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const load = async () => {
        try {
            setFetching(true);
            const r = await API.get("/get");
            setTexts(r.data);
        } catch (e) {
            console.log(e);
        } finally {
            setFetching(false);
        }
    };

    const copy = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Copied!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    useEffect(() => { load(); }, []);

    const bg = isDark ? "bg-[#0b0d11]" : "bg-[#f4f6f9]";
    const card = isDark ? "bg-[#161923] border-[#252836]" : "bg-white border-[#e2e6ed]";
    const textMain = isDark ? "text-[#e4e8f0]" : "text-[#1a1d26]";
    const textSub = isDark ? "text-[#6b7280]" : "text-[#6b7280]";
    const inputBg = isDark ? "bg-[#1c1f2e] border-[#2d3044] text-[#d1d5e0] placeholder:text-[#4a4f5e]" : "bg-[#f8f9fb] border-[#dde1e8] text-[#1a1d26] placeholder:text-[#9ca3af]";

    return (
        <div className={`min-h-screen ${bg}`} style={{ padding: "40px 20px" }}>
            <Toaster position="bottom-center" />
            <Helmet>
                <title>Share Text Snippets — OpenCodeShare</title>
                <meta name="description" content="Paste and share code snippets or text instantly. No sign-up required. Free text sharing tool for developers." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/text" />
            </Helmet>

            {/* Container - centered */}
            <div style={{ maxWidth: 900, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <h1 className={textMain} style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
                        Share a <span style={{ color: "#10b981" }}>Snippet</span>
                    </h1>
                    <p className={textSub} style={{ fontSize: 14 }}>
                        Paste code or text and share it instantly.
                    </p>
                </div>

                {/* Form Card */}
                <form onSubmit={submit} className={card} style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 16, padding: 20, marginBottom: 28 }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your text or code here…"
                        rows={7}
                        className={inputBg}
                        style={{
                            width: "100%",
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderRadius: 12,
                            padding: 16,
                            fontSize: 13,
                            fontFamily: "monospace",
                            lineHeight: 1.7,
                            resize: "none",
                            outline: "none",
                            display: "block",
                        }}
                    />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                        <span className={textSub} style={{ fontSize: 12 }}>{input.length} chars</span>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 22px",
                                borderRadius: 12,
                                fontSize: 13,
                                fontWeight: 600,
                                background: "#10b981",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                opacity: loading ? 0.5 : 1,
                            }}
                        >
                            {loading ? <><Loader2 size={14} className="animate-spin" /> Sharing…</> : <><Send size={14} /> Publish</>}
                        </button>
                    </div>
                </form>

                {/* Snippets Section */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <h3 className={textMain} style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                            <Clock size={14} style={{ color: "#10b981" }} />
                            Recent Snippets
                        </h3>
                        <button onClick={load} className={textSub} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "inherit" }}>
                            <RefreshCw size={11} /> Refresh
                        </button>
                    </div>

                    {fetching ? (
                        <div className={card} style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 16, padding: "50px 0", display: "flex", justifyContent: "center" }}>
                            <Loader2 size={20} className={`animate-spin ${textSub}`} />
                        </div>
                    ) : texts.length === 0 ? (
                        <div className={card} style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 16, padding: "50px 20px", textAlign: "center" }}>
                            <p className={textSub} style={{ fontSize: 14, fontWeight: 500 }}>No snippets yet</p>
                            <p className={textSub} style={{ fontSize: 12, marginTop: 4 }}>Publish your first one above</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {texts.map((t, i) => {
                                const id = t.id || i;
                                return (
                                    <div key={id} className={`group ${card}`} style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 16, padding: 16 }}>
                                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                            <pre className={isDark ? "text-[#c8cdd6]" : "text-[#374151]"} style={{ flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, margin: 0, overflow: "hidden" }}>
                                                {t.content}
                                            </pre>
                                            <button
                                                onClick={() => copy(t.content, id)}
                                                title="Copy"
                                                className="opacity-0 group-hover:opacity-100"
                                                style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", cursor: "pointer", color: "#6b7280", transition: "opacity 0.2s" }}
                                            >
                                                {copiedId === id ? <Check size={14} style={{ color: "#10b981" }} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className={textSub} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${isDark ? "#252836" : "#eef0f4"}` }}>
                                            <span>{moment(t.created_at).fromNow()}</span>
                                            <span>{t.content?.length} chars</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Text;
