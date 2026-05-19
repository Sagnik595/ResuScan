import React from "react";
import SkillBadge from "../common/SkillBadge";

const MissingSkillsCard = ({ missingSkills = [] }) => {
  const styles = `
    :root {
      --surface-card: #0c0f1e;
      --accent-emerald: #10b981;
      --accent-rose: #f43f5e;
      --text-primary: #ffffff;
      --text-muted: #7b82a8;
      --border-card: rgba(255, 255, 255, 0.07);
      --border-glow: rgba(99, 102, 241, 0.15);
    }
    
    .missing-skills-card {
      background: var(--surface-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2rem;
      transition: transform .25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow .25s, border-color .25s;
    }
    
    .missing-skills-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px var(--border-glow);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .missing-skills-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .missing-skills-empty {
      font-size: 1rem;
      font-weight: 600;
      color: var(--accent-emerald);
      margin-top: 1rem;
    }
    
    .missing-skills-description {
      font-size: 0.95rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
    
    .missing-skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="missing-skills-card">
        <h2 className="missing-skills-title">Missing Skills</h2>

        {missingSkills.length === 0 ? (
          <p className="missing-skills-empty">
            ✓ Excellent. Your resume contains all required skills.
          </p>
        ) : (
          <>
            <p className="missing-skills-description">
              These skills are present in the job description but missing from
              your resume.
            </p>

            <div className="missing-skills-list">
              {missingSkills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} variant="danger" />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MissingSkillsCard;
