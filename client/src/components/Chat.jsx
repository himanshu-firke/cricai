import { useState, useRef, useEffect, useCallback } from "react";

const QUICK_QUESTIONS = [
  "Who's the top fantasy scorer right now?",
  "How many points has Rohit earned so far?",
  "Based on current form, who should I captain next match?",
  "Why is the required rate climbing?",
  "Explain powerplay fielding rules",
];

const MIN_VH = 30;
const DEFAULT_VH = 47;
const MAX_VH = 80;

export default function Chat({ getContext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "CricAI ready. Ask me about the match, rules, strategy, or fantasy tips." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const [panelHeight, setPanelHeight] = useState(DEFAULT_VH);
  const messagesEndRef = useRef(null);
  const hintTimer = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      setPanelHeight(DEFAULT_VH);
      hintTimer.current = setTimeout(() => setShowHints(true), 3000);
      const hideTimer = setTimeout(() => setShowHints(false), 9000);
      return () => {
        clearTimeout(hintTimer.current);
        clearTimeout(hideTimer);
      };
    } else {
      setShowHints(false);
    }
  }, [isOpen]);

  const onDragStart = useCallback((e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY, startHeight: panelHeight };
    document.body.style.userSelect = "none";
  }, [panelHeight]);

  const onDragMove = useCallback((e) => {
    if (!dragRef.current) return;
    e.preventDefault();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = dragRef.current.startY - clientY;
    const deltaPct = (deltaY / window.innerHeight) * 100;
    const newH = Math.min(MAX_VH, Math.max(MIN_VH, dragRef.current.startHeight + deltaPct));
    setPanelHeight(newH);
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragRef.current) return;
    dragRef.current = null;
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const moveHandler = (e) => onDragMove(e);
    const endHandler = () => onDragEnd();
    window.addEventListener("touchmove", moveHandler, { passive: false });
    window.addEventListener("touchend", endHandler);
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", endHandler);
    return () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", endHandler);
    };
  }, [isOpen, onDragMove, onDragEnd]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setHasAsked(true);
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          matchContext: getContext(),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Could not reach the server. Ensure the backend is running and your Groq API key is configured." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  return (
    <>
      {showHints && !isOpen && (
        <div className="chat-hints">
          {QUICK_QUESTIONS.slice(0, 3).map((q, i) => (
            <button
              key={i}
              className="chat-hint-bubble"
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => { setIsOpen(true); sendMessage(q); }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <button
        className={`chat-fab ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask CricAI"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 10h0M12 10h0M16 10h0" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="chat-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <div
          className="chat-panel"
          style={isMobile ? { maxHeight: `${panelHeight}vh` } : undefined}
        >
          <div
            className="chat-drag-handle"
            onTouchStart={onDragStart}
            onMouseDown={onDragStart}
          >
            <div className="chat-drag-pill" />
          </div>
          <div className="chat-panel-header">
            <h3>Ask CricAI</h3>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-msg ai loading">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {!hasAsked && (
            <div className="quick-questions">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q} className="quick-q" onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about rules, strategy, fantasy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
