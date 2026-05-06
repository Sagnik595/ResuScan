// analyzeResumeVsJD
// getAnalysisResult

import { analyze } from "../models/analyzeModel.js";
import { jd } from "../models/JDModel.js";
import { Resume } from "../models/resumeModel.js";
import { getRecommendations } from "../services/geminiService.js";

const analyzeScore = async (req, res) => {
  try {
    const { jid, rid } = req.body;
    const jdData = await jd.findById(jid);
    const resumeData = await Resume.findById(rid);

    if (!jdData || !resumeData) {
      return res.json({ success: false, message: "Invalid IDs" });
    }
    let s1 = resumeData.skills;
    let s2 = jdData.skills;
    if (!s1 || !s2)
      return res.json({
        success: false,
        message: "Resume or Job Data not found!!",
      });

    const missing = s2.filter((item) => !s1.includes(item));

    const common = s1.filter((x) => s2.includes(x));

    let score = s2.length === 0 ? 0 : (common.length / s2.length) * 100; // matchScore = (matchedSkills / totalRequiredSkills) * 100

    const recommendations = await getRecommendations({
      resumeSkills: s1,
      requiredSkills: s2,
      missingSkills: missing,
      matchScore: score,
    });
    console.log(recommendations);
    

    const anaData = await analyze.create({
      resumeId: rid,
      jobId: jid,
      jobDesc: jdData.desc,
      score,
      missingSkills: missing,
      recommendations
    });
    return res.json({
      success: true,
      message: "Analysis successful",
      score,
      id: anaData._id,
      missing,
      recommendations
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export { analyzeScore };
