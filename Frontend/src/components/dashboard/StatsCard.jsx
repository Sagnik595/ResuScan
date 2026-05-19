import React from "react";

const StatsCard = ({
  title,
  value,
  subtitle = "",
  icon: Icon,
  color = "indigo",
}) => {
  const styles = `
    :root {
      --bg-main: #05070f;
      --surface-card: #0c0f1e;
      --accent-indigo: #6366f1;
      --accent-violet: #8b5cf6;
      --accent-emerald: #10b981;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .stat-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 1.75rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
      cursor: default;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .stat-card-content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    
    .stat-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .stat-subtitle {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    
    .stat-icon {
      padding: 0.75rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .stat-icon-indigo { background: rgba(99, 102, 241, 0.12); color: var(--accent-indigo); }
    .stat-icon-violet { background: rgba(139, 92, 246, 0.12); color: var(--accent-violet); }
    .stat-icon-emerald { background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald); }
  `;

  const iconColorMap = {
    indigo: "stat-icon-indigo",
    green: "stat-icon-emerald",
    amber: "stat-icon-violet",
    red: "stat-icon-indigo",
    blue: "stat-icon-indigo",
  };

  return (
    <>
      <style>{styles}</style>
      <div className="stat-card">
        <div className="stat-card-content">
          <div>
            <p className="stat-label">{title}</p>
            <h3 className="stat-value">{value}</h3>
            {subtitle && <p className="stat-subtitle">{subtitle}</p>}
          </div>

          {Icon && (
            <div
              className={`stat-icon ${iconColorMap[color] || iconColorMap.indigo}`}
            >
              <Icon size={24} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StatsCard;
