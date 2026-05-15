import React from "react";
import SkillBadge from "../common/SkillBadge";

const MissingSkillsCard = ({ missingSkills = [] }) => {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Missing Skills
      </h2>

      {missingSkills.length === 0 ? (
        <p className="mt-4 text-green-600 font-medium">
          Excellent. Your resume contains all required skills.
        </p>
      ) : (
        <>
          <p className="mt-2 text-slate-600">
            These skills are present in the job description but
            missing from your resume.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <SkillBadge
                key={index}
                skill={skill}
                variant="danger"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MissingSkillsCard;