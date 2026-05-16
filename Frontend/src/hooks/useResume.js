import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";

const useResume = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      "useResume must be used within ResumeContextProvider"
    );
  }

  return context;
};

export default useResume;