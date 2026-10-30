import { teams, firstInningsScore } from "../data/matchData";

export default function Scoreboard({ matchState }) {
  const renderTeam = (short, name, score, overs, badgeClass, dimScore) => (
    <div className="team-block">
      <div className={`team-badge ${badgeClass}`}>{short}</div>
      <div className="team-name">{name}</div>
      <div className="team-score-num" style={dimScore ? { opacity: 0.3 } : {}}>
        {score}
      </div>
      <div className="team-overs">{overs}</div>
    </div>
  );

  const renderEmpty = () => (
    <div className="card">
      <div className="scoreboard">
        <div className="score-main">
          {renderTeam("MI", teams.batting.name, "0/0", "0.0 ov", "mi")}
          <div className="match-meta">
            <div className="target-info">Target: {firstInningsScore.runs + 1}</div>
            <div className="first-innings">
              {firstInningsScore.team} {firstInningsScore.runs}/{firstInningsScore.wickets} ({firstInningsScore.overs} ov)
            </div>
          </div>
          {renderTeam("CSK", teams.bowling.name, `${firstInningsScore.runs}/${firstInningsScore.wickets}`, `${firstInningsScore.overs} ov`, "csk", true)}
        </div>
        <div className="empty-state" style={{ padding: "16px" }}>Press Play to start the chase</div>
      </div>
    </div>
  );

  if (!matchState) return renderEmpty();

  const s = matchState;
  const activeBatsmen = Object.entries(s.batsmen).filter(([, v]) => !v.out);
  const bowlerData = s.bowlers[s.lastBowler];

  return (
    <div className="card">
      <div className="scoreboard">
        <div className="score-main">
          {renderTeam("MI", teams.batting.name, `${s.runs}/${s.wickets}`, `${s.overs} ov`, "mi")}
          <div className="match-meta">
            <div className="target-info">
              Need {s.remaining > 0 ? s.remaining : 0} off {s.ballsLeft}
            </div>
            <div className="first-innings">
              {firstInningsScore.team} {firstInningsScore.runs}/{firstInningsScore.wickets} ({firstInningsScore.overs} ov)
            </div>
          </div>
          {renderTeam("CSK", teams.bowling.name, `${firstInningsScore.runs}/${firstInningsScore.wickets}`, `${firstInningsScore.overs} ov`, "csk", true)}
        </div>

        <div className="rate-strip">
          <div className="rate-item">
            <div className="rate-label">CRR</div>
            <div className={`rate-value ${parseFloat(s.currentRR) >= parseFloat(s.reqRate) ? "good" : ""}`}>
              {s.currentRR}
            </div>
          </div>
          <div className="rate-item">
            <div className="rate-label">RRR</div>
            <div className={`rate-value ${parseFloat(s.reqRate) > 10 ? "high" : "good"}`}>
              {s.reqRate}
            </div>
          </div>
          <div className="rate-item">
            <div className="rate-label">Need</div>
            <div className="rate-value">{s.remaining > 0 ? s.remaining : "Won"}</div>
          </div>
          <div className="rate-item">
            <div className="rate-label">Wkts</div>
            <div className={`rate-value ${10 - s.wickets <= 3 ? "high" : ""}`}>
              {10 - s.wickets}
            </div>
          </div>
        </div>
      </div>

      <div className="players-strip">
        {activeBatsmen.slice(-2).map(([name, data]) => (
          <div className="player-stat" key={name}>
            <span className="name">{name.split(" ").pop()}</span>
            <span className="score bat">
              {data.runs}({data.balls})
            </span>
          </div>
        ))}
        {bowlerData && (
          <div className="player-stat">
            <span className="name">{s.lastBowler.split(" ").pop()}</span>
            <span className="score bowl">
              {bowlerData.wickets}-{bowlerData.runs} ({bowlerData.overs})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
