import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import user from "../models/userModel.js";
import jwt from 'jsonwebtoken';

//API for user register
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;

    try {
        if(!name || !email || !password)
            return res.json({success:false,message:"Incomplete credentials!!"});
        if(!validator.isEmail(email))
            return res.json({success:false,message:"Please enter a valid email!!"});
        if(password.length<8)
            return res.json({success:false,message:"Please enter a valid password!!"})

        const existing = await user.findOne({email});
        if(existing)
            return res.json({success:false, message:"User already exists!!"});

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const userData = await user.create({
            name,
            email,
            password:hash,
            image:"",
            role:"user"
        })

        return res.json({success:true,message:"Registration Successful"});
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}


//API to login user 
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const userData = await user.findOne({email});
        if(!userData)
            return res.json({success:false,message:"User not registered!!"});

        if(!bcrypt.compareSync(password, userData.password))
            return res.json({success:false,message:"Incorrect password!!"});

        const token = jwt.sign({id:userData._id,role:userData.role},process.env.JWT_SECRET,{expiresIn:'5h'});

        return res.json({success:true,message:"User logged in",token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}


//API to upload resume and extract text feature
const handleupload = async (req, res) => {
    try {
        const userID = req.userID

        const userData = await user.findById(userID);
        if (!userData)
            return res.json({ success: false, message: "User not found!!" });

        const pdfBuffer = req.file.buffer;
        userData.pdf = pdfBuffer;
        await userData.save();

        return res.json({ success: true, message: "Upload Successful" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Upload Failed!!" });
    }
};

export {registerUser, loginUser, handleupload};