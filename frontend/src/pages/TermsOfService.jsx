import { Helmet } from "react-helmet-async";
import { useTheme } from "@/hooks/useTheme";

const TermsOfService = () => {
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
                <title>Terms of Service — OpenCodeShare</title>
                <meta name="description" content="Read the Terms of Service for OpenCodeShare. Understand your rights and responsibilities when using our file and text sharing platform." />
                <link rel="canonical" href="https://opencodeshare.vercel.app/terms-of-service" />
            </Helmet>

            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, color: t1, marginBottom: 6 }}>
                        Terms of <span style={{ color: "#10b981" }}>Service</span>
                    </h1>
                    <p style={{ fontSize: 13, color: t2 }}>Last updated: March 4, 2026</p>
                </div>

                <div style={{ background: cardBg, border: `1px solid ${bdr}`, borderRadius: 16, padding: "28px 24px" }}>
                    <p style={pStyle}>
                        Welcome to OpenCodeShare. By accessing or using our platform, you agree to be bound by these Terms of Service.
                        Please read them carefully before using our services.
                    </p>

                    <h2 style={h2Style}>1. Acceptance of Terms</h2>
                    <p style={pStyle}>
                        By using OpenCodeShare, you agree to these terms. If you do not agree, please do not use our service.
                        We reserve the right to modify these terms at any time.
                    </p>

                    <h2 style={h2Style}>2. Description of Service</h2>
                    <p style={pStyle}>
                        OpenCodeShare provides a free platform for sharing text snippets and files across devices. Key features include:
                    </p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}>Text sharing with instant publish and copy functionality</li>
                        <li style={liStyle}>File uploads up to 50MB per file</li>
                        <li style={liStyle}>Automatic file deletion after 30 seconds</li>
                        <li style={liStyle}>Cross-platform access without registration</li>
                    </ul>

                    <h2 style={h2Style}>3. Acceptable Use</h2>
                    <p style={pStyle}>You agree NOT to use OpenCodeShare to:</p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}>Upload malware, viruses, or harmful software</li>
                        <li style={liStyle}>Share illegal, copyrighted, or pirated content</li>
                        <li style={liStyle}>Share explicit, offensive, or abusive material</li>
                        <li style={liStyle}>Attempt to hack, overload, or disrupt our service</li>
                        <li style={liStyle}>Use automated tools to scrape or abuse the platform</li>
                        <li style={liStyle}>Share personal data of others without their consent</li>
                    </ul>

                    <h2 style={h2Style}>4. File Storage & Deletion</h2>
                    <p style={pStyle}>
                        All uploaded files are automatically deleted after 30 seconds. We do not guarantee permanent storage.
                        Files may be removed earlier without notice if they violate our terms. You are responsible for keeping
                        backup copies of any files you share.
                    </p>

                    <h2 style={h2Style}>5. Rate Limits</h2>
                    <p style={pStyle}>To ensure fair usage for all users, the following limits apply:</p>
                    <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
                        <li style={liStyle}>Maximum file size: 50MB per file</li>
                        <li style={liStyle}>Upload limit: 20 uploads per minute</li>
                        <li style={liStyle}>API requests: 200 requests per minute</li>
                        <li style={liStyle}>Text snippets: 30 per minute</li>
                    </ul>

                    <h2 style={h2Style}>6. Intellectual Property</h2>
                    <p style={pStyle}>
                        You retain ownership of all content you upload. By using our service, you grant OpenCodeShare a temporary
                        license to store and transmit your content solely for the purpose of providing the sharing service.
                    </p>

                    <h2 style={h2Style}>7. Disclaimer of Warranties</h2>
                    <p style={pStyle}>
                        OpenCodeShare is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service,
                        data integrity, or fitness for a particular purpose. Use at your own risk.
                    </p>

                    <h2 style={h2Style}>8. Limitation of Liability</h2>
                    <p style={pStyle}>
                        OpenCodeShare shall not be liable for any damages arising from the use or inability to use our service,
                        including but not limited to data loss, security breaches, or service interruptions.
                    </p>

                    <h2 style={h2Style}>9. Termination</h2>
                    <p style={pStyle}>
                        We reserve the right to terminate or suspend access to our service at any time, without prior notice,
                        for conduct that we believe violates these terms or is harmful to other users.
                    </p>

                    <h2 style={h2Style}>10. Contact</h2>
                    <p style={pStyle}>
                        For questions about these Terms, contact us at{" "}
                        <a href="mailto:contact@opencodeshare.com" style={{ color: "#10b981", textDecoration: "none" }}>contact@opencodeshare.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
