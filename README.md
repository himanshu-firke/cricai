# CricAI — AI-Powered Live Cricket Companion

A real-time cricket match companion that combines ball-by-ball simulation, fantasy point tracking, and an AI chatbot that understands live match context.

## The Problem

During a live cricket match, fans switch between 3-4 apps just to keep up — one for scores, one for fantasy, one for stats. There's no single place where you can watch the match unfold, track your fantasy team, and ask questions about what's happening — all in one screen.

## What CricAI Does

- **Live Match Simulation** — Ball-by-ball MI vs CSK T20 chase with realistic commentary
- **Context-Aware AI Chat** — Powered by Groq AI, every response is grounded in the current match state (score, batsmen, bowler, required rate)
- **Real-Time Multi-Client Sync** — Socket.io ensures every connected viewer sees the same match state instantly
- **Fantasy Point Tracker** — Live fantasy scores with trend indicators for all players
- **Auto-Generated Insights** — Key moments (wickets, milestones, phase changes) trigger AI insight cards
- **Interactive Scorecard** — Full batting and bowling stats with player images
- **Mobile-First Design** — Responsive layout with draggable chat panel, tab navigation, sticky controls


## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| AI | Groq API (Qwen 27B) |
| Real-Time | Socket.io |
| Database | MongoDB Atlas |
| Deployment | Vercel (client) + Render (server) |

## Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Groq API key ([console.groq.com](https://console.groq.com))

### Install

```bash
# Clone
git clone https://github.com/himanshu-firke/cricai.git
cd cricai

# Install dependencies
npm run install:all
```

### Configure

Create `server/.env`:

```env
GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3001
CLIENT_URL=http://localhost:5173
```

### Run

```bash
# Terminal 1 — Backend
cd server  
node server.js

# Terminal 2 — Frontend
cd client  npm run dev
```

Open `http://localhost:5173`

## Architecture

```
Client (React + Vite)
  ├── useMatchEngine — Ball-by-ball simulation, state computation
  ├── useSocket — WebSocket connection, real-time sync
  ├── Components — Scoreboard, BallFeed, Scorecard, Chat, FantasyPulse, InsightCards
  └── Vite proxy → /api/* → Backend

Server (Express + Socket.io)
  ├── POST /api/chat — Groq AI with match context injection
  ├── POST /api/insight — AI auto-insights at key moments
  ├── Socket.io — match-state, ball-update, sync-state, viewers
  ├── MongoDB — Chat logs, match events (analytics)
  └── Rate limiting — 20 chat/min, 30 insight/min
```

## Key Design Decisions

- **Server as source of truth** — Match state stored server-side; new clients receive current state on connect
- **Context injection** — Every AI prompt includes live score, batsmen, bowler, required rate — no hallucinated stats
- **Tightened AI guardrails** — Only cricket questions, accurate bowling styles, correct fantasy rules
- **Mobile-first** — 47vh draggable chat panel, 44px touch targets, 4 responsive breakpoints

## License

MIT
