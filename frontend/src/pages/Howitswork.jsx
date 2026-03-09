import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Upload, Shield, Download, ArrowRight, HardDrive, Globe, Zap } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const HowItWorks = () => {
    const { isDark } = useTheme();
    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#6b7280" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";

    const steps = [
        { icon: Upload, color: "#10b981", num: "01", title: "Upload or Paste", desc: "Select files (up to 50MB) or paste text. Your content is instantly processed and ready to share." },
        { icon: Shield, color: "#06b6d4", num: "02", title: "Secure Transfer", desc: "Data is transmitted securely. Works on any network — WiFi, cellular, or wired connections." },
        { icon: Download, color: "#f59e0b", num: "03", title: "Instant Access", desc: "Anyone can access and download the shared content immediately. No account needed." },
    ];

    const stats = [
        { icon: HardDrive, label: "Payload Limit", value: "50 MB / File" },
        { icon: Globe, label: "Network", value: "Cross-Device" },
        { icon: Zap, label: "Speed", value: "Real-Time" },
    ];

    return (
        <div style={{ background: bg, minHeight: "100vh", padding: "40px 20px 60px", transition: "background 0.3s" }}>
            <Helmet>
                <title>How It Works — OpenCodeShare</title>
                <meta name="description" content="Learn how OpenCodeShare works in 3 simple steps. Upload, share, and access files instantly with no sign-up." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/how-it-works" />
            </Helmet>

            <div style={{ maxWidth: 620, margin: "0 auto" }}>
                {}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
                        borderRadius: 50, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                        textTransform: "uppercase", marginBottom: 14,
                        background: isDark ? "rgba(16,185,129,0.1)" : "#ecfdf5",
                        color: "#10b981", border: `1px solid ${isDark ? "rgba(16,185,129,0.15)" : "#d1fae5"}`,
                    }}>
                        ⚡ Protocol
                    </div>
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, color: t1, marginBottom: 8 }}>
                        How <span style={{ color: "#10b981" }}>OpenCodeShare</span> Works
                    </h1>
                    <p style={{ fontSize: 14, color: t2 }}>Three simple steps to share anything securely.</p>
                </div>

                {}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8,
                    padding: 16, borderRadius: 14, marginBottom: 28,
                    background: cardBg, border: `1px solid ${bdr}`,
                }}>
                    {stats.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} style={{ textAlign: "center", padding: "8px 4px" }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                                    <Icon size={12} style={{ color: t2 }} />
                                    <span style={{ fontSize: 10, color: t2, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>{s.label}</span>
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: t1 }}>{s.value}</span>
                            </div>
                        );
                    })}
                </div>

                {}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{
                                    display: "flex", alignItems: "flex-start", gap: 16, padding: 20,
                                    borderRadius: 14, background: cardBg, border: `1px solid ${bdr}`,
                                    transition: "all 0.2s",
                                }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: `${s.color}15`,
                                }}>
                                    <Icon size={18} style={{ color: s.color }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: t1, marginBottom: 4 }}>{s.title}</h3>
                                    <p style={{ fontSize: 13, color: t2, lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: isDark ? "#374151" : "#d1d5db", flexShrink: 0 }}>{s.num}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {}
                <div style={{ textAlign: "center" }}>
                    <Link to="/text" style={{
                        display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
                        borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none",
                        background: "#10b981", color: "#fff", boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
                    }}>
                        Try It Now <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
