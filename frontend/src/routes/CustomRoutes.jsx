import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Fotter from "@/components/Fotter";
import ScrollToTop from "@/components/ScrollToTop";

const Home = lazy(() => import("@/pages/Home"));
const Text = lazy(() => import("@/pages/Text"));
const FilePage = lazy(() => import("@/pages/File"));
const Howitswork = lazy(() => import("@/pages/Howitswork"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const PrivacyPolicy = lazy(() => import("@/pages/LegalPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Loader = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ width: 28, height: 28, border: "3px solid #e5e7eb", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
);

const CustomRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/text" element={<Text />} />
                        <Route path="/files" element={<FilePage />} />
                        <Route path="/how-it-works" element={<Howitswork />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <Fotter />
        </>
    );
};

export default CustomRoutes;