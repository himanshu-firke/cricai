export default function InsightCards({ insights }) {
  if (insights.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h3>AI Insights</h3>
        </div>
        <div className="empty-state">
          Insights appear at key moments — wickets, milestones, phase changes
        </div>
      </div>
    );
  }

  const getLabel = (type) => {
    const labels = {
      wicket: "Wicket",
      powerplay: "Phase Change",
      halfway: "Halfway",
      death: "Death Overs",
      milestone: "Milestone",
      pressure: "Pressure",
    };
    return labels[type] || "Insight";
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>AI Insights</h3>
        <span className="tag tag-red">{insights.length}</span>
      </div>
      <div className="insights-container">
        {insights.map((insight, i) => (
          <div className="insight-card" key={i}>
            <div className="insight-label">{getLabel(insight.type)}</div>
            <div className="insight-text">{insight.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
