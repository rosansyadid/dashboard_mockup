import { statsData } from '../data';

export default function StatsCards() {
  return (
    <div className="stats-grid" id="stats-grid">
      {statsData.map((stat, index) => (
        <div
          key={stat.id}
          id={`stat-card-${stat.id}`}
          className={`stat-card animate-in animate-delay-${index + 1}`}
        >
          <div className="stat-header">
            <div className="stat-icon-wrap">{stat.icon}</div>
            <div className={`stat-change ${stat.trend}`}>
              <span>{stat.trend === 'up' ? '↑' : '↓'}</span>
              {stat.change}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
