// uploadJD
// parseJD
// getAllJD
// getSingleJD
// deleteJD


// to build
// update JD


import mongoose from "mongoose";
import { jd } from "../models/JDModel.js";
import { extractSkills } from "../utils/extractSkills.js";

// API to upload job description
const uploadJD = async (req, res) => {
  try {
    const { jdData, cName, jTitle, location, salary, deadline } = req.body;
    
    // Validate all required fields
    if (!jdData || !cName || !jTitle || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: jdData, cName, jTitle, deadline",
      });
    }

    // Validate deadline is in the future
    if (new Date(deadline) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Deadline must be in the future",
      });
    }

    const data = await jd.create({
      comName: cName,
      jobTitle: jTitle,
      desc: jdData,
      location: location || "Not specified",
      salary: salary || "Not disclosed",
      deadline,
    });
    
    return res.status(201).json({ success: true, message: "Job created successfully", data: data._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to upload job description" });
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
    if(!JDdata)
      return res.json({success:false,message:"No job found!!"});

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

    text = text.filter((item) => item !== "mern");

    let jdData = extractSkills(text);

    JDdata.skills = jdData;
    
    await JDdata.save(); 
    return res.json({ success: true, required: jdData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get all the job details
const getAllJD = async(req,res)=>{
  try {
    const jdData = await jd.find().select("-companyLogo -desc -updatedAt -createdAt -__v");;
    if(!jdData)
      return res.json({success:false,message:"No JD available!!"});
    const filterData = jdData;
    return res.json({success:true,data:filterData});
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


//API to get single JOB details
const getSingleJD = async(req,res)=>{
  try {
    const {id} = req.params;
    if(!id)
      return res.json({success:false,message:"No ID provided!!"});
    const data = await jd.findById(id);
    if(!data)
      return res.json({success:false,message:"No such job found!!"});
    return res.json({success:true,data});
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


//API to delete JD
const deleteJD = async(req,res)=>{
  try {
    const {id} = req.body;
    if(!id)
      return res.json({success:false,message:"No ID provided!!"});
    const data = await jd.findByIdAndDelete(id);
    if(!data)
      return res.json({success:false,message:"No such job found!!"});
    return res.json({success:true,message:"Job Detail Deleted successfully!!"});
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

export {uploadJD, parseJD, getAllJD, getSingleJD, deleteJD};