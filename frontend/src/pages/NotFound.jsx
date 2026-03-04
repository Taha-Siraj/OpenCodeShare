import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const NotFound = () => {
    const { isDark } = useTheme();
    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#9ca3af" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";

    return (
        <div style={{
            background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            padding: "40px 20px", textAlign: "center",
        }}>
            <Helmet>
                <title>404 — Page Not Found | OpenCodeShare</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div style={{ maxWidth: 420, margin: "0 auto" }}>
                <div style={{ fontSize: "clamp(60px, 15vw, 120px)", fontWeight: 800, color: "#10b981", lineHeight: 1, marginBottom: 8 }}>
                    404
                </div>
                <h1 style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, color: t1, marginBottom: 8 }}>
                    Page Not Found
                </h1>
                <p style={{ fontSize: 14, color: t2, marginBottom: 28, lineHeight: 1.6 }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                    <Link to="/" style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 22px",
                        borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: "none",
                        background: "#10b981", color: "#fff",
                    }}>
                        <Home size={14} /> Go Home
                    </Link>
                    <button onClick={() => window.history.back()} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 22px",
                        borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        background: "transparent", color: t2, border: `1px solid ${isDark ? "#252836" : "#e2e6ed"}`,
                    }}>
                        <ArrowLeft size={14} /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
