import React, { createContext, useState } from "react";

export const ResumeContext = createContext();

const ResumeContextProvider = ({ children }) => {
  const [resumeId, setResumeId] = useState("");
  const [resumeSkills, setResumeSkills] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  const clearResumeData = () => {
    setResumeId("");
    setResumeSkills([]);
    setUploadedFile(null);
  };

  const value = {
    resumeId,
    setResumeId,
    resumeSkills,
    setResumeSkills,
    uploadedFile,
    setUploadedFile,
    clearResumeData,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContextProvider;