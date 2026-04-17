import mongoose from "mongoose";
import express from 'express';
import jwt from 'jsonwebtoken';


const authAdmin = async(req,res,next)=>{
    
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return res.json({success:false,message:"No token!!"});

        const token = authHeader.split(" ")[1];

        if(!token)
            return res.json({success:false,message:"Invalid token!!"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role!=="admin")
            return res.json({success:false,message:"Unauthorized"});
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}


export default authAdmin;