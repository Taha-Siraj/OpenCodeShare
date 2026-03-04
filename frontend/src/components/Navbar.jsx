import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Sun, Moon, FileText, Upload, MessageSquare, Home, Info } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/text", label: "Text", icon: FileText },
  { to: "/files", label: "Files", icon: Upload },
  { to: "/how-it-works", label: "How it Works", icon: Info },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const active = (p) => pathname === p;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50, width: "100%",
      borderBottom: `1px solid ${isDark ? (scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)") : (scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)")}`,
      background: isDark ? (scrolled ? "rgba(13,13,18,0.95)" : "#0d0d12") : (scrolled ? "rgba(255,255,255,0.95)" : "#ffffff"),
      backdropFilter: scrolled ? "blur(20px)" : "none",
      boxShadow: scrolled ? (isDark ? "0 4px 30px rgba(0,0,0,0.3)" : "0 2px 20px rgba(0,0,0,0.05)") : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <img src="/logo.png" alt="OpenCodeShare" style={{
            width: 32, height: 32, borderRadius: 8,
          }} />
          <span style={{ fontWeight: 700, fontSize: 15, color: isDark ? "#fff" : "#111827", letterSpacing: "-0.01em" }}>
            Open<span style={{ color: "#10b981" }}>Code</span>Share
          </span>
        </Link>

        {/* Desktop Nav — hidden below 900px */}
        <div className="navDesktop" style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 24, marginRight: 24 }}>
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link key={l.to} to={l.to} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
                borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none",
                transition: "all 0.15s ease",
                color: active(l.to) ? (isDark ? "#fff" : "#111827") : (isDark ? "#6b7280" : "#6b7280"),
                background: active(l.to) ? (isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6") : "transparent",
              }}>
                <Icon size={14} strokeWidth={2} />
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button onClick={toggleTheme} style={{
            width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer", transition: "all 0.2s ease",
            background: isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
            color: isDark ? "#fbbf24" : "#6b7280",
          }} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={isDark ? "d" : "l"} initial={{ scale: 0, rotate: -60 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 60 }} transition={{ duration: 0.15 }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* CTA — desktop only */}
          <Link to="/text" className="navCTA" style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
            borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
            background: "#10b981", color: "#fff",
            boxShadow: "0 2px 8px rgba(16,185,129,0.25)",
          }}>
            <Code2 size={14} /> Start Sharing
          </Link>

          {/* Hamburger — mobile only */}
          <button className="navHamburger" onClick={() => setOpen(!open)} style={{
            width: 36, height: 36, borderRadius: 8, display: "none", alignItems: "center", justifyContent: "center",
            border: "none", cursor: "pointer",
            background: "transparent", color: isDark ? "#d1d5db" : "#374151",
          }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{
              overflow: "hidden",
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            }}>
            <div style={{ padding: "8px 20px 12px" }}>
              {links.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.div key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link to={l.to} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                      borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none",
                      marginBottom: 2,
                      color: active(l.to) ? (isDark ? "#fff" : "#111827") : (isDark ? "#9ca3af" : "#6b7280"),
                      background: active(l.to) ? (isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6") : "transparent",
                    }}>
                      <Icon size={18} /> {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link to="/text" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 8, padding: "12px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                background: "#10b981", color: "#fff",
              }}>
                <Code2 size={15} /> Start Sharing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS — show hamburger below 900px */}
      <style>{`
        @media (max-width: 900px) {
          .navDesktop { display: none !important; }
          .navCTA { display: none !important; }
          .navHamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
