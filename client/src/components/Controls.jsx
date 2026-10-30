export default function Controls({ isPlaying, isFinished, play, pause, nextBall, reset, speed, setSpeed }) {
  return (
    <div className="controls">
      {!isPlaying ? (
        <button className="btn-play" onClick={play} disabled={isFinished}>
          {isFinished ? "Match Over" : "Play"}
        </button>
      ) : (
        <button className="btn-pause" onClick={pause}>
          Pause
        </button>
      )}
      <button className="btn-next" onClick={nextBall} disabled={isFinished || isPlaying}>
        Next Ball
      </button>
      <button className="btn-reset" onClick={reset}>
        Reset
      </button>
      <div className="speed-control">
        <span>Speed</span>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={5000}>Slow</option>
          <option value={3000}>Normal</option>
          <option value={1500}>Fast</option>
          <option value={800}>Rapid</option>
        </select>
      </div>
    </div>
  );
}
