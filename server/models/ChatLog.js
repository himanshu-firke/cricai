const mongoose = require("mongoose");

const chatLogSchema = new mongoose.Schema({
  question: { type: String, required: true },
  reply: { type: String },
  category: { type: String, enum: ["rules", "strategy", "fantasy", "stats", "general"], default: "general" },
  matchContext: {
    overs: Number,
    runs: Number,
    wickets: Number,
    reqRate: Number,
  },
  responseTime: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

chatLogSchema.index({ timestamp: -1 });
chatLogSchema.index({ category: 1 });

module.exports = mongoose.model("ChatLog", chatLogSchema);
