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

// ─── CORS ───
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  process.env.FRONTEND_URL, // production URL
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

// ─── BODY PARSER ───
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── RATE LIMITING ───
// General: 200 req/min per IP
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

// Upload: 20 uploads/min per IP
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Upload limit reached. Try again in a minute." },
});

// Feedback: 5 per hour per IP
const feedbackLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Feedback limit reached. Try again later." },
});

// Text create: 30 per minute per IP
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

// ─── START SERVER ───
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🗑️  Auto-cleanup: files expire after 30s`);
  console.log(`🛡️  Rate limiting: enabled`);
  console.log(`📦 Compression: gzip enabled`);
  console.log(`🔒 Helmet: security headers active`);
});
