import React from "react";
import RecommendationList from "./RecommendationList";

const RecommendationsSection = ({ recommendations }) => {
  if (!recommendations) return null;

  return (
    <div className="space-y-6">
      <RecommendationList
        title="Skill Improvements"
        items={recommendations.skill_improvements}
      />

      <RecommendationList
        title="Resume Improvements"
        items={recommendations.resume_improvements}
      />

      <RecommendationList
        title="Project Suggestions"
        items={recommendations.project_suggestions}
      />

      <RecommendationList
        title="Learning Roadmap"
        items={recommendations.learning_roadmap}
      />
    </div>
  );
};

export default RecommendationsSection;