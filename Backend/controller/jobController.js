// uploadJD
// parseJD

import mongoose from "mongoose";
import { jd } from "../models/JDModel.js";
import { extractSkills } from "../utils/extractSkills.js";

// API to upload job description
const uploadJD = async (req, res) => {
  try {
    const { jdData,cName,jTitle} = req.body;
    if (!jdData)
      return res.json({
        success: false,
        message: "Please provide a valid job description!!",
      });

    const data = await jd.create({
      comName:cName,
      jobTitle:jTitle,
      desc: jdData,
    });
    return res.json({ success: true, message: "JD uploaded", data: data._id });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to parse JD
const parseJD = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.json({
        success: false,
        message: "Please enter a valid JD ID!!",
      });
    
    const JDdata = await jd.findById(id);
    let text = JDdata.desc;
    text = text
      .replace(/[^a-zA-Z0-9\s]/g, " ") // remove symbols
      .replace(/\s+/g, " ") // normalize spaces
      .toLowerCase() // normalize case
      .trim();

    text = text.split(" ");

    if (text.includes("mern")) {
      text.push("mongodb", "express", "react", "node");
    }
    text = [...new Set(text)];

    text = text.filter((item) => item !== "MERN");

    let jdData = extractSkills(text);

    JDdata.skills = jdData;
    
    await JDdata.save(); 
    return res.json({ success: true, required: jdData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


export {uploadJD, parseJD};