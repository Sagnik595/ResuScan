import React from "react";
import {
  MapPin,
  IndianRupee,
  CalendarDays,
  Briefcase,
  Building2,
} from "lucide-react";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const JobCard = ({ job }) => {
  return (
    <div className="card-hover p-6 h-full flex flex-col">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Building2 className="h-7 w-7" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900">
            {job.jobTitle}
          </h3>
          <p className="text-slate-600 font-medium">{job.comName}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{job.jobType}</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4" />
          <span>{job.salary}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Apply by {formatDate(job.deadline)}</span>
        </div>
      </div>

      {job.skills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      )}

      <div className="mt-6">
        <Link to={`/jobs/${job._id}`}>
          <Button fullWidth>View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;