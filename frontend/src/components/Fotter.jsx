import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Heart } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Fotter = () => {
    const yr = new Date().getFullYear();
    const { isDark } = useTheme();

    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#6b7280" : "#6b7280";
    const bg = isDark ? "#090b0f" : "#f0f2f5";
    const cardBg = isDark ? "#12141c" : "#ffffff";
    const bdr = isDark ? "#1e2030" : "#e5e7eb";

    const linkStyle = { color: t2, textDecoration: "none", fontSize: 13, lineHeight: 2.2, display: "block", transition: "color 0.15s" };

    return (
        <footer style={{ background: bg, borderTop: `1px solid ${bdr}`, padding: "40px 16px 24px", transition: "all 0.3s" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="footerGrid">
                    {/* Brand */}
                    <div>
                        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 10 }}>
                            <img src="/logo.png" alt="OpenCodeShare" style={{ width: 28, height: 28, borderRadius: 7 }} />
                            <span style={{ fontWeight: 700, fontSize: 14, color: t1 }}>Open<span style={{ color: "#10b981" }}>Code</span>Share</span>
                        </Link>
                        <p style={{ fontSize: 13, color: t2, lineHeight: 1.7, maxWidth: 260 }}>
                            Fast, secure, and simple code & file sharing for everyone. No sign-up, no hassle — just share and go.
                        </p>
                    </div>

                    {/* Links */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                        <div>
                            <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: t2, marginBottom: 10 }}>Pages</h4>
                            <Link to="/" style={linkStyle}>Home</Link>
                            <Link to="/text" style={linkStyle}>Share Text</Link>
                            <Link to="/files" style={linkStyle}>Share Files</Link>
                            <Link to="/how-it-works" style={linkStyle}>How it Works</Link>
                            <Link to="/feedback" style={linkStyle}>Feedback</Link>
                        </div>
                        <div>
                            <h4 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: t2, marginBottom: 10 }}>Legal</h4>
                            <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
                            <Link to="/terms-of-service" style={linkStyle}>Terms of Service</Link>
                            <Link to="/contact" style={linkStyle}>Contact Us</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${bdr}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <p style={{ fontSize: 12, color: t2 }}>© {yr} OpenCodeShare. All rights reserved.</p>
                    <p style={{ fontSize: 12, color: t2, display: "flex", alignItems: "center", gap: 4 }}>
                        Made with <Heart size={11} style={{ color: "#ef4444" }} fill="#ef4444" /> by OpenCodeShare
                    </p>
                </div>
            </div>

            <style>{`
        @media (min-width: 640px) {
          .footerGrid { grid-template-columns: 1.2fr 1fr !important; }
        }
      `}</style>
        </footer>
    );
};

export default Fotter;