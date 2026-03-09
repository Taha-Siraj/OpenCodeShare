import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Upload, Zap, Shield, Clock, Globe, Lock, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const up = (d = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.25, 0.1, 0.25, 1] } },
});

const Home = () => {
    const { isDark } = useTheme();
    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#6b7280" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";

    const features = [
        { icon: Zap, color: "#f59e0b", title: "Lightning Fast", desc: "Shared in milliseconds. Zero delays." },
        { icon: Shield, color: "#10b981", title: "Secure Transfer", desc: "Encrypted data. Content stays private." },
        { icon: Globe, color: "#06b6d4", title: "Cross Platform", desc: "Phone, tablet, desktop — any device." },
        { icon: Clock, color: "#8b5cf6", title: "Auto Cleanup", desc: "Files auto-delete after 30 seconds." },
        { icon: Upload, color: "#ef4444", title: "50MB Uploads", desc: "Large files. All formats supported." },
        { icon: Lock, color: "#3b82f6", title: "No Sign Up", desc: "Start instantly. Zero friction." },
    ];

    return (
        <div style={{ overflowX: "hidden" }}>
            <Helmet>
                <title>OpenCodeShare — Instant File & Text Sharing | Free & Open Source</title>
                <meta name="description" content="Share code snippets and files instantly across any device. No sign-up required. Free, fast, and secure file sharing for developers." />
                <meta name="keywords" content="code sharing, file sharing, text sharing, developer tools, free file upload, open source, instant share" />
                <meta property="og:title" content="OpenCodeShare — Instant File & Text Sharing" />
                <meta property="og:description" content="Share code snippets and files instantly. Free, fast, and secure." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://opencodeshare.vercel.app" />
            </Helmet>

            {}
            <section style={{ background: bg, padding: "60px 20px 50px", textAlign: "center", position: "relative", transition: "background 0.3s" }}>
                <motion.div initial="hidden" animate="show" style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <motion.div variants={up(0)} style={{
                        display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px",
                        borderRadius: 50, fontSize: 12, fontWeight: 500, marginBottom: 20,
                        background: isDark ? "rgba(16,185,129,0.1)" : "#ecfdf5",
                        color: "#10b981", border: `1px solid ${isDark ? "rgba(16,185,129,0.15)" : "#d1fae5"}`,
                    }}>
                        <div style={{ width: 6, height: 6, background: "#10b981", borderRadius: "50%" }} />
                        Open Source · Free Forever
                    </motion.div>

                    <motion.h1 variants={up(0.08)} style={{ fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 800, lineHeight: 1.2, color: t1, marginBottom: 14, letterSpacing: "-0.02em" }}>
                        Share Code & Files{" "}
                        <span style={{ background: "linear-gradient(90deg, #10b981, #0d9488, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Without Friction
                        </span>
                    </motion.h1>

                    <motion.p variants={up(0.16)} style={{ fontSize: "clamp(14px, 2vw, 16px)", color: t2, maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
                        OpenCodeShare lets you share text snippets and files instantly across any device. No sign-up required.
                    </motion.p>

                    <motion.div variants={up(0.24)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }} className="heroBtns">
                        <Link to="/text" style={{
                            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
                            borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none",
                            background: "#10b981", color: "#fff", boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
                            transition: "all 0.2s",
                        }}>
                            <FileText size={16} /> Share Text <ArrowRight size={14} />
                        </Link>
                        <Link to="/files" style={{
                            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
                            borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none",
                            color: isDark ? "#d1d5db" : "#374151",
                            background: isDark ? "rgba(255,255,255,0.06)" : "#fff",
                            border: `1px solid ${bdr}`, transition: "all 0.2s",
                        }}>
                            <Upload size={16} /> Share Files
                        </Link>
                    </motion.div>
                </motion.div>

                <style>{`@media (min-width: 480px) { .heroBtns { flex-direction: row !important; justify-content: center; } }`}</style>
            </section>

            {}
            <section style={{ background: bg, padding: "30px 20px 60px", transition: "background 0.3s" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: t1, marginBottom: 8 }}>Built for developers</h2>
                        <p style={{ fontSize: 14, color: t2 }}>Simple. Fast. Secure. Everything you need to share code.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="featuresGrid">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                    style={{
                                        padding: 20, borderRadius: 14, border: `1px solid ${bdr}`,
                                        background: cardBg, transition: "all 0.2s",
                                    }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, background: `${f.color}15` }}>
                                        <Icon size={18} style={{ color: f.color }} />
                                    </div>
                                    <h3 style={{ fontSize: 15, fontWeight: 600, color: t1, marginBottom: 4 }}>{f.title}</h3>
                                    <p style={{ fontSize: 13, color: t2, lineHeight: 1.5 }}>{f.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <style>{`
          @media (min-width: 480px) { .featuresGrid { grid-template-columns: 1fr 1fr !important; } }
          @media (min-width: 768px) { .featuresGrid { grid-template-columns: 1fr 1fr 1fr !important; } }
        `}</style>
            </section>

            {}
            <section style={{
                margin: "0 20px 40px", borderRadius: 20, padding: "36px 24px", textAlign: "center",
                background: "linear-gradient(135deg, #10b981, #0d9488)", color: "#fff",
                maxWidth: 800, marginLeft: "auto", marginRight: "auto",
            }}>
                <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, marginBottom: 6 }}>Ready to share?</h2>
                <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 20 }}>Pick your method and start in seconds.</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link to="/text" style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px",
                        borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none",
                        background: "#fff", color: "#065f46",
                    }}>
                        <FileText size={14} /> Text Snippets <ArrowRight size={12} />
                    </Link>
                    <Link to="/files" style={{
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px",
                        borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none",
                        background: "rgba(255,255,255,0.15)", color: "#fff",
                        border: "1px solid rgba(255,255,255,0.25)",
                    }}>
                        <Upload size={14} /> File Upload <ArrowRight size={12} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
