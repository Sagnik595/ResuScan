// analyzeResumeVsJD
// getAnalysisResult

import { analyze } from "../models/analyzeModel.js";
import { jd } from "../models/JDModel.js";
import { Resume } from "../models/resumeModel.js";


const analyze1 = async(req,res)=>{
    try {
        const {jid, rid} = req.body;
        const jdData = await jd.findById(jid);
        const resumeData = await Resume.findById(rid);
        let s1 = resumeData.skills;
        let s2 = jdData.skills;

        const common = s1.filter(x => s2.includes(x));
        let score = (common.length/s2.length) * 100 // matchScore = (matchedSkills / totalRequiredSkills) * 100
        const anaData = await analyze.create({
            resumeId:rid,
            jobId:jid,
            jodDesc:jdData.desc,
            score
        });
        await anaData.save();
        return res.json({success:true,message:"Analysis successful",score,id:anaData._id});
    } catch (error) {
        console.log();
        return res.json({success:false,message:error.message});
    }
}


//API to get the missing skills
const analyze2 = async(req,res)=>{
    try {
        const {aid} = req.body;
        const mainData = await analyze.findById(aid);
        if(!mainData)
            return res.json({success:false,message:"No Analytics found!!"});
        const jData = await jd.findById(mainData.jobId);
        const rData = await Resume.findById(mainData.resumeId);
        if(!jData || !rData)
            return res.json({success:false,message:"Missing job ID or resume ID!!"});
        const jskills = jData.skills;
        const rskills = rData.skills;
        const missing = jskills.filter(item => !rskills.includes(item));
        mainData.missingSkills = missing;
        await mainData.save();
        return res.json({success:true,message:"Missing Skills found",missing});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {analyze1, analyze2};