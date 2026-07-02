import { activityData } from '../data';

export default function ActivityFeed() {
  return (
    <div className="data-card animate-in animate-delay-6" id="activity-feed-card">
      <div className="data-card-header">
        <h2 className="data-card-title">Recent Activity</h2>
        <button className="view-all-btn" id="view-all-activity-btn">
          View All →
        </button>
      </div>
      <div className="activity-list">
        {activityData.map((item) => (
          <div key={item.id} className="activity-item">
            <div className={`activity-icon-wrap ${item.color}`}>
              {item.icon}
            </div>
            <div className="activity-content">
              <div
                className="activity-text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
              <div className="activity-time">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
