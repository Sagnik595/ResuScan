import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const adminLogin = async(req,res)=>{

    try {
        const {email,password} = req.body;
        if(email!==process.env.ADMIN_EMAIl)
            return res.json({success:false,message:"Only admin email allowed!!"});
        if(password!==process.env.ADMIN_PASSWORD)
            return res.json({success:false,message:"Invalid Password!!"});

        const token = jwt.sign({role:"admin"},process.env.JWT_SECRET,{expiresIn:'5h'});

        return res.json({success:true,message:"Admin logged in",token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

export {adminLogin};