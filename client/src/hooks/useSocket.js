import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const socketRef = useRef(null);
  const [viewers, setViewers] = useState(1);
  const [isConnected, setIsConnected] = useState(false);
  const [syncState, setSyncState] = useState(null);

  useEffect(() => {
    const url = import.meta.env.PROD ? "" : "http://localhost:3001";
    const socket = io(url, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("viewers", (count) => setViewers(count));

    socket.on("sync-state", (state) => {
      setSyncState({ ...state, _ts: Date.now() });
    });

    socket.on("match-state", (state) => {
      setSyncState({ ...state, _ts: Date.now() });
    });

    socket.on("match-reset", () => {
      setSyncState({ ballIndex: -1, reset: true, _ts: Date.now() });
    });

    socket.on("insight", (insight) => {
      setSyncState((prev) => ({
        ...(prev || {}),
        newInsight: insight,
        _ts: Date.now(),
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const emitBallUpdate = useCallback((ballData) => {
    socketRef.current?.emit("ball-update", ballData);
  }, []);

  const emitMatchState = useCallback((state) => {
    socketRef.current?.emit("match-state", state);
  }, []);

  const emitInsight = useCallback((insight) => {
    socketRef.current?.emit("insight", insight);
  }, []);

  const emitMatchReset = useCallback(() => {
    socketRef.current?.emit("match-reset");
  }, []);

  return {
    viewers,
    isConnected,
    syncState,
    emitBallUpdate,
    emitMatchState,
    emitInsight,
    emitMatchReset,
  };
}
