export default function Header({ viewers = 1, isConnected = false }) {
  return (
    <header className="header">
      <div className="header-logo">
        <div>
          <h1>Cric<span>AI</span></h1>
          <div className="header-subtitle">Live Match Companion</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {isConnected && (
          <div className="viewers-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {viewers}
          </div>
        )}
        <div className="live-badge">
          <span className="live-dot" />
          LIVE
        </div>
      </div>
    </header>
  );
}
