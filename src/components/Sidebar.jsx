import { sidebarNavItems } from '../data';

export default function Sidebar() {
  return (
    <aside className="sidebar" id="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">N</div>
          <div className="sidebar-logo-text">
            <h1>NovaDash</h1>
            <span>Analytics Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sidebarNavItems.map((section) => (
          <div key={section.section}>
            <div className="sidebar-section-title">{section.section}</div>
            {section.items.map((item) => (
              <div
                key={item.id}
                id={`nav-${item.id}`}
                className={`sidebar-item${item.active ? ' active' : ''}`}
              >
                <span className="sidebar-item-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="sidebar-item-badge">{item.badge}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer / User */}
      <div className="sidebar-footer">
        <div className="sidebar-user" id="sidebar-user">
          <div className="sidebar-avatar">JD</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">John Doe</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
