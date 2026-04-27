const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors");

// ── CORS restricted to allowed origins ──
const allowedOrigins = [
  "https://election-process-app.web.app",
  "https://election-process-app.firebaseapp.com",
  "http://localhost:5000",
  "http://127.0.0.1:5000"
];
const corsHandler = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("CORS: Origin not allowed"));
  }
});

// Security: API keys loaded from environment config — never hardcoded in source
const PRIMARY_KEY = process.env.GEMINI_PRIMARY_KEY || functions.config().gemini?.primary_key || "";
const BACKUP_KEY  = process.env.GEMINI_BACKUP_KEY || functions.config().gemini?.backup_key || "";
const MODEL = "gemini-1.5-flash";
const API_URL = (key) => `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

// ── Rate Limiter ──
const rateLimitMap = new Map();
const RATE_WINDOW = 60000;
const RATE_MAX = 15;
function isRateLimited(ip) {
  const now = Date.now();
  const r = rateLimitMap.get(ip);
  if (!r || now - r.start > RATE_WINDOW) { rateLimitMap.set(ip, { start: now, count: 1 }); return false; }
  r.count++;
  return r.count > RATE_MAX;
}

// ── Input Validation ──
function validateBody(body) {
  if (!body || typeof body !== "object") return "Missing body";
  if (!body.contents || !Array.isArray(body.contents) || !body.contents.length) return "Missing contents";
  for (const entry of body.contents) {
    if (!entry.parts || !Array.isArray(entry.parts)) return "Missing parts";
    for (const p of entry.parts) {
      if (p.text !== undefined && typeof p.text !== "string") return "Invalid text";
      if (p.text && p.text.length > 16384) return "Text too long";
    }
  }
  return null;
}

exports.askGemini = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
    const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
    if (isRateLimited(ip)) return res.status(429).json({ error: { message: "Too many requests." } });

    const err = validateBody(req.body);
    if (err) return res.status(400).json({ error: { message: err } });

    // Try PRIMARY key first
    try {
      const r = await axios.post(API_URL(PRIMARY_KEY), req.body, { headers: { "Content-Type": "application/json" }, timeout: 30000 });
      return res.json(r.data);
    } catch (e1) {
      // Try BACKUP key
      try {
        const r = await axios.post(API_URL(BACKUP_KEY), req.body, { headers: { "Content-Type": "application/json" }, timeout: 30000 });
        return res.json(r.data);
      } catch (e2) {
        const status = e2.response?.status || 500;
        res.status(status >= 400 ? status : 500).json({ error: { message: "AI Assistant temporarily unavailable." } });
      }
    }
  });
});