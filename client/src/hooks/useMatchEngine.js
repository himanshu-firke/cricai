import { useState, useRef, useCallback, useEffect } from "react";
import { ballByBall, getMatchSummary, firstInningsScore } from "../data/matchData";

export function useMatchEngine(socketHandlers) {
  const [ballIndex, setBallIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3000);
  const [insights, setInsights] = useState([]);
  const timerRef = useRef(null);
  const socketRef = useRef(socketHandlers);
  socketRef.current = socketHandlers;

  const totalBalls = ballByBall.length;
  const isFinished = ballIndex >= totalBalls - 1;
  const currentBall = ballIndex >= 0 ? ballByBall[ballIndex] : null;
  const matchState = ballIndex >= 0 ? getMatchSummary(ballIndex) : null;

  const generateInsight = useCallback((ball, state) => {
    const newInsights = [];

    if (ball.result === "WICKET") {
      newInsights.push({
        type: "wicket",
        text: `${ball.dismissal} — MI now ${state.runs}/${state.wickets}. ${state.wickets >= 5 ? "Lower order exposed, pressure mounting!" : "New partnership needed."}`,
      });
    }

    if (state.overs === 6 && ball.over === 6.0) {
      newInsights.push({
        type: "powerplay",
        text: `Powerplay ends! MI ${state.runs}/${state.wickets}. ${state.runs > 50 ? "Strong start!" : "Slow going."} Required rate: ${state.reqRate}`,
      });
    }

    if (state.overs === 10 && ball.over === 10.0) {
      newInsights.push({
        type: "halfway",
        text: `HALFWAY! MI ${state.runs}/${state.wickets}. Need ${state.remaining} off ${state.ballsLeft} balls (RRR: ${state.reqRate}). ${parseFloat(state.reqRate) > 10 ? "Going to be tight!" : "Ahead of the game!"}`,
      });
    }

    if (state.overs >= 15 && ball.over === 15.0) {
      newInsights.push({
        type: "death",
        text: `Death overs begin! MI need ${state.remaining} off ${state.ballsLeft} balls. ${state.wickets <= 4 ? "Batting depth is key advantage." : "Need the big hitters to fire!"}`,
      });
    }

    const batsmanStats = state.batsmen[ball.batsman];
    if (batsmanStats && batsmanStats.runs >= 50 && batsmanStats.runs - ball.runs < 50 && ball.result !== "WICKET") {
      newInsights.push({
        type: "milestone",
        text: `FIFTY for ${ball.batsman}! ${batsmanStats.runs} off ${batsmanStats.balls} balls (${batsmanStats.fours}x4, ${batsmanStats.sixes}x6). What an innings!`,
      });
    }

    if (parseFloat(state.reqRate) > 12 && state.overs > 10) {
      newInsights.push({
        type: "pressure",
        text: `Required rate above 12! MI need ${state.remaining} off ${state.ballsLeft} — big overs needed or it slips away.`,
      });
    }

    return newInsights;
  }, []);

  const nextBall = useCallback(() => {
    setBallIndex((prev) => {
      if (prev >= totalBalls - 1) {
        setIsPlaying(false);
        return prev;
      }
      const next = prev + 1;
      const ball = ballByBall[next];
      const state = getMatchSummary(next);
      const sh = socketRef.current;

      if (sh?.emitBallUpdate) {
        sh.emitBallUpdate(ball);
      }
      if (sh?.emitMatchState) {
        sh.emitMatchState({
          ballIndex: next,
          runs: state.runs,
          wickets: state.wickets,
          overs: state.overs,
          reqRate: state.reqRate,
        });
      }

      const newInsights = generateInsight(ball, state);
      if (newInsights.length > 0) {
        setInsights((old) => [...newInsights, ...old].slice(0, 10));
        if (sh?.emitInsight) {
          newInsights.forEach((insight) => sh.emitInsight(insight));
        }
      }

      return next;
    });
  }, [totalBalls, generateInsight]);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = setInterval(nextBall, speed);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, isFinished, nextBall]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setBallIndex(-1);
    setInsights([]);
    if (socketRef.current?.emitMatchReset) {
      socketRef.current.emitMatchReset();
    }
  }, []);

  const jumpToBall = useCallback((targetIndex) => {
    if (targetIndex === -1) {
      setIsPlaying(false);
      setBallIndex(-1);
      setInsights([]);
      return;
    }
    if (targetIndex >= 0 && targetIndex < totalBalls) {
      setBallIndex(targetIndex);
    }
  }, [totalBalls]);

  const addInsight = useCallback((insight) => {
    setInsights((old) => [insight, ...old].slice(0, 10));
  }, []);

  const getContextString = () => {
    if (!matchState) return "Match hasn't started yet.";
    const s = matchState;
    const activeBatsmen = Object.entries(s.batsmen)
      .filter(([, v]) => !v.out)
      .map(([name, v]) => `${name}: ${v.runs}(${v.balls})`)
      .join(", ");

    return `MI chasing ${s.target} vs CSK. MI: ${s.runs}/${s.wickets} after ${s.overs} overs. Required: ${s.remaining} off ${s.ballsLeft} balls. RRR: ${s.reqRate}. CRR: ${s.currentRR}. At crease: ${activeBatsmen}. Bowling: ${s.lastBowler}. CSK scored ${firstInningsScore.runs}/${firstInningsScore.wickets} (Top: ${firstInningsScore.topScorer}). Last ball: ${currentBall?.commentary || ""}`;
  };

  return {
    ballIndex,
    currentBall,
    matchState,
    isPlaying,
    isFinished,
    insights,
    speed,
    totalBalls,
    play,
    pause,
    nextBall,
    reset,
    setSpeed,
    getContextString,
    jumpToBall,
    addInsight,
    recentBalls: ballByBall.slice(Math.max(0, ballIndex - 11), ballIndex + 1).reverse(),
  };
}
