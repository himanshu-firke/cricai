import { useMemo, useEffect, useState } from "react";
import Header from "./components/Header";
import Scoreboard from "./components/Scoreboard";
import BallFeed from "./components/BallFeed";
import Scorecard from "./components/Scorecard";
import Chat from "./components/Chat";
import FantasyPulse from "./components/FantasyPulse";
import InsightCards from "./components/InsightCards";
import Controls from "./components/Controls";
import { useMatchEngine } from "./hooks/useMatchEngine";
import { useSocket } from "./hooks/useSocket";

const TABS = ["Commentary", "Scorecard", "AI Insights"];

export default function App() {
  const { viewers, isConnected, syncState, emitBallUpdate, emitMatchState, emitInsight, emitMatchReset } = useSocket();
  const socketHandlers = useMemo(
    () => ({ emitBallUpdate, emitMatchState, emitInsight, emitMatchReset }),
    [emitBallUpdate, emitMatchState, emitInsight, emitMatchReset]
  );
  const engine = useMatchEngine(socketHandlers);
  const [activeTab, setActiveTab] = useState("Commentary");

  useEffect(() => {
    if (!syncState) return;
    if (syncState.reset) {
      engine.jumpToBall(-1);
      return;
    }
    if (syncState.ballIndex != null) {
      engine.jumpToBall(syncState.ballIndex);
    }
    if (syncState.insights) {
      syncState.insights.forEach((ins) => engine.addInsight(ins));
    }
    if (syncState.newInsight) {
      engine.addInsight(syncState.newInsight);
    }
  }, [syncState, engine.jumpToBall, engine.addInsight]);

  return (
    <div className="app">
      <Header viewers={viewers} isConnected={isConnected} />
      <Scoreboard matchState={engine.matchState} />

      <div className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Commentary" && (
          <BallFeed recentBalls={engine.recentBalls} />
        )}
        {activeTab === "Scorecard" && (
          <Scorecard matchState={engine.matchState} />
        )}
        {activeTab === "AI Insights" && (
          <InsightCards insights={engine.insights} />
        )}
      </div>

      <FantasyPulse matchState={engine.matchState} />

      <Controls
        isPlaying={engine.isPlaying}
        isFinished={engine.isFinished}
        play={engine.play}
        pause={engine.pause}
        nextBall={engine.nextBall}
        reset={engine.reset}
        speed={engine.speed}
        setSpeed={engine.setSpeed}
      />

      <Chat getContext={engine.getContextString} />
    </div>
  );
}
