// uploadResume
// parseResume
// getResume

import { Resume } from "../models/resumeModel.js";
import extract from "pdf-extraction";
import { SKILLS } from "../utils/skills.js";
import { extractSkills } from "../utils/extractSkills.js";
import fs from "fs";
import user from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

//API to upload resume
const handleupload = async (req, res) => {
  try {
    const userID = req.userID;

    const userData = await user.findById(userID);
    if (!userData)
      return res.json({ success: false, message: "User not found!!" });

    if (!req.file)
      return res.json({ success: false, message: "No file uploaded" });

    console.log(`[UPLOAD] Starting upload for user: ${userID}`);
    console.log(`[UPLOAD] File path: ${req.file.path}`);

    // ✅ Parse the file FIRST (while it's still local)
    console.log(`[UPLOAD] Reading file for parsing...`);
    const buffer = fs.readFileSync(req.file.path);
    const data = await extract(buffer);

    let text = data.text || "";

    text = text
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .trim();

    const tokens = text.split(" ");
    const skills = extractSkills(tokens);

    console.log(`[UPLOAD] Extracted ${skills.length} skills from resume`);

    // ✅ Now upload to Cloudinary
    console.log(`[UPLOAD] Uploading to Cloudinary...`);
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: `resumes/${userID}`,
      use_filename: true,
      unique_filename: true,
    });

    console.log(`[UPLOAD] Cloudinary upload successful. URL: ${result.secure_url}`);

    // ✅ Create resume document with Cloudinary URL and parsed skills
    const resume = await Resume.create({
      userId: userID,
      fileUrl: result.secure_url,
      parsedText: text,
      skills: skills,
    });

    console.log(`[UPLOAD] Resume document created. Resume ID: ${resume._id}`);

    // ✅ Delete local temporary file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log(`[UPLOAD] Temporary file deleted: ${req.file.path}`);
    }

    return res.json({
      success: true,
      message: "Upload successful",
      resumeId: resume._id,
      skills: skills,
    });
  } catch (error) {
    console.error(`[UPLOAD ERROR]`, error);
    return res.json({ 
      success: false, 
      message: error.message || "Upload Failed!!" 
    });
  }
};

// API to parse the uploaded pdf (skills already extracted during upload)
const textparse = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res
        .status(400)
        .json({ success: false, message: "Resume ID required" });
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    if (resume.userId.toString() !== req.userID) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    console.log(`[PARSE] Retrieving parsed resume: ${resumeId}`);

    // ✅ Skills already extracted during upload, just return them
    if (!resume.skills || resume.skills.length === 0) {
      console.log(`[PARSE] No skills found in resume`);
      return res.json({
        success: true,
        skills: [],
      });
    }

    console.log(`[PARSE] Found ${resume.skills.length} skills in resume`);

    return res.json({
      success: true,
      skills: resume.skills,
    });
  } catch (error) {
    console.error(`[PARSE ERROR]`, error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Failed to parse resume" });
  }
};

export { handleupload, textparse };
