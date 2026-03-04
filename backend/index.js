import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import textRoutes from './routes/textRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import { cleanupExpiredFiles } from './controllers/filecontrollers.js';

const app = express();
const port = process.env.PORT || 5000;

// ─── SECURITY ───
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));

// ─── COMPRESSION (gzip all responses) ───
app.use(compression());

// ─── CORS (allow frontend) ───
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "https://open-code-share.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(null, true); // allow all in case of dynamic Vercel URLs
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// ─── BODY PARSER ───
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── RATE LIMITING ───
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Upload limit reached. Try again in a minute." },
});

const feedbackLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Feedback limit reached. Try again later." },
});

const textLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many snippets. Slow down." },
});

app.use("/api", generalLimiter);

// ─── ROUTES ───
app.use("/api", textRoutes);
app.use("/api", fileRoutes);
app.use("/api", feedbackRoutes);

// Apply specific rate limits
app.post("/api/upload", uploadLimiter);
app.post("/api/feedback", feedbackLimiter);
app.post("/api/create", textLimiter);

// ─── HEALTH CHECK ───
app.get('/api/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: Math.floor(process.uptime()),
    memory: Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 HANDLER ───
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── ERROR HANDLER ───
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ─── CLEANUP CRON ───
setInterval(cleanupExpiredFiles, 10 * 1000);

// ─── START SERVER (local only, Vercel uses export) ───
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

// ─── EXPORT FOR VERCEL SERVERLESS ───
export default app;
