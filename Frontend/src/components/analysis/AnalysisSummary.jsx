import React from "react";
import MatchScoreCard from "./MatchScoreCard";
import MissingSkillsCard from "./MissingSkillsCard";
import RecommendationsSection from "./RecommendationsSection";

const AnalysisSummary = ({ analysis }) => {
  if (!analysis) return null;

  const styles = `
    .analysis-summary {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      animation: fadeIn .5s cubic-bezier(.22,1,.36,1) both;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="analysis-summary">
        <MatchScoreCard score={analysis.score} />

        <MissingSkillsCard missingSkills={analysis.missing || []} />

        <RecommendationsSection recommendations={analysis.recommendations} />
      </div>
    </>
  );
};

export default AnalysisSummary;
