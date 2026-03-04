import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { API } from "@/api";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Send, Star, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Feedback = () => {
    const { isDark } = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState("");

    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#6b7280" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";
    const inputBg = isDark ? "#1c1f2e" : "#f8f9fb";
    const inputBdr = isDark ? "#2d3044" : "#dde1e8";

    // Client-side email validation
    const validateEmail = (val) => {
        if (!val) { setEmailError(""); return; }

        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!re.test(val)) { setEmailError("Invalid email format"); return; }

        const domain = val.split("@")[1].toLowerCase();
        const blocked = ["tempmail.com", "guerrillamail.com", "mailinator.com", "yopmail.com", "throwaway.email", "temp-mail.org", "fakeinbox.com", "maildrop.cc", "10minutemail.com", "trashmail.com"];
        if (blocked.includes(domain)) {
            setEmailError("Temporary emails not allowed. Use Gmail, Outlook etc.");
            return;
        }

        const allowed = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com", "live.com", "protonmail.com", "zoho.com", "mail.com", "aol.com"];
        if (!allowed.includes(domain)) {
            setEmailError(`"${domain}" not accepted. Use Gmail, Outlook, Yahoo etc.`);
            return;
        }

        setEmailError("");
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return toast.error("Please write a message");
        if (rating === 0) return toast.error("Please select a rating");
        if (email && emailError) return toast.error(emailError);
        if (!email.trim()) return toast.error("Please enter your email");

        try {
            setLoading(true);
            const res = await API.post("/feedback", { name, email, message, rating });
            setSubmitted(true);
            toast.success(res.data?.message || "Feedback submitted! Thank you 🙏");
        } catch (err) {
            const msg = err?.response?.data?.error || "Something went wrong";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => { setName(""); setEmail(""); setMessage(""); setRating(0); setSubmitted(false); setEmailError(""); };

    const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
    const inputStyle = {
        width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, outline: "none",
        background: inputBg, border: `1px solid ${inputBdr}`, color: t1,
        transition: "border-color 0.2s",
    };
    const labelStyle = { fontSize: 12, fontWeight: 500, color: t2, marginBottom: 6, display: "block" };

    return (
        <div style={{ background: bg, minHeight: "100vh", padding: "40px 20px 60px", transition: "background 0.3s" }}>
            <Toaster position="bottom-center" />
            <Helmet>
                <title>Feedback — OpenCodeShare</title>
                <meta name="description" content="Share your thoughts and help us improve OpenCodeShare. Your feedback matters." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/feedback" />
            </Helmet>

            <div style={{ maxWidth: 500, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <h1 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 700, color: t1, marginBottom: 6 }}>
                        Share Your <span style={{ color: "#10b981" }}>Thoughts</span>
                    </h1>
                    <p style={{ fontSize: 14, color: t2 }}>Help us improve OpenCodeShare. Your feedback matters.</p>
                </div>

                <div style={{ padding: 24, borderRadius: 16, background: cardBg, border: `1px solid ${bdr}` }}>
                    {submitted ? (
                        <div style={{ textAlign: "center", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CheckCircle2 size={44} style={{ color: "#10b981", marginBottom: 14 }} />
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: t1, marginBottom: 6 }}>Thank You!</h2>
                            <p style={{ fontSize: 14, color: t2, marginBottom: 20 }}>Your feedback has been received. We'll review it soon.</p>
                            <button onClick={reset} style={{
                                padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                                background: "#10b981", color: "#fff", border: "none", cursor: "pointer",
                            }}>Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={submit}>
                            {/* Rating */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={labelStyle}>How's your experience? *</label>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button key={s} type="button"
                                            onClick={() => setRating(s)}
                                            onMouseEnter={() => setHover(s)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{
                                                width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                                                border: "none", cursor: "pointer", transition: "all 0.15s",
                                                background: s <= (hover || rating) ? "#fef3c7" : (isDark ? "rgba(255,255,255,0.04)" : "#f9fafb"),
                                                color: s <= (hover || rating) ? "#f59e0b" : (isDark ? "#4b5563" : "#d1d5db"),
                                            }}>
                                            <Star size={18} fill={s <= (hover || rating) ? "#f59e0b" : "none"} />
                                        </button>
                                    ))}
                                    {(hover || rating) > 0 && (
                                        <span style={{ fontSize: 12, fontWeight: 500, color: "#f59e0b", marginLeft: 8 }}>
                                            {labels[hover || rating]}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Name + Email */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="feedbackRow">
                                <div>
                                    <label style={labelStyle}>Name (optional)</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email *</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                                        placeholder="your@gmail.com"
                                        style={{ ...inputStyle, borderColor: emailError ? "#ef4444" : inputBdr }}
                                        required
                                    />
                                    {emailError && (
                                        <p style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{emailError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: 20 }}>
                                <label style={labelStyle}>Message *</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                                    placeholder="What do you think about OpenCodeShare? Any suggestions?"
                                    rows={5} style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} />
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={loading || !!emailError} style={{
                                width: "100%", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600,
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                background: "#10b981", color: "#fff", border: "none", cursor: "pointer",
                                opacity: (loading || !!emailError) ? 0.5 : 1, transition: "opacity 0.2s",
                            }}>
                                {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <><Send size={16} /> Submit Feedback</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <style>{`@media (max-width: 480px) { .feedbackRow { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
};

export default Feedback;
