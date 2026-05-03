// uploadResume
// parseResume
// getResume

import { Resume } from "../models/resumeModel.js";
import extract from "pdf-extraction";
import { SKILLS } from "../utils/skills.js";
import { extractSkills } from "../utils/extractSkills.js";
import fs from "fs";
import user from "../models/userModel.js";


//API to upload resume
const handleupload = async (req, res) => {
  try {
    const userID = req.userID;

    const userData = await user.findById(userID);
    if (!userData)
      return res.json({ success: false, message: "User not found!!" });

    if (!req.file)
      return res.json({ success: false, message: "No file uploaded" });

    const filePath = req.file.path;

    const resume = await Resume.create({
      userId: userID,
      fileUrl: filePath,
    });

    return res.json({
      success: true,
      message: "Upload successful",
      resumeId: resume._id,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Upload Failed!!" });
  }
};


// API to parse the uploaded pdf
const textparse = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.json({ success: false, message: "Resume not found" });

    const buffer = fs.readFileSync(resume.fileUrl);

    const data = await extract(buffer);

    let text = data.text || "";

    text = text
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

    const tokens = text.split(" ");

    const skills = extractSkills(tokens);

    resume.parsedText = text;
    resume.skills = skills;
    await resume.save();

    return res.json({
      success: true,
      skills,
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export {handleupload,textparse};