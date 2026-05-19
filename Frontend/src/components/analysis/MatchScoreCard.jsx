import React from "react";
import ScoreCircle from "../common/ScoreCircle";

const MatchScoreCard = ({ score = 0 }) => {
  const styles = `
    :root {
      --surface-card: #0c0f1e;
      --accent-emerald: #10b981;
      --accent-indigo: #6366f1;
      --accent-rose: #f43f5e;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .match-score-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    }
    
    .match-score-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .match-score-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
    }
    
    @media (max-width: 768px) {
      .match-score-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .match-score-content h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .match-score-description {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .match-status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 100px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .status-high {
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent-emerald);
    }
    
    .status-med {
      background: rgba(99, 102, 241, 0.1);
      color: var(--accent-indigo);
    }
    
    .status-low {
      background: rgba(244, 63, 94, 0.1);
      color: var(--accent-rose);
    }
  `;

  const getStatus = () => {
    if (score >= 80) {
      return {
        label: "Excellent Match",
        class: "status-high",
      };
    }

    if (score >= 60) {
      return {
        label: "Good Match",
        class: "status-med",
      };
    }

    return {
      label: "Needs Improvement",
      class: "status-low",
    };
  };

  const status = getStatus();

  return (
    <>
      <style>{styles}</style>
      <div className="match-score-card">
        <div className="match-score-grid">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ScoreCircle score={score} />
          </div>

          <div className="match-score-content">
            <h2>Resume Match Score</h2>

            <p className="match-score-description">
              This score reflects how well your resume aligns with the required
              skills listed in the job description.
            </p>

            <div className={`match-status-badge ${status.class}`}>
              {status.label}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchScoreCard;
