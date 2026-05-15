import React from "react";
import Input from "../common/Input";
import { Search } from "lucide-react";

const JobFilters = ({
  search,
  setSearch,
  location,
  setLocation,
}) => {
  return (
    <div className="card p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Search Jobs"
          placeholder="React Developer, ML Engineer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Input
          label="Location"
          placeholder="Remote, Bangalore, Kolkata..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobFilters;