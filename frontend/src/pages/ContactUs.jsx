import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { API } from "@/api";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Send, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ContactUs = () => {
    const { isDark } = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#9ca3af" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";
    const inputBg = isDark ? "#1c1f2e" : "#f8f9fb";
    const inputBdr = isDark ? "#2d3044" : "#dde1e8";

    const submit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !message.trim()) return toast.error("Email and message are required");
        try {
            setLoading(true);
            await API.post("/feedback", { name, email, message: `[Contact: ${subject || "General"}] ${message}`, rating: 5 });
            setSent(true);
            toast.success("Message sent successfully!");
        } catch (err) {
            toast.error(err?.response?.data?.error || "Failed to send");
        } finally { setLoading(false); }
    };

    const inputStyle = {
        width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 13, outline: "none",
        background: inputBg, border: `1px solid ${inputBdr}`, color: t1, transition: "border-color 0.2s",
    };
    const labelStyle = { fontSize: 12, fontWeight: 500, color: t2, marginBottom: 6, display: "block" };

    const infoCards = [
        { icon: Mail, title: "Email Us", detail: "contact@opencodeshare.com", color: "#10b981" },
        { icon: Clock, title: "Response Time", detail: "Within 24 hours", color: "#06b6d4" },
        { icon: MapPin, title: "Location", detail: "Available Worldwide", color: "#8b5cf6" },
    ];

    return (
        <div style={{ background: bg, minHeight: "100vh", padding: "40px 20px 60px", transition: "background 0.3s" }}>
            <Toaster position="bottom-center" />
            <Helmet>
                <title>Contact Us — OpenCodeShare</title>
                <meta name="description" content="Get in touch with OpenCodeShare. Send us your questions, suggestions, or partnership inquiries. We respond within 24 hours." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/contact" />
            </Helmet>

            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, color: t1, marginBottom: 6 }}>
                        Get in <span style={{ color: "#10b981" }}>Touch</span>
                    </h1>
                    <p style={{ fontSize: 14, color: t2 }}>Questions, suggestions, or partnerships — we'd love to hear from you.</p>
                </div>

                {/* Info Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 24 }} className="contactInfoGrid">
                    {infoCards.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <div key={i} style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                                borderRadius: 14, background: cardBg, border: `1px solid ${bdr}`,
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: `${c.color}15`,
                                }}>
                                    <Icon size={18} style={{ color: c.color }} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 600, color: t1, marginBottom: 2 }}>{c.title}</p>
                                    <p style={{ fontSize: 12, color: t2 }}>{c.detail}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Form */}
                <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: 24 }}>
                    {sent ? (
                        <div style={{ textAlign: "center", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <CheckCircle2 size={44} style={{ color: "#10b981", marginBottom: 14 }} />
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: t1, marginBottom: 6 }}>Message Sent!</h2>
                            <p style={{ fontSize: 14, color: t2, marginBottom: 20 }}>We'll get back to you within 24 hours.</p>
                            <button onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }} style={{
                                padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                                background: "#10b981", color: "#fff", border: "none", cursor: "pointer",
                            }}>Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={submit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="contactFormRow">
                                <div>
                                    <label style={labelStyle}>Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email *</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@gmail.com" style={inputStyle} required />
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={labelStyle}>Subject</label>
                                <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                                    <option value="">Select a topic</option>
                                    <option value="General">General Inquiry</option>
                                    <option value="Bug">Bug Report</option>
                                    <option value="Feature">Feature Request</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Advertising">Advertising</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={labelStyle}>Message *</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tell us what's on your mind..."
                                    rows={6} style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} required />
                            </div>

                            <button type="submit" disabled={loading} style={{
                                width: "100%", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 600,
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                background: "#10b981", color: "#fff", border: "none", cursor: "pointer",
                                opacity: loading ? 0.5 : 1,
                            }}>
                                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send Message</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
        @media (min-width: 640px) { .contactInfoGrid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 480px) { .contactFormRow { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
};

export default ContactUs;
