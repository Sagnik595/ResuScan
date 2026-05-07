// analyzeResumeVsJD
// getAnalysisResult

import { analyze } from "../models/analyzeModel.js";
import { jd } from "../models/JDModel.js";
import { Resume } from "../models/resumeModel.js";
import user from "../models/userModel.js";
import { getGroqChatCompletion } from "../services/grokService.js";


const analyzeScore = async (req, res) => {
  try {
    const { jid, rid } = req.body;
    const jdData = await jd.findById(jid);
    const resumeData = await Resume.findById(rid);
    const userid = resumeData.userId;
    const userData = await user.findById(userid);
    if(userData.resumeLimit === 0)
      return res.json({success:false,message:"Your resume limit is 0, please upgrade"});
    userData.resumeLimit--;
    await userData.save();

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

    const recommendations = await getGroqChatCompletion({
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
