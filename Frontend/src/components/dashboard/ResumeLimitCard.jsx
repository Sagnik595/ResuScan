import React from "react";
import { FileText } from "lucide-react";

const ResumeLimitCard = ({ remaining = 0 }) => {
  const percentage = Math.min((remaining / 10) * 100, 100);

  const styles = `
    :root {
      --bg-main: #05070f;
      --surface-card: #0c0f1e;
      --accent-indigo: #6366f1;
      --accent-emerald: #10b981;
      --accent-rose: #f43f5e;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .resume-limit-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 1.75rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    }
    
    .resume-limit-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .resume-limit-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .resume-limit-icon {
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
    
    .resume-limit-info {
      flex: 1;
    }
    
    .resume-limit-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
    }
    
    .resume-limit-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }
    
    .resume-limit-progress {
      margin-top: 1.25rem;
    }
    
    .progress-track {
      height: 6px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 1.2s cubic-bezier(.22,1,.36,1);
    }
    
    .progress-fill-high { background: var(--accent-emerald); }
    .progress-fill-med { background: var(--accent-indigo); }
    .progress-fill-low { background: var(--accent-rose); }
    
    .resume-limit-caption {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.75rem;
    }
  `;

  const getProgressClass = () => {
    if (remaining >= 5) return "progress-fill-high";
    if (remaining >= 2) return "progress-fill-med";
    return "progress-fill-low";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="resume-limit-card">
        <div className="resume-limit-header">
          <div className="resume-limit-icon">
            <FileText size={24} />
          </div>
          <div className="resume-limit-info">
            <p className="resume-limit-label">Remaining Analyses</p>
            <h3 className="resume-limit-value">{remaining}</h3>
          </div>
        </div>

        <div className="resume-limit-progress">
          <div className="progress-track">
            <div
              className={`progress-fill ${getProgressClass()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="resume-limit-caption">
            Basic plan includes 10 analyses.
          </p>
        </div>
      </div>
    </>
  );
};

export default ResumeLimitCard;
