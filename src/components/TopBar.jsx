import { useState, useCallback, useEffect, useRef } from 'react';

export default function TopBar({ notificationCount, onToggleNotifications }) {
  const [bellRinging, setBellRinging] = useState(false);
  const intervalRef = useRef(null);

  // Auto-ring the bell periodically to demonstrate the animation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 1000);
    }, 5000);

    // Initial ring after 1 second
    const timeout = setTimeout(() => {
      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 1000);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, []);

  const handleBellClick = useCallback(() => {
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1000);
    onToggleNotifications();
  }, [onToggleNotifications]);

  return (
    <header className="topbar" id="topbar">
      <div className="topbar-left">
        <div className="topbar-greeting">
          Welcome back, <span>John</span> 👋
        </div>
        <div className="topbar-subtitle">
          Here's what's happening with your projects today.
        </div>
      </div>

      <div className="topbar-right">
        {/* Search */}
        <div className="topbar-search">
          <span className="topbar-search-icon">🔍</span>
          <input
            type="text"
            id="topbar-search-input"
            placeholder="Search anything..."
          />
        </div>

        {/* Notification Bell */}
        <button
          id="notification-bell-btn"
          className={`topbar-btn${bellRinging ? ' bell-ringing' : ''}`}
          onClick={handleBellClick}
          aria-label="Toggle notifications"
        >
          <span className="bell-icon">🔔</span>
          {notificationCount > 0 && (
            <span className="notification-dot" />
          )}
        </button>

        {/* Settings */}
        <button className="topbar-btn" id="settings-btn" aria-label="Settings">
          ⚙️
        </button>
      </div>
    </header>
  );
}
