import { useMemo } from "react";
import { players } from "../data/matchData";
import { getPlayerImage } from "../data/playerImages";

export default function FantasyPulse({ matchState }) {
  const fantasyPlayers = useMemo(() => {
    if (!matchState) return [];

    const result = [];

    players.MI.batsmen.forEach((p) => {
      const stats = matchState.batsmen[p.name];
      let points = p.fantasyBase;
      let trend = "neutral";
      let reason = "Yet to bat";

      if (stats) {
        points += stats.runs;
        points += stats.fours * 1;
        points += stats.sixes * 2;
        if (stats.runs >= 50) points += 16;
        if (stats.runs >= 30 && stats.runs < 50) points += 8;
        if (stats.balls > 0 && stats.runs / stats.balls > 1.5) points += 6;

        if (stats.out) {
          trend = "down";
          reason = `Out: ${stats.runs}(${stats.balls})`;
        } else if (stats.runs > 30) {
          trend = "hot";
          reason = `${stats.runs}(${stats.balls}) — on fire`;
        } else if (stats.runs > 10) {
          trend = "up";
          reason = `Set: ${stats.runs}(${stats.balls})`;
        } else {
          trend = "neutral";
          reason = `${stats.runs}(${stats.balls})`;
        }
      }

      result.push({ ...p, team: "mi", points, trend, reason });
    });

    players.CSK.bowlers.forEach((p) => {
      const stats = matchState.bowlers[p.name];
      let points = p.fantasyBase;
      let trend = "neutral";
      let reason = "Not bowled yet";

      if (stats) {
        points += stats.wickets * 25;
        if (stats.balls > 0) {
          const economy = (stats.runs / stats.balls) * 6;
          if (economy < 7) {
            points += 12;
            trend = "hot";
            reason = `Econ ${economy.toFixed(1)} — ${stats.wickets}W`;
          } else if (economy < 9) {
            points += 4;
            trend = "up";
            reason = `Econ ${economy.toFixed(1)} — ${stats.wickets}W`;
          } else {
            trend = "down";
            reason = `Expensive: ${economy.toFixed(1)} econ`;
          }
        }
      }

      result.push({ ...p, team: "csk", points, trend, reason, role: p.role });
    });

    return result.sort((a, b) => b.points - a.points);
  }, [matchState]);

  if (!matchState) {
    return (
      <div className="card">
        <div className="card-header">
          <h3>Fantasy Pulse</h3>
        </div>
        <div className="empty-state">Points update as match progresses</div>
      </div>
    );
  }

  const getTrendDisplay = (trend) => {
    if (trend === "hot") return { arrow: "▲", cls: "up" };
    if (trend === "up") return { arrow: "▲", cls: "up" };
    if (trend === "down") return { arrow: "▼", cls: "down" };
    return { arrow: "", cls: "neutral" };
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Fantasy Pulse</h3>
        <span className="tag tag-yellow">Live Pts</span>
      </div>
      <div className="fantasy-list">
        {fantasyPlayers.map((p) => {
          const { arrow, cls } = getTrendDisplay(p.trend);
          return (
            <div className="fantasy-player" key={p.name + p.team}>
              <div className="fantasy-player-info">
                <img
                  className={`player-img ${p.team}`}
                  src={getPlayerImage(p.name)}
                  alt={p.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1a1a2e&color=5c5c78&size=80&bold=true`;
                  }}
                />
                <div>
                  <div className="fantasy-name">{p.name}</div>
                  <div className="fantasy-role">{p.role}</div>
                </div>
              </div>
              <div className="fantasy-right">
                <div className={`fantasy-points ${cls}`}>
                  {arrow && <span className="trend-arrow">{arrow}</span>}
                  {Math.round(p.points)} pts
                </div>
                <div className="fantasy-trend">{p.reason}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
