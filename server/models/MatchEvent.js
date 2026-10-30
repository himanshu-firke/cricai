const mongoose = require("mongoose");

const matchEventSchema = new mongoose.Schema({
  eventType: { type: String, enum: ["ball", "wicket", "milestone", "phase_change"], required: true },
  over: Number,
  description: String,
  fanQuestionsTriggered: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

matchEventSchema.index({ eventType: 1 });

module.exports = mongoose.model("MatchEvent", matchEventSchema);
