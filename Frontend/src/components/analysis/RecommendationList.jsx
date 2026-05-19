import React from "react";

const RecommendationList = ({ title, items = [] }) => {
  if (!items || items.length === 0) return null;

  const styles = `
    :root {
      --surface-card: #0c0f1e;
      --accent-indigo: #6366f1;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .recommendation-list-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    }
    
    .recommendation-list-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .recommendation-list-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }
    
    .recommendation-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .recommendation-item {
      display: flex;
      gap: 0.75rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    
    .recommendation-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-indigo);
      margin-top: 0.4rem;
      flex-shrink: 0;
    }
    
    .recommendation-text {
      color: var(--text-primary);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="recommendation-list-card">
        <h3 className="recommendation-list-title">{title}</h3>

        <ul className="recommendation-list">
          {items.map((item, index) => (
            <li key={index} className="recommendation-item">
              <span className="recommendation-dot" />
              <span className="recommendation-text">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecommendationList;
