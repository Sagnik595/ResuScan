import React from "react";
import RecommendationList from "./RecommendationList";

const RecommendationsSection = ({ recommendations }) => {
  if (!recommendations) return null;

  const styles = `
    .recommendations-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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
      <div className="recommendations-section">
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
    </>
  );
};

export default RecommendationsSection;
