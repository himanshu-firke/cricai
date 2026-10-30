const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
require("dotenv").config();

const ChatLog = require("./models/ChatLog");
const MatchEvent = require("./models/MatchEvent");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

// ─── MongoDB Connection ───
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err.message));
} else {
  console.log("MongoDB: No MONGO_URI set — analytics disabled");
}

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── Rate Limiting ───
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests. Please wait a moment." },
  standardHeaders: true,
  legacyHeaders: false,
});

const insightLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Rate limit exceeded." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.static(path.join(__dirname, "../client/dist")));

// ─── Helper: Classify question category ───
function classifyQuestion(msg) {
  const lower = msg.toLowerCase();
  if (/fantasy|captain|vice.?captain|dream.?11|points|pick/.test(lower)) return "fantasy";
  if (/rule|lbw|drs|no.?ball|wide|free.?hit|dls|powerplay/.test(lower)) return "rules";
  if (/strategy|field|bowling.?change|why.?did|approach|plan/.test(lower)) return "strategy";
  if (/average|strike.?rate|economy|record|stat|score|how.?many/.test(lower)) return "stats";
  return "general";
}

// ─── Helper: Parse match context string to object ───
function parseMatchContext(ctx) {
  if (!ctx) return {};
  const oversMatch = ctx.match(/after ([\d.]+) overs/);
  const runsMatch = ctx.match(/MI: (\d+)\/(\d+)/);
  const rrMatch = ctx.match(/RRR: ([\d.]+)/);
  return {
    overs: oversMatch ? parseFloat(oversMatch[1]) : null,
    runs: runsMatch ? parseInt(runsMatch[1]) : null,
    wickets: runsMatch ? parseInt(runsMatch[2]) : null,
    reqRate: rrMatch ? parseFloat(rrMatch[1]) : null,
  };
}

// ─── Chat Endpoint ───
app.post("/api/chat", chatLimiter, async (req, res) => {
  const { message, matchContext } = req.body;
  const startTime = Date.now();

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const systemPrompt = `You are CricAI, an expert cricket companion for fans watching a live MI vs CSK T20 match.
You have deep knowledge of cricket rules, strategy, player stats, and Dream11 fantasy cricket.
You speak like an enthusiastic but knowledgeable cricket buddy — concise, fun, and insightful.
Keep responses under 80 words. Use cricket terminology naturally. Never use emojis.

IMPORTANT RULES:
- Only answer cricket-related questions. If the user asks something unrelated, politely redirect: "I'm your cricket companion! Ask me about the match, fantasy points, rules, or strategy."
- Be factually accurate about players. Know bowling styles: Deepak Chahar (pace), Matheesha Pathirana (pace), Ravindra Jadeja (left-arm spin), Maheesh Theekshana (off-spin), Moeen Ali (off-spin). Do NOT confuse spinners with pacers.
- Fantasy context: In Dream11, captain/vice-captain are selected BEFORE the match. During a live match, help fans track fantasy points and suggest picks for future matches based on current form.
- Use the match context below for every answer. Reference actual live stats (runs, strike rate, economy) when relevant.

Current match context:
${matchContext || "No live match data available."}

Answer the fan's question using the match context. If they ask about fantasy, give actionable advice based on live performance.
If they ask about rules, explain simply. If they ask about strategy, give expert insight referencing the current match situation.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Grok API error:", response.status, errText);
      return res.status(response.status).json({ error: "AI service error" });
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Couldn't generate a response.";
    const responseTime = Date.now() - startTime;

    // Log to MongoDB (non-blocking)
    if (mongoose.connection.readyState === 1) {
      ChatLog.create({
        question: message,
        reply: aiReply,
        category: classifyQuestion(message),
        matchContext: parseMatchContext(matchContext),
        responseTime,
      }).catch((err) => console.error("Log error:", err.message));
    }

    res.json({ reply: aiReply, responseTime });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Insight Endpoint ───
app.post("/api/insight", insightLimiter, async (req, res) => {
  const { matchContext, event } = req.body;

  try {
    const systemPrompt = `You are CricAI generating a brief match insight card.
Given a cricket match event, produce a single punchy insight (under 40 words) that helps fans understand why this moment matters.
Include a relevant stat or historical context if possible. Be exciting but factual.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen/qwen3.8-27b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Match context: ${matchContext}\n\nEvent: ${event}` },
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "AI service error" });
    }

    const data = await response.json();
    const insight = data.choices?.[0]?.message?.content || "";
    res.json({ insight });
  } catch (err) {
    console.error("Insight error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── Analytics Endpoint ───
app.get("/api/analytics", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json({ available: false, message: "Database not connected" });
  }

  try {
    const [totalChats, categoryBreakdown, avgResponseTime, recentQuestions, peakOvers] =
      await Promise.all([
        ChatLog.countDocuments(),

        ChatLog.aggregate([
          { $group: { _id: "$category", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),

        ChatLog.aggregate([
          { $group: { _id: null, avg: { $avg: "$responseTime" } } },
        ]),

        ChatLog.find().sort({ timestamp: -1 }).limit(5).select("question category timestamp -_id"),

        ChatLog.aggregate([
          { $match: { "matchContext.overs": { $ne: null } } },
          {
            $group: {
              _id: { $floor: "$matchContext.overs" },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),
      ]);

    res.json({
      available: true,
      totalChats,
      categoryBreakdown,
      avgResponseTime: avgResponseTime[0]?.avg ? Math.round(avgResponseTime[0].avg) : 0,
      recentQuestions,
      peakEngagementOvers: peakOvers,
    });
  } catch (err) {
    console.error("Analytics error:", err.message);
    res.status(500).json({ error: "Analytics failed" });
  }
});

// ─── Socket.io — Real-time Match Updates ───
let connectedClients = 0;
let currentMatchState = { ballIndex: -1 };
let recentInsights = [];

io.on("connection", (socket) => {
  connectedClients++;
  io.emit("viewers", connectedClients);
  console.log(`Client connected (${connectedClients} total)`);

  // Send current match state to newly connected client so they sync instantly
  socket.emit("sync-state", {
    ballIndex: currentMatchState.ballIndex,
    insights: recentInsights,
  });

  socket.on("ball-update", (data) => {
    socket.broadcast.emit("ball-update", data);

    if (mongoose.connection.readyState === 1 && data.result === "WICKET") {
      MatchEvent.create({
        eventType: "wicket",
        over: data.over,
        description: data.commentary,
      }).catch(() => {});
    }
  });

  socket.on("match-state", (state) => {
    currentMatchState.ballIndex = state.ballIndex ?? currentMatchState.ballIndex;
    socket.broadcast.emit("match-state", state);
  });

  socket.on("insight", (insight) => {
    recentInsights = [insight, ...recentInsights].slice(0, 10);
    socket.broadcast.emit("insight", insight);
  });

  socket.on("match-reset", () => {
    currentMatchState = { ballIndex: -1 };
    recentInsights = [];
    socket.broadcast.emit("match-reset");
  });

  socket.on("disconnect", () => {
    connectedClients--;
    io.emit("viewers", connectedClients);
    console.log(`Client disconnected (${connectedClients} total)`);
  });
});

// ─── Serve React App ───
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ─── Start Server ───
server.listen(PORT, () => {
  console.log(`CricAI server running on port ${PORT}`);
  console.log(`WebSocket ready on port ${PORT}`);
});
