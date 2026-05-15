import React from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import SkillBadge from "../common/SkillBadge";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const JobDetailsModal = ({
  isOpen,
  onClose,
  job,
  onAnalyze,
  loading = false,
}) => {
  if (!job) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={job.jobTitle}
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <p className="text-lg font-medium text-slate-700">
            {job.comName}
          </p>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>

            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {job.jobType}
            </div>

            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              {job.salary}
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Deadline: {formatDate(job.deadline)}
          </p>
        </div>

        {job.skills?.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  variant="primary"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Job Description
          </h3>
          <div className="max-h-64 overflow-y-auto rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
            {job.desc}
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={onAnalyze}
          loading={loading}
        >
          Analyze Resume Match
        </Button>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;