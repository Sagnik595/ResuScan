// uploadJD
// parseJD

// to build
// update JD
// getAllJD
// getSingleJD
// deleteJD

import mongoose from "mongoose";
import { jd } from "../models/JDModel.js";
import { extractSkills } from "../utils/extractSkills.js";

// API to upload job description
const uploadJD = async (req, res) => {
  try {
    const { jdData,cName,jTitle,location,salary,deadline} = req.body;
    if (!jdData)
      return res.json({
        success: false,
        message: "Please provide a valid job description!!",
      });

    const data = await jd.create({
      comName:cName,
      jobTitle:jTitle,
      desc: jdData,
      location,
      salary,
      deadline
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
    const {id} = req.body;
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

export {uploadJD, parseJD, getAllJD, getSingleJD};