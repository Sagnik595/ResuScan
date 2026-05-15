import React from "react";
import MatchScoreCard from "./MatchScoreCard";
import MissingSkillsCard from "./MissingSkillsCard";
import RecommendationsSection from "./RecommendationsSection";

const AnalysisSummary = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="space-y-8">
      <MatchScoreCard score={analysis.score} />

      <MissingSkillsCard missingSkills={analysis.missing || []} />

      <RecommendationsSection
        recommendations={analysis.recommendations}
      />
    </div>
  );
};

export default AnalysisSummary;