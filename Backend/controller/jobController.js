// uploadJD
// parseJD

import mongoose from "mongoose";
import { jd } from "../models/JDModel.js";
import { extractSkills } from "../utils/extractSkills.js";

// API to upload job description
const uploadJD = async(req,res)=>{
    try {
        const {jdData} = req.body;
        if(!jdData)
            return res.json({success:false,message:"Please provide a valid job description!!"});
        
        const data = await jd.create({
            desc:jdData
        });
        return res.json({success:true,message:"JD uploaded",data:data._id});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

//API to parse JD
const parseJD = async(req,res)=>{

    try {
        const {id} = req.body;
        if(!id)
            return res.json({success:false,message:"Please enter a valid JD ID!!"});

        let text = jd.findById(id);
        text = text
            .replace(/[^a-zA-Z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .toLowerCase()
            .trim();
        const skills = extractSkills(text);
        return res.json({sucess:true,message:"JD parsed",skills});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}