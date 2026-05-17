// // analyzeResumeVsJD
// // getAnalysisResult

// import { analyze } from "../models/analyzeModel.js";
// import { jd } from "../models/JDModel.js";
// import { Resume } from "../models/resumeModel.js";
// import user from "../models/userModel.js";
// import { getGroqChatCompletion } from "../services/grokService.js";


// const analyzeScore = async (req, res) => {
//   try {
//     const { jid, rid } = req.body;
//     const jdData = await jd.findById(jid);
//     const resumeData = await Resume.findById(rid);
//     const userid = resumeData.userId;
//     const userData = await user.findById(userid);
//     if(userData.resumeLimit === 0)
//       return res.json({success:false,message:"Your resume limit is 0, please upgrade"});
//     userData.resumeLimit--;
//     await userData.save();

//     if (!jdData || !resumeData) {
//       return res.json({ success: false, message: "Invalid IDs" });
//     }
//     let s1 = resumeData.skills;
//     let s2 = jdData.skills;
//     if (!s1 || !s2)
//       return res.json({
//         success: false,
//         message: "Resume or Job Data not found!!",
//       });

//     const missing = s2.filter((item) => !s1.includes(item));

//     const common = s1.filter((x) => s2.includes(x));

//     let score = s2.length === 0 ? 0 : (common.length / s2.length) * 100; // matchScore = (matchedSkills / totalRequiredSkills) * 100

//     const recommendations = await getGroqChatCompletion({
//       resumeSkills: s1,
//       requiredSkills: s2,
//       missingSkills: missing,
//       matchScore: score,
//     });
//     console.log(recommendations);
    

//     const anaData = await analyze.create({
//       resumeId: rid,
//       jobId: jid,
//       jobDesc: jdData.desc,
//       score,
//       missingSkills: missing,
//       recommendations
//     });
//     return res.json({
//       success: true,
//       message: "Analysis successful",
//       score,
//       id: anaData._id,
//       missing,
//       recommendations
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// };
// export { analyzeScore };



// analyzeResumeVsJD

import { analyze } from "../models/analyzeModel.js";
import { jd } from "../models/JDModel.js";
import { Resume } from "../models/resumeModel.js";
import user from "../models/userModel.js";
import { getGroqChatCompletion } from "../services/grokService.js";

const analyzeScore = async (req, res) => {
  try {
    const { jid, rid } = req.body;

    // Validate input
    if (!jid || !rid) {
      return res.json({
        success: false,
        message: "Job ID and Resume ID are required",
      });
    }

    // Fetch data
    const jdData = await jd.findById(jid);
    const resumeData = await Resume.findById(rid);

    if (!jdData || !resumeData) {
      return res.json({
        success: false,
        message: "Invalid IDs",
      });
    }

    // SECURITY CHECK: Ensure resume belongs to logged-in user
    if (resumeData.userId.toString() !== req.userID) {
      return res.json({
        success: false,
        message: "Unauthorized access to resume",
      });
    }

    // Fetch user
    const userData = await user.findById(req.userID);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Check resume limit
    if (userData.resumeLimit === 0) {
      return res.json({
        success: false,
        message: "Your resume limit is 0, please upgrade",
      });
    }

    // Required skill arrays
    const s1 = resumeData.skills;
    const s2 = jdData.skills;

    if (!s1 || !s2) {
      return res.json({
        success: false,
        message: "Resume or Job Data not found",
      });
    }

    // Calculate missing and matched skills
    const missing = s2.filter((item) => !s1.includes(item));
    const common = s1.filter((item) => s2.includes(item));

    const score =
      s2.length === 0 ? 0 : (common.length / s2.length) * 100;

    // AI recommendations
    const recommendations = await getGroqChatCompletion({
      resumeSkills: s1,
      requiredSkills: s2,
      missingSkills: missing,
      matchScore: score,
    });

    // Deduct usage only after successful analysis
    userData.resumeLimit--;
    await userData.save();

    // Save analysis
    const anaData = await analyze.create({
      resumeId: rid,
      jobId: jid,
      jobDesc: jdData.desc,
      score,
      missingSkills: missing,
      recommendations,
    });

    return res.json({
      success: true,
      message: "Analysis successful",
      score,
      id: anaData._id,
      missing,
      recommendations,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get analysis by ID
const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Analysis ID is required",
      });
    }

    const analysisData = await analyze.findById(id);

    if (!analysisData) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: analysisData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { analyzeScore, getAnalysisById };