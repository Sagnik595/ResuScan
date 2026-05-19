import React from "react";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const RecentAnalysisCard = ({ analysisId, score, jobTitle, company }) => {
  if (!analysisId) return null;

  const styles = `
    :root {
      --surface-card: #0c0f1e;
      --accent-indigo: #6366f1;
      --accent-emerald: #10b981;
      --accent-rose: #f43f5e;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .recent-analysis-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 1.75rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    }
    
    .recent-analysis-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .recent-analysis-header {
      display: flex;
      gap: 1rem;
    }
    
    .recent-analysis-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-indigo);
      flex-shrink: 0;
    }
    
    .recent-analysis-content {
      flex: 1;
    }
    
    .recent-analysis-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    
    .recent-analysis-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }
    
    .recent-analysis-company {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    
    .recent-analysis-score {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .score-high { color: var(--accent-emerald); }
    .score-med { color: var(--accent-indigo); }
    .score-low { color: var(--accent-rose); }
    
    .recent-analysis-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--accent-indigo);
      text-decoration: none;
      transition: color .2s, gap .2s;
    }
    
    .recent-analysis-link:hover {
      color: #8b5cf6;
      gap: 0.75rem;
    }
  `;

  const getScoreClass = () => {
    if (score >= 80) return "score-high";
    if (score >= 60) return "score-med";
    return "score-low";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="recent-analysis-card">
        <div className="recent-analysis-header">
          <div className="recent-analysis-icon">
            <BarChart3 size={24} />
          </div>
          <div className="recent-analysis-content">
            <p className="recent-analysis-label">Latest Analysis</p>
            <h3 className="recent-analysis-title">{jobTitle}</h3>
            <p className="recent-analysis-company">{company}</p>
            <p className={`recent-analysis-score ${getScoreClass()}`}>
              {Math.round(score)}% Match
            </p>
            <Link
              to={`/analysis/${analysisId}`}
              className="recent-analysis-link"
            >
              View Report
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentAnalysisCard;
