import "dotenv/config";
import express from "express";
import cors from "cors";
import textRoutes from './routes/textRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

const app = express();

// ─── CORS (allow frontend) ───
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://open-code-share.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight
app.options("*", cors());

// ─── BODY PARSER ───
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── ROUTES ───
app.use("/api", textRoutes);
app.use("/api", fileRoutes);
app.use("/api", feedbackRoutes);

// ─── HEALTH CHECK ───
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// ─── ROOT ───
app.get('/', (req, res) => {
  res.json({ message: "OpenCodeShare API is running!", status: "ok" });
});

// ─── 404 ───
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── ERROR HANDLER ───
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ─── LOCAL SERVER ONLY ───
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

// ─── EXPORT FOR VERCEL ───
export default app;
