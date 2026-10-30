import { useState } from "react";
import { players, firstInningsScore } from "../data/matchData";
import { getPlayerImage } from "../data/playerImages";

export default function Scorecard({ matchState }) {
  const [teamTab, setTeamTab] = useState("MI");

  if (!matchState) {
    return (
      <div className="card">
        <div className="empty-state">Scorecard updates as match progresses</div>
      </div>
    );
  }

  const s = matchState;

  const imgFallback = (e, name) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1c2030&color=5a6072&size=80&bold=true`;
  };

  return (
    <div className="card scorecard">
      <div className="scorecard-team-tabs">
        <button
          className={`scorecard-team-tab ${teamTab === "MI" ? "active mi" : ""}`}
          onClick={() => setTeamTab("MI")}
        >
          Mumbai Indians
        </button>
        <button
          className={`scorecard-team-tab ${teamTab === "CSK" ? "active csk" : ""}`}
          onClick={() => setTeamTab("CSK")}
        >
          Chennai Super Kings
        </button>
      </div>

      {teamTab === "MI" && (
        <>
          <div className="scorecard-section-header">
            <span>Batting</span>
            <div className="scorecard-cols">
              <span>R</span><span>B</span><span>4s</span><span>6s</span><span>SR</span>
            </div>
          </div>
          {players.MI.batsmen.map((p) => {
            const stats = s.batsmen[p.name];
            const sr = stats && stats.balls > 0 ? ((stats.runs / stats.balls) * 100).toFixed(1) : "-";
            return (
              <div className={`scorecard-row ${stats?.out ? "out" : ""}`} key={p.name}>
                <div className="scorecard-player">
                  <img
                    src={getPlayerImage(p.name)}
                    alt={p.name}
                    className="scorecard-img"
                    onError={(e) => imgFallback(e, p.name)}
                    loading="lazy"
                  />
                  <div>
                    <div className="scorecard-name">{p.name}{!stats?.out && stats ? " *" : ""}</div>
                    <div className="scorecard-role">{p.role}</div>
                  </div>
                </div>
                <div className="scorecard-cols">
                  <span className="scorecard-val bold">{stats?.runs ?? "-"}</span>
                  <span className="scorecard-val">{stats?.balls ?? "-"}</span>
                  <span className="scorecard-val">{stats?.fours ?? "-"}</span>
                  <span className="scorecard-val">{stats?.sixes ?? "-"}</span>
                  <span className="scorecard-val">{sr}</span>
                </div>
              </div>
            );
          })}

          <div className="scorecard-total">
            <span>Total</span>
            <span>{s.runs}/{s.wickets} ({s.overs} ov)</span>
          </div>
        </>
      )}

      {teamTab === "CSK" && (
        <>
          <div className="scorecard-section-header">
            <span>Bowling</span>
            <div className="scorecard-cols bowl-cols">
              <span>O</span><span>R</span><span>W</span><span>Econ</span>
            </div>
          </div>
          {players.CSK.bowlers.map((p) => {
            const stats = s.bowlers[p.name];
            const econ = stats && stats.balls > 0 ? ((stats.runs / stats.balls) * 6).toFixed(1) : "-";
            return (
              <div className="scorecard-row" key={p.name}>
                <div className="scorecard-player">
                  <img
                    src={getPlayerImage(p.name)}
                    alt={p.name}
                    className="scorecard-img"
                    onError={(e) => imgFallback(e, p.name)}
                    loading="lazy"
                  />
                  <div>
                    <div className="scorecard-name">{p.name}</div>
                    <div className="scorecard-role">{p.role}</div>
                  </div>
                </div>
                <div className="scorecard-cols bowl-cols">
                  <span className="scorecard-val">{stats?.overs ?? "-"}</span>
                  <span className="scorecard-val">{stats?.runs ?? "-"}</span>
                  <span className="scorecard-val bold">{stats?.wickets ?? "-"}</span>
                  <span className="scorecard-val">{econ}</span>
                </div>
              </div>
            );
          })}

          <div className="scorecard-section-header" style={{ marginTop: 16 }}>
            <span>1st Innings</span>
          </div>
          <div className="scorecard-total">
            <span>{firstInningsScore.team}</span>
            <span>{firstInningsScore.runs}/{firstInningsScore.wickets} ({firstInningsScore.overs} ov)</span>
          </div>
          <div className="scorecard-row">
            <div className="scorecard-player">
              <div>
                <div className="scorecard-name">Top Scorer</div>
                <div className="scorecard-role">{firstInningsScore.topScorer}</div>
              </div>
            </div>
            <div className="scorecard-player" style={{ justifyContent: "flex-end" }}>
              <div style={{ textAlign: "right" }}>
                <div className="scorecard-name">Best Bowler</div>
                <div className="scorecard-role">{firstInningsScore.keyBowler}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
