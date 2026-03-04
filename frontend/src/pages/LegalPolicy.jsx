import { Helmet } from "react-helmet-async";
import { useTheme } from "@/hooks/useTheme";

const PrivacyPolicy = () => {
    const { isDark } = useTheme();
    const t1 = isDark ? "#e4e8f0" : "#1a1d26";
    const t2 = isDark ? "#9ca3af" : "#6b7280";
    const bg = isDark ? "#0a0a0f" : "#f4f6f9";
    const cardBg = isDark ? "#161923" : "#ffffff";
    const bdr = isDark ? "#252836" : "#e2e6ed";

    const h2Style = { fontSize: 18, fontWeight: 600, color: t1, marginTop: 28, marginBottom: 10 };
    const pStyle = { fontSize: 14, color: t2, lineHeight: 1.8, marginBottom: 12 };
    const liStyle = { fontSize: 14, color: t2, lineHeight: 1.8, marginBottom: 6, paddingLeft: 8 };

    return (
        <div style={{ background: bg, minHeight: "100vh", padding: "40px 20px 60px", transition: "background 0.3s" }}>
            <Helmet>
                <title>Privacy Policy — OpenCodeShare</title>
                <meta name="description" content="Read OpenCodeShare's privacy policy. Learn how we handle your data, what we collect, and how we protect your privacy." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/privacy-policy" />
            </Helmet>

            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, color: t1, marginBottom: 6 }}>
                        Privacy <span style={{ color: "#10b981" }}>Policy</span>
                    </h1>
                    <p style={{ fontSize: 13, color: t2 }}>Last updated: March 4, 2026</p>
                </div>

                <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: "28px 24px" }}>
                    <p style={pStyle}>
                        At OpenCodeShare, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                        use, and safeguard your information when you use our file and text sharing platform.
                    </p>

                    <h2 style={h2Style}>1. Information We Collect</h2>
                    <p style={pStyle}>We collect minimal information to provide our services:</p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}><strong style={{ color: t1 }}>Files & Text:</strong> Content you upload is stored temporarily (30 seconds) and then permanently deleted.</li>
                        <li style={liStyle}><strong style={{ color: t1 }}>Feedback Data:</strong> Name, email, and message you voluntarily submit via our feedback form.</li>
                        <li style={liStyle}><strong style={{ color: t1 }}>Usage Data:</strong> Anonymous analytics data such as page views, browser type, and device information.</li>
                    </ul>

                    <h2 style={h2Style}>2. How We Use Your Information</h2>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}>To provide and maintain our file/text sharing service</li>
                        <li style={liStyle}>To respond to your feedback and support requests</li>
                        <li style={liStyle}>To improve our platform and user experience</li>
                        <li style={liStyle}>To monitor usage patterns and prevent abuse</li>
                    </ul>

                    <h2 style={h2Style}>3. Data Storage & Security</h2>
                    <p style={pStyle}>
                        All uploaded files are automatically deleted after 30 seconds. We use Supabase for secure cloud storage
                        with encryption at rest and in transit. We do not sell, trade, or share your personal information with third parties.
                    </p>

                    <h2 style={h2Style}>4. Cookies</h2>
                    <p style={pStyle}>
                        We use minimal cookies for theme preferences (dark/light mode). We do not use tracking cookies.
                        Third-party services like Google Analytics may set their own cookies for anonymous usage tracking.
                    </p>

                    <h2 style={h2Style}>5. Third-Party Services</h2>
                    <p style={pStyle}>We use the following third-party services:</p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}><strong style={{ color: t1 }}>Supabase:</strong> Cloud storage and database</li>
                        <li style={liStyle}><strong style={{ color: t1 }}>Vercel:</strong> Frontend hosting</li>
                        <li style={liStyle}><strong style={{ color: t1 }}>Google Analytics:</strong> Anonymous usage analytics</li>
                    </ul>

                    <h2 style={h2Style}>6. Your Rights</h2>
                    <p style={pStyle}>You have the right to:</p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}>Access your personal data we hold</li>
                        <li style={liStyle}>Request deletion of your data</li>
                        <li style={liStyle}>Opt out of analytics tracking</li>
                        <li style={liStyle}>Contact us with privacy concerns</li>
                    </ul>

                    <h2 style={h2Style}>7. Children's Privacy</h2>
                    <p style={pStyle}>
                        Our service is not directed to children under 13. We do not knowingly collect personal information from children.
                    </p>

                    <h2 style={h2Style}>8. Changes to This Policy</h2>
                    <p style={pStyle}>
                        We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 style={h2Style}>9. Contact Us</h2>
                    <p style={pStyle}>
                        If you have questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:contact@opencodeshare.com" style={{ color: "#10b981", textDecoration: "none" }}>contact@opencodeshare.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
