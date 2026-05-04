// uploadJD
// parseJD

import mongoose from "mongoose";
import { jd } from "../models/JDModel.js";

// API to upload job description
const uploadJD = async(req,res)=>{
    try {
        const {jdData} = req.body;
        if(!jdData)
            return res.json({success:false,message:"Please provide a valid job description!!"});
        
        const data = await jd.create({
            desc:jdData
        });
        return res.json({success:true,message:"JD uploaded"});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}