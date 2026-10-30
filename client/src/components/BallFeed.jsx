export default function BallFeed({ recentBalls }) {
  const getResultClass = (result) => {
    if (result === "dot") return "dot";
    if (result === "WICKET") return "wicket";
    if (result === "4") return "four";
    if (result === "6") return "six";
    if (result === "wide" || result === "no-ball") return "extra";
    return "run";
  };

  const getResultLabel = (ball) => {
    if (ball.result === "dot") return "0";
    if (ball.result === "WICKET") return "W";
    if (ball.result === "wide") return "Wd";
    if (ball.result === "no-ball") return "Nb";
    return ball.runs.toString();
  };

  const last5Overs = recentBalls.slice(0, 30);

  if (last5Overs.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">Waiting for the first delivery...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Commentary</h3>
        <span className="tag tag-green">Last 5 overs</span>
      </div>
      <div className="ball-feed">
        {last5Overs.map((ball, i) => (
          <div className="ball-item" key={`${ball.over}-${i}`}>
            <span className="ball-number">{ball.over}</span>
            <span className={`ball-result ${getResultClass(ball.result)}`}>
              {getResultLabel(ball)}
            </span>
            <span className={`ball-commentary ${["WICKET", "4", "6"].includes(ball.result) ? "highlight" : ""}`}>
              {ball.commentary}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
