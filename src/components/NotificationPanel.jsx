import { notificationsData } from '../data';

export default function NotificationPanel({ isOpen, onClose }) {
  const unreadCount = notificationsData.filter((n) => n.unread).length;

  return (
    <>
      {/* Overlay */}
      <div
        className={`notification-overlay${isOpen ? ' visible' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`notification-panel${isOpen ? ' open' : ''}`}
        id="notification-panel"
      >
        <div className="notification-panel-header">
          <div className="notification-panel-title">
            🔔 Notifications
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
          </div>
          <button
            className="notification-close-btn"
            onClick={onClose}
            id="notification-close-btn"
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        <div className="notification-list">
          {notificationsData.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item${notif.unread ? ' unread' : ''}`}
              id={`notification-${notif.id}`}
            >
              <div className="notification-item-header">
                <span className="notification-type-icon">{notif.icon}</span>
                <span className={`notification-type-label ${notif.type}`}>
                  {notif.title}
                </span>
              </div>
              <div className="notification-item-body">{notif.body}</div>
              <div className="notification-item-time">{notif.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
